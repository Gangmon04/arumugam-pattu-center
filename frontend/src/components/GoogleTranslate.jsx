import { useState, useEffect, useRef } from 'react';
import { Globe, ChevronDown, Check, Search, ArrowLeft, X } from 'lucide-react';

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

// Circular World/International Badge
const GlobeBadge = () => (
  <span className="flag-circle-globe" aria-hidden="true">
    <Globe size={13} />
  </span>
);

// Top featured languages
const TOP_LANGUAGES = [
  { code: 'en', label: 'English', short: 'EN', flag: UKFlag },
  { code: 'ta', label: 'தமிழ் (Tamil)', short: 'TA', flag: IndiaFlag },
  { code: 'hi', label: 'हिंदी (Hindi)', short: 'HI', flag: IndiaFlag },
  { code: 'te', label: 'తెలుగు (Telugu)', short: 'TE', flag: IndiaFlag },
];

// Full catalog of supported languages
const ALL_LANGUAGES = [
  // Primary Indian Regional Languages
  { code: 'en', label: 'English', native: 'English', short: 'EN', flag: UKFlag },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்', short: 'TA', flag: IndiaFlag },
  { code: 'hi', label: 'Hindi', native: 'हिंदी', short: 'HI', flag: IndiaFlag },
  { code: 'te', label: 'Telugu', native: 'తెలుగు', short: 'TE', flag: IndiaFlag },
  { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ', short: 'KN', flag: IndiaFlag },
  { code: 'ml', label: 'Malayalam', native: 'മലയാളം', short: 'ML', flag: IndiaFlag },
  { code: 'mr', label: 'Marathi', native: 'मराठी', short: 'MR', flag: IndiaFlag },
  { code: 'bn', label: 'Bengali', native: 'বাংলা', short: 'BN', flag: IndiaFlag },
  { code: 'gu', label: 'Gujarati', native: 'ગુજરાતી', short: 'GU', flag: IndiaFlag },
  { code: 'pa', label: 'Punjabi', native: 'ਪੰਜਾਬੀ', short: 'PA', flag: IndiaFlag },
  { code: 'ur', label: 'Urdu', native: 'اردو', short: 'UR', flag: IndiaFlag },
  { code: 'or', label: 'Odia', native: 'ଓଡ଼ିଆ', short: 'OR', flag: IndiaFlag },

  // International Languages
  { code: 'ar', label: 'Arabic', native: 'العربية', short: 'AR', flag: GlobeBadge },
  { code: 'fr', label: 'French', native: 'Français', short: 'FR', flag: GlobeBadge },
  { code: 'de', label: 'German', native: 'Deutsch', short: 'DE', flag: GlobeBadge },
  { code: 'es', label: 'Spanish', native: 'Español', short: 'ES', flag: GlobeBadge },
  { code: 'it', label: 'Italian', native: 'Italiano', short: 'IT', flag: GlobeBadge },
  { code: 'pt', label: 'Portuguese', native: 'Português', short: 'PT', flag: GlobeBadge },
  { code: 'ru', label: 'Russian', native: 'Русский', short: 'RU', flag: GlobeBadge },
  { code: 'zh-CN', label: 'Chinese (Simplified)', native: '简体中文', short: 'ZH', flag: GlobeBadge },
  { code: 'ja', label: 'Japanese', native: '日本語', short: 'JA', flag: GlobeBadge },
  { code: 'ko', label: 'Korean', native: '한국어', short: 'KO', flag: GlobeBadge },
  { code: 'ms', label: 'Malay', native: 'Bahasa Melayu', short: 'MS', flag: GlobeBadge },
  { code: 'id', label: 'Indonesian', native: 'Bahasa Indonesia', short: 'ID', flag: GlobeBadge },
  { code: 'th', label: 'Thai', native: 'ไทย', short: 'TH', flag: GlobeBadge },
  { code: 'vi', label: 'Vietnamese', native: 'Tiếng Việt', short: 'VI', flag: GlobeBadge },
  { code: 'tr', label: 'Turkish', native: 'Türkçe', short: 'TR', flag: GlobeBadge },
  { code: 'nl', label: 'Dutch', native: 'Nederlands', short: 'NL', flag: GlobeBadge },
];

export default function GoogleTranslate() {
  const [currentLang, setCurrentLang] = useState('en');
  const [isOpen, setIsOpen] = useState(false);
  const [showAllLanguages, setShowAllLanguages] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setShowAllLanguages(false);
        setSearchQuery('');
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
    setShowAllLanguages(false);
    setSearchQuery('');
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

  const activeOption = ALL_LANGUAGES.find((l) => l.code === currentLang) || 
                       TOP_LANGUAGES.find((l) => l.code === currentLang) || 
                       TOP_LANGUAGES[0];

  // Filter languages in full search view
  const filteredLanguages = ALL_LANGUAGES.filter((l) => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    return (
      l.label.toLowerCase().includes(q) ||
      (l.native && l.native.toLowerCase().includes(q)) ||
      l.code.toLowerCase().includes(q)
    );
  });

  return (
    <div className="nav-lang-custom-picker" ref={dropdownRef}>
      {/* Trigger Button in Navbar (e.g. 🌐 EN ⌵) */}
      <button 
        type="button"
        className={`btn-lang-trigger ${isOpen ? 'open' : ''}`}
        onClick={() => {
          setIsOpen(!isOpen);
          if (isOpen) {
            setShowAllLanguages(false);
            setSearchQuery('');
          }
        }}
        aria-expanded={isOpen}
        aria-label="Select language"
      >
        <Globe size={16} className="lang-trigger-globe" />
        <span className="lang-trigger-code">{activeOption.short || 'EN'}</span>
        <ChevronDown size={14} className={`lang-trigger-chevron ${isOpen ? 'rotated' : ''}`} />
      </button>

      {/* Floating Dropdown Card with Arrow Tip */}
      {isOpen && (
        <div className={`lang-custom-dropdown-card ${showAllLanguages ? 'expanded-mode' : ''}`}>
          <div className="lang-dropdown-arrow" />
          
          {!showAllLanguages ? (
            /* ── Default View: Featured Languages + Clickable "Choose Language" ── */
            <>
              {/* Clicking "Choose Language" reveals all languages */}
              <button 
                type="button" 
                className="lang-dropdown-header-clickable"
                onClick={() => setShowAllLanguages(true)}
                title="Click to view all languages"
              >
                <div className="header-left">
                  <Globe size={16} className="lang-header-icon" />
                  <span className="lang-header-title">Choose Language</span>
                </div>
                <span className="lang-header-all-btn">
                  All ({ALL_LANGUAGES.length}) ›
                </span>
              </button>

              <div className="lang-dropdown-list">
                {TOP_LANGUAGES.map((lang) => {
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

              {/* Bottom Browse Button for extra clarity */}
              <button 
                type="button"
                className="btn-browse-more-languages"
                onClick={() => setShowAllLanguages(true)}
              >
                <Globe size={14} /> More Languages ({ALL_LANGUAGES.length})...
              </button>
            </>
          ) : (
            /* ── Expanded View: Search + Full Language List ── */
            <div className="lang-expanded-container">
              <div className="lang-expanded-top-bar">
                <button 
                  type="button" 
                  className="btn-lang-back"
                  onClick={() => {
                    setShowAllLanguages(false);
                    setSearchQuery('');
                  }}
                  title="Back to quick list"
                >
                  <ArrowLeft size={14} /> Back
                </button>
                <span className="expanded-heading">All Languages</span>
              </div>

              {/* Search input */}
              <div className="lang-search-box">
                <Search size={14} className="lang-search-icon" />
                <input 
                  type="text" 
                  placeholder="Search language..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                {searchQuery && (
                  <button 
                    type="button" 
                    className="btn-clear-search" 
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                  >
                    <X size={12} />
                  </button>
                )}
              </div>

              {/* Scrollable list of all languages */}
              <div className="lang-scroll-list">
                {filteredLanguages.length > 0 ? (
                  filteredLanguages.map((lang) => {
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
                          <div className="lang-names-stack">
                            <span className="lang-native-name">{lang.native || lang.label}</span>
                            {lang.native && lang.native !== lang.label && (
                              <span className="lang-english-sub">({lang.label})</span>
                            )}
                          </div>
                        </div>
                        {isSelected && <Check size={16} className="lang-check-icon" />}
                      </button>
                    );
                  })
                ) : (
                  <div className="lang-no-results">
                    No languages found matching "{searchQuery}"
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Hidden Google Translate host for underlying translation engine */}
      <div id="google_translate_hidden_element" className="google-translate-hidden" />
    </div>
  );
}
