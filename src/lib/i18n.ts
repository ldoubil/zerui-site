/**
 * 中英文路径映射。中文不带前缀，英文统一挂在 /en/ 下。
 * 经销商页英文使用 /en/dealer-program/（与手册一致）。
 */
export function enPath(path: string): string {
  const p = path.endsWith('/') ? path : `${path}/`;
  if (p === '/') return '/en/';
  if (p === '/projects/') return '/en/dealer-program/';
  return `/en${p}`;
}

export function zhPath(path: string): string {
  const p = path.endsWith('/') ? path : `${path}/`;
  if (p === '/en/' || p === '/en') return '/';
  if (p === '/en/dealer-program/') return '/projects/';
  return p.replace(/^\/en/, '') || '/';
}
