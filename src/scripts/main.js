/* ============================================================
   泽锐 zerui — WhatsApp 链接与移动端菜单
   语言由页面 URL 决定（/ 中文，/en/ 英文），不再用 JS 切换正文。
   ============================================================ */
(function () {
  'use strict';

  var html = document.documentElement;
  var body = document.body;
  var menuBtn = document.getElementById('menu-btn');
  var nav = document.getElementById('primary-nav');

  var WA_NUMBER = '8617853993611';

  var WA_TEXT = {
    general: {
      zh: '你好，我想了解一下泽锐的户外厨房产品',
      en: 'Hello, I would like to learn more about ZERUI outdoor kitchen products.',
    },
    quote: {
      zh: '你好，我想咨询泽锐户外厨房的报价。产品形式 / 尺寸 / 数量 / 目标市场：',
      en: 'Hello, I would like a quote for a ZERUI outdoor kitchen. Product type / size / quantity / target market:',
    },
    custom: {
      zh: '你好，我们有一个定制 / OEM 项目想咨询。市场 / 产品形式 / 尺寸 / 数量：',
      en: 'Hello, we have a custom / OEM project to discuss. Market / product type / size / quantity:',
    },
    product: {
      zh: '你好，我想了解这类产品的配置与可定制范围：',
      en: 'Hello, I would like to know more about the configuration and customization options for this type of product:',
    },
    factory: {
      zh: '你好，我想预约一次工厂视频看厂，方便的时间是：',
      en: 'Hello, I would like to arrange a factory video tour. A time that suits us:',
    },
    project: {
      zh: '你好，我看到一个类似的户外厨房方案，想咨询同类配置：',
      en: 'Hello, I saw a similar project case and would like to ask about a comparable solution:',
    },
    guide: {
      zh: '你好，我读了一篇指南，想就我们的场地咨询建议：',
      en: 'Hello, I read one of your guides and would like advice for our site:',
    },
    faq: {
      zh: '你好，我有一个问题：',
      en: 'Hello, I have a question:',
    },
    contact: {
      zh: '你好，我想和泽锐聊聊户外厨房项目',
      en: 'Hello, I would like to talk to ZERUI about an outdoor kitchen project.',
    },
  };

  function waHref(key) {
    var entry = WA_TEXT[key] || WA_TEXT.general;
    return 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(entry[lang]);
  }

  function applyWhatsAppLinks() {
    document.querySelectorAll('[data-wa]').forEach(function (el) {
      el.setAttribute('href', waHref(el.getAttribute('data-wa')));
    });
  }

  var lang = html.dataset.lang === 'en' ? 'en' : 'zh';

  applyWhatsAppLinks();

  /* 移动端菜单 */
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function () {
      var open = body.classList.toggle('nav-open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        body.classList.remove('nav-open');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('keydown', function (event) {
      if (event.key !== 'Escape') return;
      body.classList.remove('nav-open');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  }

  /* 首页悬浮导航：离开 Hero 后变实底 */
  var overlayHeader = document.getElementById('site-header');
  if (overlayHeader && overlayHeader.classList.contains('site-header--overlay')) {
    var hero = document.querySelector('.hero-photo');
    var ticking = false;

    var updateHeader = function () {
      ticking = false;
      var threshold = hero
        ? Math.max(hero.offsetHeight - overlayHeader.offsetHeight - 12, 80)
        : 90;
      overlayHeader.classList.toggle('is-scrolled', window.scrollY > threshold);
    };

    window.addEventListener(
      'scroll',
      function () {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(updateHeader);
      },
      { passive: true }
    );
    window.addEventListener('resize', updateHeader);
    updateHeader();
  }
  /* 悬浮 WhatsApp：进入咨询卡或页脚时让位，避免遮挡 */
  var waFloat = document.querySelector('.wa-float');
  if (waFloat && 'IntersectionObserver' in window) {
    var blocked = { inq: false, footer: false };
    var syncFloat = function () {
      waFloat.classList.toggle('is-hidden', blocked.inq || blocked.footer);
    };
    [
      ['inq', '.inq'],
      ['footer', 'footer'],
    ].forEach(function (pair) {
      var el = document.querySelector(pair[1]);
      if (!el) return;
      new IntersectionObserver(function (entries) {
        blocked[pair[0]] = entries[0].isIntersecting;
        syncFloat();
      }).observe(el);
    });
  }
})();
