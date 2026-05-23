// Scroll reveal
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  
    // ====== LANGUAGE SWITCHER ======
    let currentLang = 'en';

    function setLang(lang) {
      currentLang = lang;
      document.getElementById('btn-en').classList.toggle('active', lang === 'en');
      document.getElementById('btn-ta').classList.toggle('active', lang === 'ta');
      document.body.classList.toggle('tamil-font', lang === 'ta');
      document.querySelectorAll('[data-en]').forEach(function(el) {
        if (el.classList.contains('top-bar')) return;
        var text = el.getAttribute('data-' + lang);
        if (text !== null) el.innerHTML = text;
      });
      var topBar = document.querySelector('.top-bar');
      if (topBar) {
        var val = topBar.getAttribute('data-' + lang);
        if (val) topBar.innerHTML = val;
      }
      localStorage.setItem('pattusaree_lang', lang);
    }

    var savedLang = localStorage.getItem('pattusaree_lang');
    if (savedLang && savedLang !== 'en') setLang(savedLang);