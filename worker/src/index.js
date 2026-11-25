/**
 * 泽锐 zerui — 官网询盘 Worker
 *
 * 职责：接收前端表单 POST → 校验 → 蜜罐 + 时间戳 + 频率限制 → 调 Resend 发信
 * 部署：POST /accounts/{account}/workers/scripts/zerui-inquiry
 * 绑定：RESEND_API_KEY（secret）、TO_EMAIL、FROM_EMAIL、ALLOWED_ORIGINS（vars）
 */

const LIMITS = {
  name: { min: 2, max: 80 },
  email: { max: 160 },
  country: { min: 2, max: 60 },
  whatsapp: { max: 40 },
  message: { min: 10, max: 2000 },
};

const RATE = {
  windowMs: 10 * 60 * 1000,
  max: 4,
  // 同一 IP 在这段时间内只留一条记录，避免内存无限增长
  maxBuckets: 5000,
};

// 每个 isolate 内生效（Workers 免费计划没有持久化存储时的基本限流）
const buckets = new Map();

const EMAIL_RE = /^[^\s@<>()",;:]+@[^\s@<>()",;:]+\.[a-zA-Z]{2,}$/;

const ERROR_TEXT = {
  method_not_allowed: { zh: '请求方式不支持。', en: 'Method not allowed.' },
  bad_origin: { zh: '请求来源不被允许。', en: 'This origin is not allowed.' },
  bad_request: { zh: '请求格式不正确，请刷新页面后重试。', en: 'Malformed request. Please refresh and try again.' },
  too_large: { zh: '提交内容过大。', en: 'Submission is too large.' },
  missing_fields: { zh: '请填写必填项。', en: 'Please fill in the required fields.' },
  invalid_name: { zh: '请填写姓名（2–80 个字符）。', en: 'Please enter a name (2–80 characters).' },
  invalid_email: { zh: '邮箱格式不正确。', en: 'That email address looks invalid.' },
  invalid_country: { zh: '请填写国家或地区。', en: 'Please tell us your country or region.' },
  invalid_whatsapp: { zh: 'WhatsApp 号码过长。', en: 'The WhatsApp number is too long.' },
  invalid_message: { zh: '请描述需求（10–2000 个字符）。', en: 'Please describe your requirement (10–2000 characters).' },
  spam: { zh: '提交被拦截，请稍后重试。', en: 'Submission was blocked. Please try again later.' },
  rate_limited: { zh: '提交过于频繁，请 10 分钟后再试。', en: 'Too many submissions. Please try again in 10 minutes.' },
  not_configured: { zh: '表单服务暂不可用，请直接用 WhatsApp 或邮件联系我们。', en: 'The form service is not available right now. Please use WhatsApp or email.' },
  send_failed: { zh: '邮件发送失败，请稍后重试，或直接用 WhatsApp 联系我们。', en: 'We could not send your message. Please retry, or reach us on WhatsApp.' },
};

function allowedOrigins(env) {
  const list = (env.ALLOWED_ORIGINS || 'https://zeruioutdoor.com,https://www.zeruioutdoor.com')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
  return list;
}

function corsHeaders(origin, env) {
  const list = allowedOrigins(env);
  const allow = origin && list.includes(origin) ? origin : '';
  const headers = { Vary: 'Origin' };
  if (allow) {
    headers['Access-Control-Allow-Origin'] = allow;
    headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS';
    headers['Access-Control-Allow-Headers'] = 'Content-Type';
    headers['Access-Control-Max-Age'] = '86400';
  }
  return headers;
}

function json(body, status, origin, env, extra = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
      ...corsHeaders(origin, env),
      ...extra,
    },
  });
}

function fail(code, status, origin, env) {
  return json({ ok: false, code, message: ERROR_TEXT[code]?.en || 'Error.', messageZh: ERROR_TEXT[code]?.zh || '出错了。' }, status, origin, env);
}

function clientIp(request) {
  return request.headers.get('CF-Connecting-IP') || request.headers.get('X-Forwarded-For') || 'unknown';
}

function isRateLimited(ip) {
  const now = Date.now();
  const hits = (buckets.get(ip) || []).filter((t) => now - t < RATE.windowMs);
  hits.push(now);
  buckets.set(ip, hits);
  if (buckets.size > RATE.maxBuckets) {
    for (const [key, times] of buckets) {
      if (!times.length || now - times[times.length - 1] > RATE.windowMs) buckets.delete(key);
    }
  }
  return hits.length > RATE.max;
}

// 计数交给 Durable Object：isolate 会被回收，内存计数不可靠
async function limitByDo(env, ip) {
  const stub = env.RATE_LIMITER.get(env.RATE_LIMITER.idFromName(`ip:${ip}`));
  const res = await stub.fetch('https://rate/increment', { method: 'POST' });
  return res.json();
}

export class RateLimiter {
  constructor(state) {
    this.storage = state.storage;
  }

  async fetch() {
    const now = Date.now();
    const stored = await this.storage.get('times');
    const times = Array.isArray(stored) ? stored.filter((t) => now - t < RATE.windowMs) : [];
    const allowed = times.length < RATE.max;
    if (allowed) {
      times.push(now);
      await this.storage.put('times', times);
    }
    const retryAfter = times.length ? Math.ceil((times[0] + RATE.windowMs - now) / 1000) : 0;
    return new Response(JSON.stringify({ allowed, retryAfter }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

function clean(value, max) {
  if (typeof value !== 'string') return '';
  // 去掉控制字符与首尾空白，限制长度
  return value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim().slice(0, max);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function singleLine(value) {
  return String(value).replace(/[\r\n]+/g, ' ');
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const url = new URL(request.url);

    // 健康检查（部署后用浏览器直接访问确认可用）
    if (request.method === 'GET') {
      if (url.pathname !== '/' && url.pathname !== '/health') return fail('bad_request', 404, origin, env);
      return json({ ok: true, service: 'zerui-inquiry', configured: Boolean(env.RESEND_API_KEY) }, 200, origin, env);
    }

    if (request.method === 'OPTIONS') {
      if (origin && !allowedOrigins(env).includes(origin)) return fail('bad_origin', 403, origin, env);
      return new Response(null, { status: 204, headers: corsHeaders(origin, env) });
    }

    if (request.method !== 'POST') {
      return json({ ok: false, code: 'method_not_allowed' }, 405, origin, env, { Allow: 'POST, OPTIONS, GET' });
    }

    if (origin && !allowedOrigins(env).includes(origin)) return fail('bad_origin', 403, origin, env);

    const type = request.headers.get('Content-Type') || '';
    if (!type.includes('application/json')) return fail('bad_request', 415, origin, env);

    const length = Number(request.headers.get('Content-Length') || 0);
    if (length > 16 * 1024) return fail('too_large', 413, origin, env);

    let payload;
    try {
      payload = await request.json();
    } catch {
      return fail('bad_request', 400, origin, env);
    }
    if (!payload || typeof payload !== 'object') return fail('bad_request', 400, origin, env);

    // 蜜罐：正常访客看不到这个字段
    if (clean(payload.company_website, 200)) return fail('spam', 400, origin, env);

    // 填表耗时：过快视为机器人
    const elapsed = Number(payload.elapsed_ms || 0);
    if (elapsed && elapsed < 2500) return fail('spam', 400, origin, env);

    const name = clean(payload.name, LIMITS.name.max);
    const email = clean(payload.email, LIMITS.email.max);
    const country = clean(payload.country, LIMITS.country.max);
    const whatsapp = clean(payload.whatsapp, LIMITS.whatsapp.max);
    const message = clean(payload.message, LIMITS.message.max);
    const page = clean(payload.page, 300);
    const lang = payload.lang === 'en' ? 'en' : 'zh';

    if (!name || !email || !country || !message) return fail('missing_fields', 422, origin, env);
    if (name.length < LIMITS.name.min) return fail('invalid_name', 422, origin, env);
    if (!EMAIL_RE.test(email)) return fail('invalid_email', 422, origin, env);
    if (country.length < LIMITS.country.min) return fail('invalid_country', 422, origin, env);
    if (whatsapp.length > LIMITS.whatsapp.max) return fail('invalid_whatsapp', 422, origin, env);
    if (message.length < LIMITS.message.min) return fail('invalid_message', 422, origin, env);

    const ip = clientIp(request);
    if (isRateLimited(ip)) return fail('rate_limited', 429, origin, env);
    if (env.RATE_LIMITER) {
      const verdict = await limitByDo(env, ip);
      if (!verdict.allowed) return fail('rate_limited', 429, origin, env);
    }

    if (!env.RESEND_API_KEY) return fail('not_configured', 503, origin, env);

    const toEmail = env.TO_EMAIL || 'zeruioutdoor@gmail.com';
    const fromEmail = env.FROM_EMAIL || 'ZERUI Website <no-reply@zeruioutdoor.com>';
    const subject = `[官网询盘] ${singleLine(name)} · ${singleLine(country)}`;

    const rows = [
      ['姓名 / Name', name],
      ['邮箱 / Email', email],
      ['国家 / Country', country],
      ['WhatsApp', whatsapp || '—'],
      ['需求 / Requirement', message],
      ['页面 / Page', page || '—'],
      ['语言 / Language', lang],
      ['时间 / Time', new Date().toISOString()],
      ['IP', ip],
    ];

    const text = rows.map(([label, value]) => `${label}: ${value}`).join('\n');
    const html = `<div style="font-family:-apple-system,Segoe UI,Arial,sans-serif;color:#14161a;line-height:1.7">
  <h2 style="margin:0 0 4px;font-size:19px;font-weight:600">官网询盘 / Website enquiry</h2>
  <p style="margin:0 0 18px;color:#787a7d;font-size:13px">来自 ${escapeHtml(page || 'zeruioutdoor.com')}</p>
  <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:14px">
    ${rows
      .map(
        ([label, value]) =>
          `<tr><td style="padding:6px 18px 6px 0;color:#787a7d;vertical-align:top;white-space:nowrap">${escapeHtml(
            label
          )}</td><td style="padding:6px 0;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`
      )
      .join('\n    ')}
  </table>
</div>`;

    let resend;
    try {
      resend = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [toEmail],
          reply_to: email,
          subject,
          html,
          text,
        }),
      });
    } catch {
      return fail('send_failed', 502, origin, env);
    }

    if (!resend.ok) {
      // 只记录状态码与 Resend 的错误码，不打印任何密钥
      let detail = '';
      try {
        const err = await resend.json();
        detail = `${err?.name || ''} ${err?.message || ''}`.trim().slice(0, 200);
      } catch {
        /* ignore */
      }
      console.error('resend_error', resend.status, detail);
      return fail('send_failed', 502, origin, env);
    }

    return json({ ok: true, code: 'sent' }, 200, origin, env);
  },
};
