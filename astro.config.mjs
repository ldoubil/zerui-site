import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// 线上主域（与 CNAME 保持一致）
const SITE = 'https://zeruioutdoor.com';
// 构建时间，用作 sitemap 的 lastmod
const BUILD_TIME = new Date().toISOString();

export default defineConfig({
  site: SITE,
  output: 'static',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  integrations: [
    sitemap({
      // 404 不进站点地图
      filter: (page) => !page.includes('/404'),
      // 双语站通过 ?lang=en 切换，这里为每个页面补上三条 hreflang
      serialize(item) {
        const isHome = item.url === `${SITE}/`;
        return {
          url: item.url,
          lastmod: BUILD_TIME,
          changefreq: isHome ? 'weekly' : 'monthly',
          priority: isHome ? 1.0 : 0.7,
          links: [
            { url: item.url, lang: 'zh-CN' },
            { url: `${item.url}?lang=en`, lang: 'en' },
            { url: item.url, lang: 'x-default' },
          ],
        };
      },
    }),
  ],
});
