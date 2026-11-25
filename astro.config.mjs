import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// 线上主域（与 CNAME 保持一致）
const SITE = 'https://zeruioutdoor.com';

export default defineConfig({
  site: SITE,
  output: 'static',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  integrations: [
    // 基础 sitemap 由集成生成，最终由 scripts/build-en.mjs 覆盖为
    // 含真实 lastmod、双向 hreflang 与 image 条目的版本
    sitemap({
      filter: (page) => !page.includes('/404'),
    }),
  ],
});
