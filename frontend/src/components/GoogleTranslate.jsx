import { useEffect, useState } from 'react';
import { Globe, Check } from 'lucide-react';

export default function GoogleTranslate() {
  const [currentLang, setCurrentLang] = useState('en');

  useEffect(() => {
    // 1. Define global Google Translate initialization callback
    window.googleTranslateElementInit = () => {
      if (window.google?.translate?.TranslateElement) {
        const el = document.getElementById('google_translate_element');
        if (el && !el.hasChildNodes()) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: 'en',
              autoDisplay: false,
            },
            'google_translate_element'
          );
        }
      }
    };

    // 2. Load Google Translate script if not already present
    if (!document.getElementById('google-translate-script')) {
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.type = 'text/javascript';
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    } else if (window.google?.translate?.TranslateElement) {
      window.googleTranslateElementInit();
    }

    // 3. Monitor translation state & cookie
    const checkLang = () => {
      const match = document.cookie.match(/googtrans=\/en\/([a-z]{2})/i);
      if (match && match[1]) {
        setCurrentLang(match[1].toLowerCase());
      } else {
        setCurrentLang('en');
      }
    };

    // 4. Force removal of top banner frame & reset body/html offset to 0
    const removeGoogleBanner = () => {
      if (document.body.style.top && document.body.style.top !== '0px') {
        document.body.style.top = '0px';
      }
      if (document.documentElement.style.top && document.documentElement.style.top !== '0px') {
        document.documentElement.style.top = '0px';
      }
      const banners = document.querySelectorAll(
        '.goog-te-banner-frame, iframe.goog-te-banner-frame, .VIpgJd-ZVi9I-ORHb-OEVmcd, iframe[id^=":"]'
      );
      banners.forEach((b) => {
        b.style.setProperty('display', 'none', 'important');
        b.style.setProperty('visibility', 'hidden', 'important');
        b.style.setProperty('height', '0px', 'important');
      });
    };

    checkLang();
    removeGoogleBanner();

    // Observe changes to body and documentElement to catch Google Translate injections immediately
    const observer = new MutationObserver(removeGoogleBanner);
    observer.observe(document.body, { attributes: true, attributeFilter: ['style', 'class'] });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['style', 'class'] });

    const interval = setInterval(() => {
      checkLang();
      removeGoogleBanner();
    }, 600);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, []);

  // Quick 1-click switch helper (e.g. for English or Tamil)
  const triggerLanguage = (langCode) => {
    const select = document.querySelector('.goog-te-combo');
    if (select) {
      select.value = langCode;
      select.dispatchEvent(new Event('change'));
      setCurrentLang(langCode);
    } else {
      // Set cookie directly if widget is still initializing
      document.cookie = `googtrans=/en/${langCode}; path=/;`;
      window.location.reload();
    }
  };

  return (
    <div className="nav-translate-wrapper" title="Translate Website">
      <div className="nav-translate-inner">
        <Globe size={15} className="translate-globe-icon" />

        {/* Quick Language Toggle Pills */}
        <div className="quick-lang-pills">
          <button 
            type="button"
            className={`btn-lang-pill ${currentLang === 'en' ? 'active' : ''}`}
            onClick={() => triggerLanguage('en')}
            title="Translate to English"
          >
            EN
          </button>
          <button 
            type="button"
            className={`btn-lang-pill ${currentLang === 'ta' ? 'active' : ''}`}
            onClick={() => triggerLanguage('ta')}
            title="தமிழில் பார்க்கவும் (Translate to Tamil)"
          >
            தமிழ்
          </button>
        </div>

        {/* Google Translate Select Dropdown (supports all 100+ languages) */}
        <div id="google_translate_element" className="google-translate-host"></div>
      </div>
    </div>
  );
}
