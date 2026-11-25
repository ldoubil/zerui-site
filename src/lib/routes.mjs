/**
 * 中英路径映射：全站唯一来源。
 * 默认规则：中文 `/x/` ↔ 英文 `/en/x/`；下表是唯一的例外。
 * sitemap、hreflang/canonical、?lang= 跳转、语言切换按钮都从这里计算，
 * 页面模板（src/lib/i18n.ts）与构建脚本（scripts/build-en.mjs）共用这一张表。
 */
export const EN_ROUTE_MAP = Object.freeze({
  // 经销商页：中文 /projects/，英文沿用 /en/dealer-program/
  '/projects/': '/en/dealer-program/',
});

const ZH_ROUTE_MAP = Object.freeze(
  Object.fromEntries(Object.entries(EN_ROUTE_MAP).map(([zh, en]) => [en, zh]))
);

function normalize(path) {
  return path.endsWith('/') ? path : `${path}/`;
}

export function enPath(path) {
  const p = normalize(path);
  return EN_ROUTE_MAP[p] ?? `/en${p}`;
}

export function zhPath(path) {
  const p = normalize(path);
  return ZH_ROUTE_MAP[p] ?? (p.replace(/^\/en/, '') || '/');
}
