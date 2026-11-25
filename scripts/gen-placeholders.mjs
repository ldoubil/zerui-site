/**
 * 生成占位图（几何构图，不含照片、不含外部素材）
 * 用法：node scripts/gen-placeholders.mjs
 * 输出：src/assets/images/**（JPG，可直接用同名文件替换为实拍图）
 */
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const OUT = 'src/assets/images';

const paper = '#efece3';
const ink = '#1b1b14';
const brass = '#a0783f';

function rnd(seed) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

/** 竖向细线阵列 */
function rules(w, h, n, r, color, opacity) {
  let out = '';
  for (let i = 0; i < n; i += 1) {
    const x = 40 + r() * (w - 80);
    out += `<line x1="${x.toFixed(1)}" y1="${(h * 0.1).toFixed(1)}" x2="${x.toFixed(1)}" y2="${(h * 0.9).toFixed(1)}" stroke="${color}" stroke-width="1" opacity="${opacity}"/>`;
  }
  return out;
}

/** 横线（像台面/层板） */
function shelves(w, h, n, r) {
  let out = '';
  for (let i = 0; i < n; i += 1) {
    const y = h * 0.18 + (h * 0.64 * (i + 0.5)) / n + (r() - 0.5) * 10;
    out += `<line x1="${(w * 0.06).toFixed(1)}" y1="${y.toFixed(1)}" x2="${(w * 0.94).toFixed(1)}" y2="${y.toFixed(1)}" stroke="${ink}" stroke-width="1" opacity="0.14"/>`;
  }
  return out;
}

function composition(w, h, seed, mode) {
  const r = rnd(seed);
  const g = [];
  g.push(`<defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#f6f3ec"/>
      <stop offset="0.55" stop-color="${paper}"/>
      <stop offset="1" stop-color="#e2ded1"/>
    </linearGradient>
    <linearGradient id="brass" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${brass}" stop-opacity="0.9"/>
      <stop offset="1" stop-color="${brass}" stop-opacity="0.15"/>
    </linearGradient>
  </defs>`);
  g.push(`<rect width="${w}" height="${h}" fill="url(#bg)"/>`);

  if (mode === 'product') {
    // 台面 + 柜体块面：一条水平基准线，上方留白
    const baseY = h * 0.68;
    g.push(`<rect x="${w * 0.08}" y="${baseY}" width="${w * 0.84}" height="${h * 0.02}" fill="${ink}" opacity="0.85"/>`);
    const cols = 3 + Math.floor(r() * 2);
    for (let i = 0; i < cols; i += 1) {
      const cw = (w * 0.84) / cols;
      const x = w * 0.08 + cw * i;
      g.push(`<rect x="${x + 6}" y="${baseY + h * 0.02}" width="${cw - 12}" height="${h * 0.22}" fill="none" stroke="${ink}" stroke-width="1" opacity="0.28"/>`);
    }
    g.push(`<circle cx="${w * 0.72}" cy="${h * 0.34}" r="${h * 0.14}" fill="none" stroke="${brass}" stroke-width="1.2" opacity="0.55"/>`);
    g.push(rules(w, h, 6, r, ink, '0.1'));
  } else if (mode === 'factory') {
    // 车间：斜向结构线 + 网格
    g.push(`<g opacity="0.5">${rules(w, h, 12, r, ink, '0.12')}</g>`);
    g.push(`<path d="M0 ${h * 0.82} L ${w} ${h * 0.34}" stroke="${ink}" stroke-width="1" opacity="0.3"/>`);
    g.push(`<path d="M0 ${h * 0.92} L ${w} ${h * 0.44}" stroke="${ink}" stroke-width="1" opacity="0.18"/>`);
    g.push(`<rect x="${w * 0.12}" y="${h * 0.16}" width="${w * 0.4}" height="${h * 0.3}" fill="none" stroke="${brass}" stroke-width="1.2" opacity="0.6"/>`);
    g.push(shelves(w, h, 5, r));
  } else if (mode === 'project') {
    // 庭院：地平线 + 体块 + 光带
    g.push(`<rect x="0" y="${h * 0.72}" width="${w}" height="1" fill="${ink}" opacity="0.35"/>`);
    g.push(`<rect x="${w * 0.14}" y="${h * 0.3}" width="${w * 0.34}" height="${h * 0.42}" fill="${ink}" opacity="0.07"/>`);
    g.push(`<rect x="${w * 0.14}" y="${h * 0.3}" width="${w * 0.34}" height="${h * 0.42}" fill="none" stroke="${ink}" stroke-width="1" opacity="0.3"/>`);
    g.push(`<rect x="${w * 0.26}" y="${h * 0.46}" width="${w * 0.12}" height="2" fill="url(#brass)"/>`);
    g.push(`<circle cx="${w * 0.78}" cy="${h * 0.26}" r="${h * 0.06}" fill="none" stroke="${brass}" stroke-width="1" opacity="0.5"/>`);
    g.push(rules(w, h, 4, r, ink, '0.08'));
  } else if (mode === 'guide') {
    // 文章封面：大留白 + 一条斜线 + 小色块
    g.push(`<path d="M ${w * 0.1} ${h * 0.8} L ${w * 0.62} ${h * 0.2}" stroke="${ink}" stroke-width="1" opacity="0.25"/>`);
    g.push(`<rect x="${w * 0.66}" y="${h * 0.22}" width="${w * 0.2}" height="${h * 0.02}" fill="${brass}" opacity="0.6"/>`);
    g.push(`<rect x="${w * 0.66}" y="${h * 0.28}" width="${w * 0.12}" height="${h * 0.02}" fill="${ink}" opacity="0.2"/>`);
  } else if (mode === 'about') {
    g.push(`<rect x="${w * 0.06}" y="${h * 0.14}" width="${w * 0.5}" height="${h * 0.72}" fill="none" stroke="${ink}" stroke-width="1" opacity="0.22"/>`);
    g.push(`<rect x="${w * 0.6}" y="${h * 0.2}" width="${w * 0.34}" height="${h * 0.6}" fill="${ink}" opacity="0.05"/>`);
    g.push(rules(w, h, 9, r, ink, '0.09'));
  }

  // 轻微颗粒，避免大面积渐变出现色带
  for (let i = 0; i < 900; i += 1) {
    const x = r() * w;
    const y = r() * h;
    g.push(`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(r() * 0.8 + 0.2).toFixed(2)}" fill="${ink}" opacity="${(r() * 0.05).toFixed(3)}"/>`);
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${g.join('')}</svg>`;
}

const jobs = [
  { file: 'product-islands.jpg', w: 2000, h: 1125, seed: 11, mode: 'product' },
  { file: 'product-modular.jpg', w: 2000, h: 1125, seed: 23, mode: 'product' },
  { file: 'product-grills.jpg', w: 2000, h: 1125, seed: 37, mode: 'product' },
  { file: 'product-cabinets.jpg', w: 2000, h: 1125, seed: 41, mode: 'product' },
  { file: 'factory-line.jpg', w: 1600, h: 1200, seed: 53, mode: 'factory' },
  { file: 'factory-weld.jpg', w: 1600, h: 1200, seed: 67, mode: 'factory' },
  { file: 'factory-pack.jpg', w: 1600, h: 1200, seed: 71, mode: 'factory' },
  { file: 'project-01.jpg', w: 1600, h: 1200, seed: 83, mode: 'project' },
  { file: 'project-02.jpg', w: 1600, h: 1200, seed: 97, mode: 'project' },
  { file: 'project-03.jpg', w: 1600, h: 1200, seed: 101, mode: 'project' },
  { file: 'about-band.jpg', w: 2000, h: 1000, seed: 113, mode: 'about' },
  { file: 'guide-01.jpg', w: 1600, h: 900, seed: 127, mode: 'guide' },
  { file: 'guide-02.jpg', w: 1600, h: 900, seed: 131, mode: 'guide' },
  { file: 'guide-03.jpg', w: 1600, h: 900, seed: 137, mode: 'guide' },
];

for (const job of jobs) {
  const target = join(OUT, job.file);
  await mkdir(dirname(target), { recursive: true });
  const svg = Buffer.from(composition(job.w, job.h, job.seed, job.mode));
  await sharp(svg).jpeg({ quality: 86, chromaSubsampling: '4:4:4' }).toFile(target);
  console.log('generated', target);
}
