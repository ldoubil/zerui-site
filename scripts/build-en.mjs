/**
 * 构建后生成英文页面（/en/…）与多语言 sitemap。
 * 中文页面在构建时输出，英文版由同一份 HTML 依据 data-en 文本生成，
 * 保证两种语言都是服务端渲染的真实 URL，而不是 JS 切换。
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { parse } from 'node-html-parser';

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'dist');
const ORIGIN = 'https://zeruioutdoor.com';
const BUILD_TIME = new Date().toISOString();

const EN_TITLES = {
  '/': 'Prefab Outdoor Kitchen Pods for Dealers & Contractors | ZERUI',
  '/about/': 'About ZERUI Outdoor Kitchen Manufacturer | ZERUI',
  '/contact/': 'Contact ZERUI: Request an Outdoor Kitchen Quote | ZERUI',
  '/custom/': 'Custom Outdoor Kitchen Manufacturing & OEM | ZERUI',
  '/factory/': 'Our Outdoor Kitchen Factory in Linyi, China | ZERUI',
  '/faq/': 'Outdoor Kitchen Manufacturing FAQ: MOQ, Shipping, Certification | ZERUI',
  '/guides/': 'Outdoor Kitchen Buying Guide for Importers & Dealers | ZERUI',
  '/privacy/': 'Privacy Policy | ZERUI',
  '/products/': 'Outdoor Kitchen Pods, Islands & Modular Systems | ZERUI',
  '/products/cabinets/': 'Stainless Steel Outdoor Kitchen Cabinets & Accessories | ZERUI',
  '/products/grills/': 'Built-In & Freestanding Outdoor Grills | ZERUI',
  '/products/islands/': 'Integrated Outdoor Kitchen Islands, Built to Project | ZERUI',
  '/products/modular/': 'Modular Outdoor Kitchen Systems for Dealers | ZERUI',
  '/projects/': 'Outdoor Kitchen Dealer & Distributor Program | ZERUI',
  '/product/obsidian/': 'Obsidian Integrated Outdoor Kitchen Pod with Lift-Up Canopy | ZERUI',
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

export function enPath(p) {
  const clean = p.endsWith('/') ? p : `${p}/`;
  if (clean === '/') return '/en/';
  if (clean === '/projects/') return '/en/dealer-program/';
  return `/en${clean}`;
}

function zhPathOf(p) {
  if (p === '/en/' || p === '/en') return '/';
  if (p === '/en/dealer-program/') return '/projects/';
  return p.replace(/^\/en/, '') || '/';
}

function abs(p) {
  return ORIGIN + p;
}

function readPages(dir, base = '/') {
  const out = [];
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (name === 'en') continue;
      out.push(...readPages(full, `${base}${name}/`));
    } else if (name === 'index.html') {
      out.push({ route: base, file: full });
    }
  }
  return out;
}

function rewriteHref(href) {
  if (!href || !href.startsWith('/')) return href;
  if (href.startsWith('/en/') || href === '/en') return href;
  if (ASSET_PREFIXES.some((p) => href.startsWith(p))) return href;
  const [pathPart, hash] = href.split('#');
  const target = enPath(pathPart);
  return hash ? `${target}#${hash}` : target;
}

function isChinese(ch) {
  return /[\u4e00-\u9fff]/.test(ch);
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

function rewriteOriginUrls(value) {
  return value.replace(/https:\/\/zeruioutdoor\.com(\/[^"\\\s]*)?/g, (m, p) => {
    const pathname = p || '/';
    if (pathname.includes('#')) return m;
    const normalized = pathname.endsWith('/') ? pathname : `${pathname}/`;
    if (!ROUTE_SET.has(normalized)) return m;
    return abs(enPath(normalized));
  });
}

function walkJsonLd(value) {
  if (typeof value === 'string') return rewriteOriginUrls(value);
  if (Array.isArray(value)) return value.map(walkJsonLd);
  if (value && typeof value === 'object') {
    const out = {};
    for (const [key, val] of Object.entries(value)) out[key] = walkJsonLd(val);
    return out;
  }
  return value;
}

function localizeJsonLd(html, route, faqItems) {
  return html.replace(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
    (match, body) => {
      let data;
      try {
        data = JSON.parse(decodeEntities(body));
      } catch {
        return match;
      }
      data = walkJsonLd(data);
      if (route === '/faq/' && faqItems.length) {
        const list = data['@graph'] || [data];
        for (const node of list) {
          if (node['@type'] === 'FAQPage') {
            node['@id'] = `${ORIGIN}/en/faq/#faq`;
            node.mainEntity = faqItems.map((item) => ({
              '@type': 'Question',
              name: item.q,
              acceptedAnswer: { '@type': 'Answer', text: item.a },
            }));
          }
        }
      }
      return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
    }
  );
}

function transform(html, route) {
  const faqItems = route === '/faq/' ? faqItemsFromHtml(html) : [];
  const root = parse(html, { comment: true, blockTextElements: { script: true, style: true, pre: true } });
  const enRoute = enPath(route);
  const zhUrl = abs(route);
  const enUrl = abs(enRoute);

  const htmlEl = root.querySelector('html');
  if (htmlEl) {
    htmlEl.setAttribute('lang', 'en');
    htmlEl.setAttribute('data-lang', 'en');
  }

  // 正文：把 data-en 文本写进 HTML
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

  // 英文页的固定界面文案
  root.querySelector('#primary-nav')?.setAttribute('aria-label', 'Main navigation');
  for (const nav of root.querySelectorAll('footer nav')) nav.setAttribute('aria-label', 'Footer links');
  for (const img of root.querySelectorAll('img[alt="ZERUI 泽锐"]')) img.setAttribute('alt', 'ZERUI');

  // head
  const body = root.querySelector('body');
  const title = EN_TITLES[route] || body?.getAttribute('data-title-en') || root.querySelector('title')?.textContent || '';
  const desc = body?.getAttribute('data-desc-en') || '';
  if (body) {
    for (const attr of ['data-title-zh', 'data-title-en', 'data-desc-zh', 'data-desc-en']) {
      body.removeAttribute(attr);
    }
  }
  const titleEl = root.querySelector('title');
  if (titleEl) titleEl.textContent = title;

  const setMeta = (selector, attr, value) => {
    const el = root.querySelector(selector);
    if (el && value) el.setAttribute(attr, value);
  };
  setMeta('meta[name="description"]', 'content', desc);
  setMeta('meta[property="og:title"]', 'content', title);
  setMeta('meta[property="og:description"]', 'content', desc);
  setMeta('meta[property="og:url"]', 'content', enUrl);
  setMeta('meta[name="twitter:title"]', 'content', title);
  setMeta('meta[name="twitter:description"]', 'content', desc);
  setMeta('meta[property="og:locale"]', 'content', 'en_US');
  setMeta('meta[property="og:locale:alternate"]', 'content', 'zh_CN');
  setMeta('meta[name="author"]', 'content', 'ZERUI');
  setMeta('meta[property="og:site_name"]', 'content', 'ZERUI');
  setMeta(
    'meta[property="og:image:alt"]',
    'content',
    'ZERUI · Professional Outdoor Kitchen Manufacturer'
  );
  setMeta(
    'meta[name="twitter:image:alt"]',
    'content',
    'ZERUI · Professional Outdoor Kitchen Manufacturer'
  );
  setMeta(
    'meta[name="keywords"]',
    'content',
    'outdoor kitchen,outdoor kitchen pod,outdoor kitchen manufacturer,custom outdoor kitchen,outdoor kitchen factory,stainless steel outdoor kitchen,modular outdoor kitchen,outdoor kitchen OEM,outdoor kitchen dealer,ZERUI'
  );

  const canonical = root.querySelector('link[rel="canonical"]');
  if (canonical) canonical.setAttribute('href', enUrl);

  const alternates = {
    'zh-CN': zhUrl,
    en: enUrl,
    'x-default': enUrl,
  };
  for (const [lang, href] of Object.entries(alternates)) {
    const link = root.querySelector(`link[rel="alternate"][hreflang="${lang}"]`);
    if (link) link.setAttribute('href', href);
  }

  // 站内链接指向对应英文页
  for (const a of root.querySelectorAll('a[href]')) {
    const href = a.getAttribute('href');
    const next = rewriteHref(href);
    if (next !== href) a.setAttribute('href', next);
  }

  // 语言切换变成真实链接（放在链接重写之后，避免被再次改写）
  const toggle = root.querySelector('#lang-toggle');
  if (toggle) {
    toggle.setAttribute('href', route);
    toggle.setAttribute('hreflang', 'zh-CN');
    toggle.setAttribute('lang', 'zh-CN');
    toggle.setAttribute('aria-label', '切换到中文');
    toggle.textContent = '中文';
  }

  const ogImage = root.querySelector('meta[property="og:image"]')?.getAttribute('content') || '';
  const output = localizeJsonLd(root.toString(), route, faqItems);

  return { html: output, enRoute, ogImage };
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
    const en = enPath(route);
    const zhUrl = abs(route);
    const enUrl = abs(en);
    const image = images.get(route);
    const imageTag =
      image && image !== DEFAULT_OG
        ? `    <image:image><image:loc>${image}</image:loc></image:image>\n`
        : '';
    for (const loc of [zhUrl, enUrl]) {
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
  .filter((p) => p.route !== '/404/' && !p.route.startsWith('/en/'))
  .sort((a, b) => a.route.localeCompare(b.route));

const routes = pages.map((p) => p.route);
const report = [];
const images = new Map();

for (const page of pages) {
  const html = fs.readFileSync(page.file, 'utf8');
  const { html: enHtml, enRoute, ogImage } = transform(html, page.route);
  images.set(page.route, ogImage);
  const outFile = path.join(DIST, enRoute.replace(/^\//, ''), 'index.html');
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, enHtml);

  const text = enHtml
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<[^>]+>/g, ' ');
  const cjk = [...text].filter(isChinese).length;
  report.push({ route: page.route, enRoute, cjk });
}

fs.writeFileSync(path.join(DIST, 'sitemap-0.xml'), buildSitemap(routes, images));
fs.writeFileSync(path.join(DIST, 'sitemap-index.xml'), buildIndex());
fs.writeFileSync(path.join(DIST, 'sitemap.xml'), buildIndex());

console.log(`en pages: ${pages.length}`);
for (const r of report) console.log(`  ${r.enRoute}  CJK:${r.cjk}`);
console.log(`sitemap urls: ${routes.length * 2}  images: ${[...images.values()].filter((v) => v && v !== DEFAULT_OG).length}`);

// 部署时把双语 URL 推送给 IndexNow（Bing 等），本地构建不推送
if (process.env.GITHUB_ACTIONS === 'true') {
  const key = '90722fe68dce49b5b2b350b66941b31b';
  const urlList = routes.flatMap((route) => [abs(route), abs(enPath(route))]);
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
