/**
 * 构建后生成双语页面。
 * 英文（主语言）输出在根路径，中文输出在 /zh/ 下。
 * Astro 页面按中文内容构建，本脚本把同一份 HTML 渲染成两种语言：
 * 根路径写入英文版，/zh/ 写入中文版，保证两种语言都是服务端渲染的真实 URL。
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { parse } from 'node-html-parser';
import PDFDocument from 'pdfkit';
import { enPath, zhPath } from '../src/lib/routes.mjs';

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'dist');
const ORIGIN = 'https://zeruioutdoor.com';
const BUILD_TIME = new Date().toISOString();

const EN_TITLES = {
  '/': 'Outdoor Kitchen Pod Manufacturer | ZERUI',
  '/about/': 'About ZERUI Outdoor Kitchen Manufacturer | ZERUI',
  '/contact/': 'Contact ZERUI: Request an Outdoor Kitchen Quote | ZERUI',
  '/custom/': 'Custom Outdoor Kitchen Manufacturing & OEM | ZERUI',
  '/factory/': 'Outdoor Kitchen Factory in China | ZERUI',
  '/faq/': 'Outdoor Kitchen FAQ: MOQ, Shipping & Certification | ZERUI',
  '/guides/': 'Outdoor Kitchen Buying & Installation Guide | ZERUI',
  '/privacy/': 'Privacy Policy | ZERUI',
  '/products/': 'Outdoor Kitchen Pods & Prefab Kitchens | ZERUI',
  '/products/cabinets/': 'Stainless Steel Outdoor Kitchen Cabinets | ZERUI',
  '/products/grills/': 'Outdoor Grill Manufacturer: Built-In & Freestanding | ZERUI',
  '/products/islands/': 'Outdoor Kitchen Islands Manufacturer | ZERUI',
  '/products/modular/': 'Modular Outdoor Kitchen Systems | ZERUI',
  '/projects/': 'Outdoor Kitchen Dealer & Distributor Program | ZERUI',
  '/case-studies/': 'Outdoor Kitchen Project Case Studies | ZERUI',
  '/resources/': 'Buyer Resources: Compliance, Shipping & Installation | ZERUI',
  '/resources/compliance/': 'Outdoor Kitchen Compliance & Certification | ZERUI',
  '/resources/shipping/': 'Outdoor Kitchen Export Packing & Shipping | ZERUI',
  '/resources/installation/': 'Outdoor Kitchen Installation Preparation Checklist | ZERUI',
  '/custom/oem/': 'Custom Outdoor Kitchen OEM & Private Label | ZERUI',
  '/product/obsidian/': 'Obsidian Outdoor Kitchen Pod with Lift-Up Canopy | ZERUI',
  '/product/lumiere/': 'Lumière Courtyard Outdoor Kitchen Pod | ZERUI',
  '/product/copper-studio/': 'Copper Studio Outdoor Kitchen & Entertainment Pod | ZERUI',
  '/product/chef-edition/': 'Chef Edition Flagship Outdoor Kitchen Pod | ZERUI',
  '/product/mirror-edition/': 'Mirror Edition Architectural Outdoor Kitchen Pod | ZERUI',
};

const SOURCE_FILES = {
  '/': 'src/pages/index.astro',
  '/about/': 'src/pages/about/index.astro',
  '/contact/': 'src/pages/contact/index.astro',
  '/custom/': 'src/pages/custom/index.astro',
  '/factory/': 'src/pages/factory/index.astro',
  '/faq/': 'src/pages/faq/index.astro',
  '/guides/': 'src/pages/guides/index.astro',
  '/privacy/': 'src/pages/privacy/index.astro',
  '/products/': 'src/pages/products/index.astro',
  '/projects/': 'src/pages/projects/index.astro',
  '/case-studies/': 'src/pages/case-studies/index.astro',
  '/resources/': 'src/pages/resources/index.astro',
  '/resources/compliance/': 'src/pages/resources/compliance/index.astro',
  '/resources/shipping/': 'src/pages/resources/shipping/index.astro',
  '/resources/installation/': 'src/pages/resources/installation/index.astro',
  '/custom/oem/': 'src/pages/custom/oem.astro',
  '/products/cabinets/': 'src/pages/products/[category].astro',
  '/products/grills/': 'src/pages/products/[category].astro',
  '/products/islands/': 'src/pages/products/[category].astro',
  '/products/modular/': 'src/pages/products/[category].astro',
  '/product/obsidian/': 'src/pages/product/[slug].astro',
  '/product/lumiere/': 'src/pages/product/[slug].astro',
  '/product/copper-studio/': 'src/pages/product/[slug].astro',
  '/product/chef-edition/': 'src/pages/product/[slug].astro',
  '/product/mirror-edition/': 'src/pages/product/[slug].astro',
};

const ASSET_PREFIXES = [
  '/_astro/',
  '/videos/',
  '/assets/',
  '/specs/',
  '/favicon',
  '/apple-touch-icon',
  '/icon-',
  '/maskable-',
  '/og-image',
  '/site.webmanifest',
  '/robots.txt',
  '/sitemap',
  '/logo.svg',
];

const EN_KEYWORDS =
  'outdoor kitchen,outdoor kitchen pod,outdoor kitchen manufacturer,custom outdoor kitchen,outdoor kitchen factory,stainless steel outdoor kitchen,modular outdoor kitchen,outdoor kitchen OEM,outdoor kitchen dealer,ZERUI';
const EN_OG_ALT = 'ZERUI · Professional Outdoor Kitchen Manufacturer';

function abs(p) {
  return ORIGIN + p;
}

function readPages(dir, base = '/') {
  const out = [];
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (name === 'en' || name === 'zh') continue;
      out.push(...readPages(full, `${base}${name}/`));
    } else if (name === 'index.html') {
      out.push({ route: base, file: full });
    }
  }
  return out;
}

function writePage(route, html) {
  const file = path.join(DIST, route.replace(/^\//, ''), 'index.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
}

function rewriteHref(href, lang) {
  if (!href || !href.startsWith('/')) return href;
  if (href.startsWith('/en/') || href === '/en') return href;
  if (href.startsWith('/zh/') || href === '/zh') return href;
  if (ASSET_PREFIXES.some((p) => href.startsWith(p))) return href;
  const [pathPart, hash] = href.split('#');
  if (!pathPart) return href;
  const map = lang === 'zh' ? zhPath : enPath;
  const target = map(pathPart);
  return hash ? `${target}#${hash}` : target;
}

function isChinese(ch) {
  return /[\u4e00-\u9fff]/.test(ch);
}

// node-html-parser 写回文本时会把非 ASCII 转成数字实体，这里还原成原文（保留 ASCII 实体）
function decodeNumericNonAscii(html) {
  return html
    .replace(/&#x([0-9a-f]+);/gi, (m, hex) => {
      const cp = parseInt(hex, 16);
      return cp > 0x7f ? String.fromCodePoint(cp) : m;
    })
    .replace(/&#(\d+);/g, (m, dec) => {
      const cp = Number(dec);
      return cp > 0x7f ? String.fromCodePoint(cp) : m;
    });
}

function decodeEntities(text) {
  return text
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replace(/&amp;/g, '&');
}

function faqItemsFromHtml(html) {
  const items = [];
  const re = /<div class="faq-item"[^>]*>/g;
  let match;
  while ((match = re.exec(html))) {
    const tag = match[0];
    const q = tag.match(/data-q-en="([^"]*)"/);
    const a = tag.match(/data-a-en="([^"]*)"/);
    if (q && a) items.push({ q: decodeEntities(q[1]), a: decodeEntities(a[1]) });
  }
  return items;
}

const ROUTE_SET = new Set(Object.keys(SOURCE_FILES));

function rewriteOriginUrls(value, lang) {
  return value.replace(/https:\/\/zeruioutdoor\.com(\/[^"\\\s]*)?/g, (m, p) => {
    const full = p || '/';
    const [pathname, hash] = full.split('#');
    const normalized = pathname.endsWith('/') ? pathname : `${pathname}/`;
    // 首页保持根地址，避免 Organization / WebSite 的 @id 随语言变化
    if (normalized === '/' || !ROUTE_SET.has(normalized)) return m;
    const target = lang === 'zh' ? zhPath(normalized) : enPath(normalized);
    return abs(target) + (hash ? `#${hash}` : '');
  });
}

function walkJsonLd(value, lang) {
  if (typeof value === 'string') return rewriteOriginUrls(value, lang);
  if (Array.isArray(value)) return value.map((item) => walkJsonLd(item, lang));
  if (value && typeof value === 'object') {
    const out = {};
    for (const [key, val] of Object.entries(value)) out[key] = walkJsonLd(val, lang);
    return out;
  }
  return value;
}

function localizeJsonLd(html, route, lang, faqItems) {
  return html.replace(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
    (match, body) => {
      let data;
      try {
        data = JSON.parse(decodeEntities(body));
      } catch {
        return match;
      }
      data = walkJsonLd(data, lang);
      for (const node of data['@graph'] || [data]) {
        if (lang === 'en' && node && node['@type'] === 'Organization') {
          node.name = 'ZERUI';
          node.alternateName = ['ZERUI Outdoor Kitchens', '泽锐 zerui', '泽锐户外厨房'];
          node.description =
            'ZERUI is an outdoor kitchen manufacturer and factory in Linyi, China, producing stainless steel outdoor kitchen pods, modular systems, grills and cabinets for custom, OEM and ODM projects worldwide.';
        }
        if (lang === 'en' && node && node['@type'] === 'WebSite') node.name = 'ZERUI';
        if (lang === 'en' && route === '/faq/' && faqItems.length && node['@type'] === 'FAQPage') {
          node['@id'] = `${abs(enPath('/faq/'))}#faq`;
          node.mainEntity = faqItems.map((item) => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: { '@type': 'Answer', text: item.a },
          }));
        }
      }
      return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
    }
  );
}

function render(html, route, lang) {
  const isEn = lang === 'en';
  const root = parse(html, {
    comment: true,
    blockTextElements: { script: true, style: true, pre: true },
  });

  // 先把标题/描述取出来，再清掉 body 上的构建属性
  const body = root.querySelector('body');
  const titleZh = body?.getAttribute('data-title-zh') || root.querySelector('title')?.textContent || '';
  const titleEn = body?.getAttribute('data-title-en') || titleZh;
  const descZh = body?.getAttribute('data-desc-zh') || '';
  const descEn = body?.getAttribute('data-desc-en') || descZh;
  if (body) {
    for (const attr of ['data-title-zh', 'data-title-en', 'data-desc-zh', 'data-desc-en']) {
      body.removeAttribute(attr);
    }
  }

  const enRoute = enPath(route);
  const zhRoute = zhPath(route);
  const enUrl = abs(enRoute);
  const zhUrl = abs(zhRoute);

  const htmlEl = root.querySelector('html');
  if (htmlEl) {
    htmlEl.setAttribute('lang', isEn ? 'en' : 'zh-CN');
    htmlEl.setAttribute('data-lang', isEn ? 'en' : 'zh');
    htmlEl.setAttribute('data-en-url', enRoute);
    htmlEl.setAttribute('data-zh-url', zhRoute);
  }

  if (isEn) {
    // 英文：把 data-en 文本写进 HTML
    for (const el of root.querySelectorAll('[data-en]')) {
      const value = el.getAttribute('data-en');
      if (typeof value === 'string' && value.trim()) el.textContent = value;
      el.removeAttribute('data-en');
    }
    for (const el of root.querySelectorAll('[data-alt-en]')) {
      const value = el.getAttribute('data-alt-en');
      if (value) el.setAttribute('alt', value);
      el.removeAttribute('data-alt-en');
    }
    for (const el of root.querySelectorAll('[data-aria-en]')) {
      const value = el.getAttribute('data-aria-en');
      if (value) el.setAttribute('aria-label', value);
      el.removeAttribute('data-aria-en');
    }
    // 仅中文的补充标签（型号中文名）在英文页移除
    for (const el of root.querySelectorAll('.model-zh')) el.remove();
    root.querySelector('#primary-nav')?.setAttribute('aria-label', 'Main navigation');
    for (const nav of root.querySelectorAll('footer nav')) nav.setAttribute('aria-label', 'Footer links');
    for (const img of root.querySelectorAll('img[alt="ZERUI 泽锐"]')) img.setAttribute('alt', 'ZERUI');
    // 表单占位符：直接写英文，避免 JS 之前短暂显示中文
    for (const el of root.querySelectorAll('[data-ph-en]')) {
      const value = el.getAttribute('data-ph-en');
      if (value) el.setAttribute('placeholder', value);
    }
  } else {
    // 中文：保留正文，清掉英文替身属性
    for (const el of root.querySelectorAll('[data-en]')) el.removeAttribute('data-en');
    for (const el of root.querySelectorAll('[data-alt-en]')) el.removeAttribute('data-alt-en');
    for (const el of root.querySelectorAll('[data-aria-en]')) el.removeAttribute('data-aria-en');
    for (const el of root.querySelectorAll('[data-q-en]')) el.removeAttribute('data-q-en');
    for (const el of root.querySelectorAll('[data-a-en]')) el.removeAttribute('data-a-en');
  }

  const title = isEn ? EN_TITLES[route] || titleEn : titleZh;
  const desc = isEn ? descEn : descZh;
  const titleEl = root.querySelector('title');
  if (titleEl) titleEl.textContent = title;

  const setMeta = (selector, attr, value) => {
    const el = root.querySelector(selector);
    if (el && value) el.setAttribute(attr, value);
  };

  setMeta('meta[name="description"]', 'content', desc);
  setMeta('meta[property="og:title"]', 'content', title);
  setMeta('meta[property="og:description"]', 'content', desc);
  setMeta('meta[property="og:url"]', 'content', isEn ? enUrl : zhUrl);
  setMeta('meta[name="twitter:title"]', 'content', title);
  setMeta('meta[name="twitter:description"]', 'content', desc);
  setMeta('meta[property="og:locale"]', 'content', isEn ? 'en_US' : 'zh_CN');
  setMeta('meta[property="og:locale:alternate"]', 'content', isEn ? 'zh_CN' : 'en_US');
  if (isEn) {
    setMeta('meta[name="author"]', 'content', 'ZERUI');
    setMeta('meta[property="og:site_name"]', 'content', 'ZERUI');
    setMeta('meta[property="og:image:alt"]', 'content', EN_OG_ALT);
    setMeta('meta[name="twitter:image:alt"]', 'content', EN_OG_ALT);
    setMeta('meta[name="keywords"]', 'content', EN_KEYWORDS);
  }

  const canonical = root.querySelector('link[rel="canonical"]');
  if (canonical) canonical.setAttribute('href', isEn ? enUrl : zhUrl);

  const alternates = {
    'zh-CN': zhUrl,
    en: enUrl,
    'x-default': enUrl,
  };
  for (const [code, href] of Object.entries(alternates)) {
    const link = root.querySelector(`link[rel="alternate"][hreflang="${code}"]`);
    if (link) link.setAttribute('href', href);
  }

  // 站内链接指向当前语言版本
  for (const a of root.querySelectorAll('a[href]')) {
    const href = a.getAttribute('href');
    const next = rewriteHref(href, lang);
    if (next !== href) a.setAttribute('href', next);
  }

  // 语言切换（放在链接重写之后，避免被再次改写）
  const toggle = root.querySelector('#lang-toggle');
  if (toggle) {
    if (isEn) {
      toggle.setAttribute('href', zhRoute);
      toggle.setAttribute('hreflang', 'zh-CN');
      toggle.setAttribute('lang', 'zh-CN');
      toggle.setAttribute('aria-label', 'Switch to Chinese');
      toggle.textContent = '中文';
    } else {
      toggle.setAttribute('href', enRoute);
      toggle.setAttribute('hreflang', 'en');
      toggle.setAttribute('lang', 'en');
      toggle.setAttribute('aria-label', 'Switch to English');
      toggle.textContent = 'EN';
    }
  }

  const faqItems = isEn && route === '/faq/' ? faqItemsFromHtml(html) : [];
  const output = localizeJsonLd(root.toString(), route, lang, faqItems);
  return { html: decodeNumericNonAscii(output), enRoute, zhRoute };
}

// ---- 旧路径跳转（边缘未生效时的兜底）----
function writeStub(fromRoute, target) {
  const file = path.join(DIST, fromRoute.replace(/^\//, ''), 'index.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const targetUrl = abs(target);
  fs.writeFileSync(
    file,
    `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Redirecting…</title>
<link rel="canonical" href="${targetUrl}">
<meta name="robots" content="noindex,follow">
<meta http-equiv="refresh" content="0; url=${targetUrl}">
<script>location.replace(${JSON.stringify(target)} + location.search + location.hash);</script>
</head>
<body>
<p>This page has moved to <a href="${target}">${target}</a>.</p>
</body>
</html>
`
  );
}

const SHARED_FILES = [
  'src/data/pods.ts',
  'src/data/faq.ts',
  'src/data/site.ts',
  'src/layouts/Layout.astro',
  'src/components/Header.astro',
  'src/components/Footer.astro',
  'src/styles/global.css',
];

const fileTimes = new Map();

function gitTime(file) {
  if (fileTimes.has(file)) return fileTimes.get(file);
  let time = '';
  try {
    time = execFileSync('git', ['log', '-1', '--format=%cI', '--', file], {
      cwd: ROOT,
      encoding: 'utf8',
    }).trim();
  } catch {
    time = '';
  }
  fileTimes.set(file, time);
  return time;
}

function lastmodFor(route) {
  const files = [SOURCE_FILES[route], ...SHARED_FILES].filter(Boolean);
  const times = files.map(gitTime).filter(Boolean).sort();
  return times.length ? times[times.length - 1] : BUILD_TIME;
}

const DEFAULT_OG = `${ORIGIN}/og-image.png`;

function buildSitemap(routes, images) {
  const entries = [];
  for (const route of routes) {
    const lm = lastmodFor(route);
    const enUrl = abs(enPath(route));
    const zhUrl = abs(zhPath(route));
    const image = images.get(route);
    const imageTag =
      image && image !== DEFAULT_OG
        ? `    <image:image><image:loc>${image}</image:loc></image:image>\n`
        : '';
    for (const loc of [enUrl, zhUrl]) {
      entries.push(
        `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lm}</lastmod>\n` +
          imageTag +
          `    <xhtml:link rel="alternate" hreflang="zh-CN" href="${zhUrl}"/>\n` +
          `    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}"/>\n` +
          `    <xhtml:link rel="alternate" hreflang="x-default" href="${enUrl}"/>\n` +
          `  </url>`
      );
    }
  }
  return (
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n` +
    `${entries.join('\n')}\n</urlset>\n`
  );
}

function buildIndex() {
  return (
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    `  <sitemap><loc>${ORIGIN}/sitemap-0.xml</loc><lastmod>${BUILD_TIME}</lastmod></sitemap>\n` +
    `</sitemapindex>\n`
  );
}

// ---- 规格表 PDF ----
function specRowsFromHtml(html) {
  const root = parse(html);
  const rows = [];
  for (const tr of root.querySelectorAll('.spec-table tr')) {
    const th = tr.querySelector('th');
    const td = tr.querySelector('td');
    if (!th || !td) continue;
    const label = th.textContent.replace(/\s+/g, ' ').trim();
    const value = td.textContent.replace(/\s+/g, ' ').trim();
    if (label && value) rows.push([label, value]);
  }
  return rows;
}

function writeSpecSheet(file, title, rows) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const doc = new PDFDocument({
    size: 'A4',
    margin: 48,
    info: { Title: `${title} - Specification`, Author: 'ZERUI' },
  });
  doc.pipe(fs.createWriteStream(file));

  doc.font('Helvetica-Bold').fontSize(17).fillColor('#14161a').text('ZERUI');
  doc
    .font('Helvetica')
    .fontSize(8)
    .fillColor('#6b6f76')
    .text('Professional outdoor kitchen manufacturer  ·  zeruioutdoor.com');
  doc.moveDown(1.1);
  doc.font('Helvetica-Bold').fontSize(14).fillColor('#14161a').text(`${title} - specification`, {
    width: 499,
  });
  doc.moveDown(0.35);
  doc
    .font('Helvetica')
    .fontSize(8)
    .fillColor('#6b6f76')
    .text(
      `Generated ${new Date().toISOString().slice(0, 10)}. Final configuration, packed size and weight are confirmed at quotation.`,
      { width: 499 }
    );
  doc.moveDown(0.9);

  for (const [label, value] of rows) {
    if (doc.y > 720) doc.addPage();
    const y = doc.y;
    doc.moveTo(48, y).lineTo(547, y).lineWidth(0.5).strokeColor('#e2e2e2').stroke();
    doc
      .font('Helvetica-Bold')
      .fontSize(8.5)
      .fillColor('#14161a')
      .text(label, 48, y + 6, { width: 136 });
    const labelBottom = doc.y;
    doc
      .font('Helvetica')
      .fontSize(8.5)
      .fillColor('#33373d')
      .text(value, 190, y + 6, { width: 357 });
    doc.y = Math.max(labelBottom, doc.y) + 6;
  }

  doc.moveDown(1);
  doc
    .font('Helvetica')
    .fontSize(7.5)
    .fillColor('#6b6f76')
    .text(
      'ZERUI · Outdoor kitchen pods and modular systems · Linyi, Shandong, China · zeruioutdoor.com',
      48,
      doc.y,
      { width: 499 }
    );
  doc.end();
}

// ---- main ----
// CI 默认浅克隆，补全历史后 sitemap 的 lastmod 才能取到真实内容更新时间
try {
  const shallow = execFileSync('git', ['rev-parse', '--is-shallow-repository'], {
    cwd: ROOT,
    encoding: 'utf8',
  }).trim();
  if (shallow === 'true') {
    execFileSync('git', ['fetch', '--unshallow', '--quiet'], {
      cwd: ROOT,
      stdio: 'ignore',
      timeout: 180000,
    });
  }
} catch {}

const pages = readPages(DIST)
  .filter((p) => p.route !== '/404/' && !p.route.startsWith('/en/') && !p.route.startsWith('/zh/'))
  .sort((a, b) => a.route.localeCompare(b.route));

const routes = pages.map((p) => p.route);
const images = new Map();
let enWithCjk = 0;

for (const page of pages) {
  const html = fs.readFileSync(page.file, 'utf8');
  const en = render(html, page.route, 'en');
  const zh = render(html, page.route, 'zh');

  writePage(en.enRoute, en.html);
  writePage(zh.zhRoute, zh.html);

  writeStub(`/en${page.route}`, en.enRoute);
  if (en.enRoute !== page.route) writeStub(page.route, en.enRoute);

  const text = en.html
    .replace(/<a class="lang-btn"[\s\S]*?<\/a>/g, ' ')
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<[^>]+>/g, ' ');
  const cjk = [...text].filter(isChinese).length;
  if (cjk) enWithCjk++;
  images.set(page.route, (html.match(/<meta property="og:image" content="([^"]+)"/) || [])[1] || '');

  // 每个产品页生成一份英文规格表 PDF
  if (page.route.startsWith('/product/')) {
    const slug = page.route.split('/')[2];
    const h1 = (en.html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || slug;
    const title = decodeEntities(h1.replace(/<[^>]+>/g, ''))
      .replace(/\s+/g, ' ')
      .trim();
    writeSpecSheet(
      path.join(DIST, 'specs', `${slug}-outdoor-kitchen-spec-sheet.pdf`),
      title,
      specRowsFromHtml(en.html)
    );
  }
}

fs.writeFileSync(path.join(DIST, 'sitemap-0.xml'), buildSitemap(routes, images));
fs.writeFileSync(path.join(DIST, 'sitemap-index.xml'), buildIndex());
fs.writeFileSync(path.join(DIST, 'sitemap.xml'), buildIndex());

console.log(`routes: ${routes.length}`);
console.log(`en pages: ${routes.length} (with CJK leftovers: ${enWithCjk})`);
console.log(`zh pages: ${routes.length}`);
console.log(
  `sitemap urls: ${routes.length * 2}  images: ${[...images.values()].filter((v) => v && v !== DEFAULT_OG).length}`
);
for (const route of routes) console.log(`  ${enPath(route)}  |  ${zhPath(route)}`);

// 部署时把双语 URL 推送给 IndexNow（Bing 等），本地构建不推送
if (process.env.GITHUB_ACTIONS === 'true') {
  const key = '90722fe68dce49b5b2b350b66941b31b';
  const urlList = routes.flatMap((route) => [abs(enPath(route)), abs(zhPath(route))]);
  try {
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host: 'zeruioutdoor.com',
        key,
        keyLocation: `${ORIGIN}/${key}.txt`,
        urlList,
      }),
    });
    console.log(`indexnow: ${res.status} (${urlList.length} urls)`);
  } catch (error) {
    console.log(`indexnow skipped: ${error.message}`);
  }
}
