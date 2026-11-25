import { getImage } from 'astro:assets';
// TODO: 换成更高分辨率/更广视角的原始素材时，只需替换这两张图，构建会自动重新生成各尺寸。
// 桌面图当前 4096×1884（用户提供）；移动图是从同一张原图按主体裁出的竖版取景。
// 图片服务按参数缓存，组件与预加载共用本文件即可命中同一份产物。
import heroDesktop from '../assets/hero/outdoor-kitchen-1024x440.jpg';
import heroMobile from '../assets/hero/outdoor-kitchen-mobile.jpg';

export const HERO_DESKTOP_WIDTHS = [640, 960, 1280, 1600, 2048];
export const HERO_MOBILE_WIDTHS = [480, 720, 960];

export function getHeroSources() {
  return Promise.all([
    getImage({ src: heroDesktop, widths: HERO_DESKTOP_WIDTHS, sizes: '100vw', format: 'avif' }),
    getImage({ src: heroDesktop, widths: HERO_DESKTOP_WIDTHS, sizes: '100vw', format: 'webp' }),
    getImage({ src: heroMobile, widths: HERO_MOBILE_WIDTHS, sizes: '100vw', format: 'avif' }),
    getImage({ src: heroMobile, widths: HERO_MOBILE_WIDTHS, sizes: '100vw', format: 'webp' }),
  ]).then(([desktopAvif, desktopWebp, mobileAvif, mobileWebp]) => ({
    desktopAvif,
    desktopWebp,
    mobileAvif,
    mobileWebp,
  }));
}
