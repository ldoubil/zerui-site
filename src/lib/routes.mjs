/**
 * 中英路径映射：全站唯一来源。
 * 英文为主：英文在根路径，中文统一在 /zh/ 下。
 * 特例：经销商页英文 /dealer-program/，中文 /zh/projects/（源页面为 /projects/）。
 * sitemap、hreflang/canonical、?lang= 跳转、语言切换按钮都从这里计算，
 * 页面模板（src/lib/i18n.ts）与构建脚本（scripts/build-i18n.mjs）共用这一张表。
 */
export const ROUTE_MAP = Object.freeze({
  // 经销商页：源页面 /projects/ → 英文 /dealer-program/，中文 /zh/projects/
  '/projects/': { en: '/dealer-program/', zh: '/zh/projects/' },
});

function normalize(path) {
  return path.endsWith('/') ? path : `${path}/`;
}

/** 源路由（中文页面）→ 英文路径 */
export function enPath(path) {
  const p = normalize(path);
  if (p === '/') return '/';
  return ROUTE_MAP[p]?.en ?? p;
}

/** 源路由（中文页面）→ 中文路径 */
export function zhPath(path) {
  const p = normalize(path);
  if (p === '/') return '/zh/';
  return ROUTE_MAP[p]?.zh ?? `/zh${p}`;
}
