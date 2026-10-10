import { useEffect } from 'react';
import { Globe } from 'lucide-react';

export default function GoogleTranslate() {
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

    // 3. Force removal of top banner frame & reset body/html offset to 0
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

    removeGoogleBanner();

    // Observe changes to body and documentElement to catch Google Translate injections immediately
    const observer = new MutationObserver(removeGoogleBanner);
    observer.observe(document.body, { attributes: true, attributeFilter: ['style', 'class'] });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['style', 'class'] });

    const interval = setInterval(removeGoogleBanner, 600);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="nav-translate-wrapper" title="Change Language">
      <div className="nav-translate-inner">
        <Globe size={16} className="translate-globe-icon" />
        <div id="google_translate_element" className="google-translate-host"></div>
      </div>
    </div>
  );
}
