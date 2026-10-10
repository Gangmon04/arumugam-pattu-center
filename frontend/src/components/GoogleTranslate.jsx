import { useState, useEffect, useRef } from 'react';
import { Globe, ChevronDown, Check, Search, X } from 'lucide-react';

const PRIMARY_LANGUAGES = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'ta', label: 'தமிழ் (Tamil)', short: 'TA' },
];

const OTHER_LANGUAGES = [
  { code: 'hi', label: 'Hindi (हिंदी)', short: 'HI' },
  { code: 'te', label: 'Telugu (తెలుగు)', short: 'TE' },
  { code: 'kn', label: 'Kannada (ಕನ್ನಡ)', short: 'KN' },
  { code: 'ml', label: 'Malayalam (മലയാളം)', short: 'ML' },
  { code: 'mr', label: 'Marathi (मराठी)', short: 'MR' },
  { code: 'bn', label: 'Bengali (বাংলা)', short: 'BN' },
  { code: 'gu', label: 'Gujarati (ગુજરાતી)', short: 'GU' },
  { code: 'pa', label: 'Punjabi (ਪੰਜਾਬੀ)', short: 'PA' },
  { code: 'ur', label: 'Urdu (اردو)', short: 'UR' },
  { code: 'or', label: 'Odia (ଓଡ଼ିଆ)', short: 'OR' },
  { code: 'ar', label: 'Arabic (العربية)', short: 'AR' },
  { code: 'fr', label: 'French (Français)', short: 'FR' },
  { code: 'de', label: 'German (Deutsch)', short: 'DE' },
  { code: 'es', label: 'Spanish (Español)', short: 'ES' },
  { code: 'it', label: 'Italian (Italiano)', short: 'IT' },
  { code: 'pt', label: 'Portuguese (Português)', short: 'PT' },
  { code: 'ru', label: 'Russian (Русский)', short: 'RU' },
  { code: 'zh-CN', label: 'Chinese (Simplified)', short: 'ZH' },
  { code: 'ja', label: 'Japanese (日本語)', short: 'JA' },
  { code: 'ko', label: 'Korean (한국어)', short: 'KO' },
  { code: 'ms', label: 'Malay (Bahasa Melayu)', short: 'MS' },
  { code: 'id', label: 'Indonesian (Bahasa Indonesia)', short: 'ID' },
  { code: 'th', label: 'Thai (ไทย)', short: 'TH' },
  { code: 'vi', label: 'Vietnamese (Tiếng Việt)', short: 'VI' },
  { code: 'tr', label: 'Turkish (Türkçe)', short: 'TR' },
  { code: 'nl', label: 'Dutch (Nederlands)', short: 'NL' },
];

const ALL_LANGUAGES = [...PRIMARY_LANGUAGES, ...OTHER_LANGUAGES];

// Helper to reliably find language option even with partial or regional codes (e.g. 'zh-CN' vs 'zh')
const findLanguageOption = (code) => {
  if (!code) return PRIMARY_LANGUAGES[0];
  const c = code.toLowerCase().trim();
  // 1. Exact match
  const exact = ALL_LANGUAGES.find((l) => l.code.toLowerCase() === c);
  if (exact) return exact;
  // 2. Prefix / base language match (e.g. 'zh' matches 'zh-CN' or vice versa)
  const base = c.split('-')[0];
  const prefix = ALL_LANGUAGES.find(
    (l) => l.code.toLowerCase() === base || l.code.toLowerCase().startsWith(base) || base.startsWith(l.code.toLowerCase())
  );
  if (prefix) return prefix;
  return PRIMARY_LANGUAGES[0];
};

export default function GoogleTranslate() {
  const [currentLang, setCurrentLang] = useState('en');
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
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
      const match = document.cookie.match(/googtrans=\/en\/([a-zA-Z0-9_-]+)/i);
      if (match && match[1]) {
        setCurrentLang(match[1].toLowerCase());
      } else {
        const saved = localStorage.getItem('preferred_lang');
        setCurrentLang(saved ? saved.toLowerCase() : 'en');
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
    setCurrentLang(langCode.toLowerCase());
    setIsOpen(false);
    setSearchQuery('');
    localStorage.setItem('preferred_lang', langCode);

    if (langCode === 'en') {
      // Clear translation cookies to return cleanly to original English
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      const host = window.location.hostname;
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=.${host}; path=/;`;
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=${host}; path=/;`;
      document.cookie = `googtrans=/en/en; path=/;`;
      
      const select = document.querySelector('.goog-te-combo');
      if (select) {
        select.value = 'en';
        select.dispatchEvent(new Event('change'));
      }
      setTimeout(() => {
        window.location.reload();
      }, 150);
      return;
    }

    // Set cookie for Google Translate
    document.cookie = `googtrans=/en/${langCode}; path=/;`;
    const host = window.location.hostname;
    document.cookie = `googtrans=/en/${langCode}; domain=.${host}; path=/;`;
    document.cookie = `googtrans=/en/${langCode}; domain=${host}; path=/;`;

    // Trigger select change in Google Translate
    const select = document.querySelector('.goog-te-combo');
    if (select) {
      let targetVal = langCode;
      const hasExact = Array.from(select.options).some((o) => o.value.toLowerCase() === langCode.toLowerCase());
      if (!hasExact) {
        const partial = Array.from(select.options).find(
          (o) => o.value.toLowerCase().startsWith(langCode.toLowerCase().split('-')[0]) ||
                 langCode.toLowerCase().startsWith(o.value.toLowerCase().split('-')[0])
        );
        if (partial) {
          targetVal = partial.value;
        }
      }
      select.value = targetVal;
      select.dispatchEvent(new Event('change'));
    } else {
      window.location.reload();
    }
  };

  // Find active language display option
  const activeOption = findLanguageOption(currentLang);

  // Check if active language is one of the primary ones
  const isPrimary = PRIMARY_LANGUAGES.some(
    (l) => l.code.toLowerCase() === activeOption.code.toLowerCase()
  );
  const activeOtherLang = !isPrimary ? activeOption : null;

  // Filter other languages in search box
  const searchResults = searchQuery.trim()
    ? OTHER_LANGUAGES.filter((l) =>
        l.label.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
        l.code.toLowerCase().includes(searchQuery.trim().toLowerCase())
      )
    : [];

  return (
    <div 
      className="nav-lang-custom-picker notranslate skiptranslate" 
      ref={dropdownRef}
      translate="no"
    >
      {/* Trigger Button in Navbar (e.g. 🌐 ZH ⌵ or 🌐 TA ⌵ or 🌐 EN ⌵) */}
      <button 
        type="button"
        className={`btn-lang-trigger notranslate skiptranslate ${isOpen ? 'open' : ''}`}
        onClick={() => {
          setIsOpen(!isOpen);
          if (isOpen) setSearchQuery('');
        }}
        aria-expanded={isOpen}
        aria-label="Select language"
        translate="no"
      >
        <Globe size={16} className="lang-trigger-globe" />
        <span className="lang-trigger-code notranslate" translate="no">
          {activeOption.short || 'EN'}
        </span>
        <ChevronDown size={14} className={`lang-trigger-chevron ${isOpen ? 'rotated' : ''}`} />
      </button>

      {/* Floating Dropdown Card with Arrow Tip */}
      {isOpen && (
        <div className="lang-custom-dropdown-card notranslate skiptranslate" translate="no">
          <div className="lang-dropdown-arrow" />

          {/* Header */}
          <div className="lang-dropdown-header notranslate" translate="no">
            <Globe size={15} className="lang-header-icon" />
            <span className="lang-header-title notranslate" translate="no">Choose Language</span>
          </div>

          {/* Main List: ONLY Tamil & English (No flags) */}
          <div className="lang-primary-list notranslate" translate="no">
            {PRIMARY_LANGUAGES.map((lang) => {
              const isSelected = activeOption.code.toLowerCase() === lang.code.toLowerCase();
              return (
                <button
                  key={lang.code}
                  type="button"
                  className={`lang-clean-item notranslate ${isSelected ? 'active' : ''}`}
                  onClick={() => handleSelectLanguage(lang.code)}
                  translate="no"
                >
                  <span className="lang-clean-name notranslate" translate="no">{lang.label}</span>
                  {isSelected && <Check size={16} className="lang-check-icon" />}
                </button>
              );
            })}

            {/* If an 'other' language is currently selected, show it here as active */}
            {activeOtherLang && (
              <button
                type="button"
                className="lang-clean-item active notranslate"
                onClick={() => handleSelectLanguage(activeOtherLang.code)}
                translate="no"
              >
                <span className="lang-clean-name notranslate" translate="no">{activeOtherLang.label}</span>
                <Check size={16} className="lang-check-icon" />
              </button>
            )}
          </div>

          {/* Search Box for other languages */}
          <div className="lang-search-section notranslate" translate="no">
            <div className="lang-search-box notranslate" translate="no">
              <Search size={14} className="lang-search-icon" />
              <input 
                type="text" 
                placeholder="Search other languages..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="notranslate skiptranslate"
                translate="no"
                autoComplete="off"
                spellCheck="false"
              />
              {searchQuery && (
                <button 
                  type="button" 
                  className="btn-clear-search notranslate" 
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  translate="no"
                >
                  <X size={12} />
                </button>
              )}
            </div>

            {/* Dropdown search results when typing */}
            {searchQuery.trim().length > 0 && (
              <div className="lang-search-dropdown-results notranslate" translate="no">
                {searchResults.length > 0 ? (
                  searchResults.map((lang) => {
                    const isSelected = activeOption.code.toLowerCase() === lang.code.toLowerCase();
                    return (
                      <button
                        key={lang.code}
                        type="button"
                        className={`lang-clean-item notranslate ${isSelected ? 'active' : ''}`}
                        onClick={() => handleSelectLanguage(lang.code)}
                        translate="no"
                      >
                        <span className="lang-clean-name notranslate" translate="no">{lang.label}</span>
                        {isSelected && <Check size={15} className="lang-check-icon" />}
                      </button>
                    );
                  })
                ) : (
                  <div className="lang-no-search-results notranslate" translate="no">
                    No matching languages
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Hidden Google Translate host for underlying translation engine */}
      <div id="google_translate_hidden_element" className="google-translate-hidden notranslate skiptranslate" translate="no" />
    </div>
  );
}
