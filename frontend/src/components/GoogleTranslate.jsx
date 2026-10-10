import { useState, useEffect, useRef } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';

// Crisp circular UK Flag
const UKFlag = () => (
  <svg width="22" height="22" viewBox="0 0 32 32" className="flag-svg" aria-hidden="true">
    <clipPath id="circle-clip-uk">
      <circle cx="16" cy="16" r="16" />
    </clipPath>
    <g clipPath="url(#circle-clip-uk)">
      <rect width="32" height="32" fill="#012169" />
      <path d="M0,0 L32,32 M32,0 L0,32" stroke="#FFFFFF" strokeWidth="5.5" />
      <path d="M0,0 L32,32 M32,0 L0,32" stroke="#C8102E" strokeWidth="3" />
      <path d="M16,0 V32 M0,16 H32" stroke="#FFFFFF" strokeWidth="8" />
      <path d="M16,0 V32 M0,16 H32" stroke="#C8102E" strokeWidth="4.8" />
    </g>
  </svg>
);

// Crisp circular India Flag
const IndiaFlag = () => (
  <svg width="22" height="22" viewBox="0 0 32 32" className="flag-svg" aria-hidden="true">
    <clipPath id="circle-clip-in">
      <circle cx="16" cy="16" r="16" />
    </clipPath>
    <g clipPath="url(#circle-clip-in)">
      <rect width="32" height="10.66" y="0" fill="#FF9933" />
      <rect width="32" height="10.66" y="10.66" fill="#FFFFFF" />
      <rect width="32" height="10.66" y="21.33" fill="#138808" />
      <circle cx="16" cy="16" r="3.2" fill="none" stroke="#000080" strokeWidth="0.8" />
      <circle cx="16" cy="16" r="0.8" fill="#000080" />
    </g>
  </svg>
);

const LANGUAGES = [
  { code: 'en', label: 'English', short: 'EN', flag: UKFlag },
  { code: 'ta', label: 'தமிழ் (Tamil)', short: 'TA', flag: IndiaFlag },
  { code: 'hi', label: 'हिंदी (Hindi)', short: 'HI', flag: IndiaFlag },
];

export default function GoogleTranslate() {
  const [currentLang, setCurrentLang] = useState('en');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Initialize Google Translate background engine
  useEffect(() => {
    window.googleTranslateElementInit = () => {
      if (window.google?.translate?.TranslateElement) {
        const el = document.getElementById('google_translate_hidden_element');
        if (el && !el.hasChildNodes()) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: 'en',
              autoDisplay: false,
            },
            'google_translate_hidden_element'
          );
        }
      }
    };

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

    // Actively remove Google Translate top banner frame & offset
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

    // Detect active language from cookie or stored preference
    const checkLang = () => {
      const match = document.cookie.match(/googtrans=\/en\/([a-z]{2})/i);
      if (match && match[1]) {
        setCurrentLang(match[1].toLowerCase());
      } else {
        const saved = localStorage.getItem('preferred_lang');
        setCurrentLang(saved || 'en');
      }
    };

    checkLang();
    removeGoogleBanner();

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

  const handleSelectLanguage = (langCode) => {
    setCurrentLang(langCode);
    setIsOpen(false);
    localStorage.setItem('preferred_lang', langCode);

    // Set cookie for Google Translate
    document.cookie = `googtrans=/en/${langCode}; path=/;`;
    const host = window.location.hostname;
    document.cookie = `googtrans=/en/${langCode}; domain=.${host}; path=/;`;

    // Trigger select change in Google Translate
    const select = document.querySelector('.goog-te-combo');
    if (select) {
      select.value = langCode;
      select.dispatchEvent(new Event('change'));
    } else {
      window.location.reload();
    }
  };

  const activeOption = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

  return (
    <div className="nav-lang-custom-picker" ref={dropdownRef}>
      {/* Trigger Button in Navbar (e.g. 🌐 EN ⌵) */}
      <button 
        type="button"
        className={`btn-lang-trigger ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Select language"
      >
        <Globe size={16} className="lang-trigger-globe" />
        <span className="lang-trigger-code">{activeOption.short}</span>
        <ChevronDown size={14} className={`lang-trigger-chevron ${isOpen ? 'rotated' : ''}`} />
      </button>

      {/* Floating Dropdown Card with Arrow Tip */}
      {isOpen && (
        <div className="lang-custom-dropdown-card">
          <div className="lang-dropdown-arrow" />
          
          <div className="lang-dropdown-header">
            <Globe size={16} className="lang-header-icon" />
            <span className="lang-header-title">Choose Language</span>
          </div>

          <div className="lang-dropdown-list">
            {LANGUAGES.map((lang) => {
              const isSelected = currentLang === lang.code;
              const FlagComponent = lang.flag;
              return (
                <button
                  key={lang.code}
                  type="button"
                  className={`lang-dropdown-item ${isSelected ? 'active' : ''}`}
                  onClick={() => handleSelectLanguage(lang.code)}
                >
                  <div className="lang-item-left">
                    <FlagComponent />
                    <span className="lang-item-name">{lang.label}</span>
                  </div>
                  {isSelected && <Check size={17} className="lang-check-icon" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Hidden Google Translate host for underlying translation engine */}
      <div id="google_translate_hidden_element" className="google-translate-hidden" />
    </div>
  );
}
