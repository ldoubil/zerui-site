/* ============================================================
   泽锐 zerui — 单屏首页
   仅：语言切换（中 / EN）、移动端菜单
   ============================================================ */
(function () {
  'use strict';

  var html = document.documentElement;
  var toggle = document.getElementById('lang-toggle');
  var menuBtn = document.getElementById('menu-btn');
  var nav = document.getElementById('primary-nav');

  var META = {
    zh: {
      title: '泽锐 zerui｜专业户外厨房制造商 · 不锈钢户外厨房工厂',
      desc: '泽锐 zerui 是专注不锈钢户外厨房的制造工厂，提供一体化户外厨房岛台、模块化系统与专业烧烤炉的 OEM/ODM 定制，自有工厂全流程生产，支持全球出口与交付。'
    },
    en: {
      title: 'ZERUI | Professional Outdoor Kitchen Manufacturer & Factory',
      desc: 'ZERUI is an outdoor kitchen manufacturer and factory in China, offering stainless steel outdoor kitchens, modular systems and professional grills for custom OEM and ODM projects worldwide.'
    }
  };

  var WA_NUMBER = '8617853993611';

  var WA_TEXT = {
    general: {
      zh: '你好，我想了解一下泽锐的户外厨房产品',
      en: 'Hello, I would like to learn more about ZERUI outdoor kitchen products.'
    },
    quote: {
      zh: '你好，我想咨询泽锐户外厨房的报价，产品需求：',
      en: 'Hello, I would like a quote for a ZERUI outdoor kitchen. Product requirements:'
    }
  };

  var WA_LINKS = {
    'nav-contact': 'general',
    'cta-whatsapp': 'general',
    'cta-quote': 'quote',
    'cta-proposal': 'quote'
  };

  function applyWhatsAppLinks() {
    Object.keys(WA_LINKS).forEach(function (id) {
      var el = document.getElementById(id);
      if (!el) return;
      el.setAttribute(
        'href',
        'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(WA_TEXT[WA_LINKS[id]][lang])
      );
    });
  }

  var lang = 'zh';
  try {
    var saved = localStorage.getItem('zerui-lang');
    var wanted = new URLSearchParams(window.location.search).get('lang');
    if (wanted === 'en' || (!wanted && saved === 'en')) lang = 'en';
  } catch (err) {
    /* noop */
  }

  function applyLang(next) {
    lang = next;
    html.dataset.lang = lang;
    html.lang = lang === 'en' ? 'en' : 'zh-CN';

    document.querySelectorAll('[data-en]').forEach(function (el) {
      if (!el.dataset.zh) el.dataset.zh = el.textContent;
      el.textContent = lang === 'en' ? el.dataset.en : el.dataset.zh;
    });

    document.title = META[lang].title;
    var desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', META[lang].desc);

    if (toggle) {
      toggle.textContent = lang === 'en' ? '中文' : 'EN';
      toggle.setAttribute('aria-pressed', lang === 'en' ? 'true' : 'false');
    }

    try {
      localStorage.setItem('zerui-lang', lang);
    } catch (err) {
      /* noop */
    }

    applyWhatsAppLinks();
  }

  applyLang(lang);

  if (toggle) {
    toggle.addEventListener('click', function () {
      applyLang(lang === 'en' ? 'zh' : 'en');
    });
  }

  /* 移动端菜单（导航为占位项，仅做展示） */
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function () {
      var open = document.body.classList.toggle('nav-open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    document.addEventListener('keydown', function (event) {
      if (event.key !== 'Escape') return;
      document.body.classList.remove('nav-open');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  }
})();
