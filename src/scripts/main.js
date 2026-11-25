/* ============================================================
   泽锐 zerui — 语言切换（中 / EN）与移动端菜单
   文案通过 data-en 属性切换；WhatsApp 链接按语言更新
   ============================================================ */
(function () {
  'use strict';

  var html = document.documentElement;
  var body = document.body;
  var toggle = document.getElementById('lang-toggle');
  var menuBtn = document.getElementById('menu-btn');
  var nav = document.getElementById('primary-nav');

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
    'cta-quote': 'quote',
    'cta-proposal': 'quote',
    'cta-whatsapp': 'general',
    'cta-contact': 'general'
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

  // 每页的标题 / 描述由 Layout 写在 body 的 data 属性上
  var META = {
    zh: {
      title: body.dataset.titleZh || document.title,
      desc: body.dataset.descZh || ''
    },
    en: {
      title: body.dataset.titleEn || document.title,
      desc: body.dataset.descEn || ''
    }
  };

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
    if (desc && META[lang].desc) desc.setAttribute('content', META[lang].desc);

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

  /* 移动端菜单 */
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function () {
      var open = body.classList.toggle('nav-open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    document.addEventListener('keydown', function (event) {
      if (event.key !== 'Escape') return;
      body.classList.remove('nav-open');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  }
})();
