'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Globe2, X } from 'lucide-react';

const STORAGE_KEY = 'shambhavaa-language';
const GOOGLE_TRANSLATE_SCRIPT_ID = 'google-translate-script';

const languages = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'ar', label: 'Arabic', native: 'العربية' },
  { code: 'zh-CN', label: 'Chinese (Simplified)', native: '中文简体' },
  { code: 'zh-TW', label: 'Chinese (Traditional)', native: '中文繁體' },
  { code: 'fr', label: 'French', native: 'Français' },
  { code: 'de', label: 'German', native: 'Deutsch' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
  { code: 'it', label: 'Italian', native: 'Italiano' },
  { code: 'ja', label: 'Japanese', native: '日本語' },
  { code: 'ko', label: 'Korean', native: '한국어' },
  { code: 'pt', label: 'Portuguese', native: 'Português' },
  { code: 'ru', label: 'Russian', native: 'Русский' },
  { code: 'es', label: 'Spanish', native: 'Español' },
  { code: 'af', label: 'Afrikaans', native: 'Afrikaans' },
  { code: 'sq', label: 'Albanian', native: 'Shqip' },
  { code: 'am', label: 'Amharic', native: 'አማርኛ' },
  { code: 'hy', label: 'Armenian', native: 'Հայերեն' },
  { code: 'az', label: 'Azerbaijani', native: 'Azərbaycanca' },
  { code: 'eu', label: 'Basque', native: 'Euskara' },
  { code: 'be', label: 'Belarusian', native: 'Беларуская' },
  { code: 'bn', label: 'Bengali', native: 'বাংলা' },
  { code: 'bs', label: 'Bosnian', native: 'Bosanski' },
  { code: 'bg', label: 'Bulgarian', native: 'Български' },
  { code: 'ca', label: 'Catalan', native: 'Català' },
  { code: 'ceb', label: 'Cebuano', native: 'Cebuano' },
  { code: 'co', label: 'Corsican', native: 'Corsu' },
  { code: 'hr', label: 'Croatian', native: 'Hrvatski' },
  { code: 'cs', label: 'Czech', native: 'Čeština' },
  { code: 'da', label: 'Danish', native: 'Dansk' },
  { code: 'nl', label: 'Dutch', native: 'Nederlands' },
  { code: 'eo', label: 'Esperanto', native: 'Esperanto' },
  { code: 'et', label: 'Estonian', native: 'Eesti' },
  { code: 'fi', label: 'Finnish', native: 'Suomi' },
  { code: 'fy', label: 'Frisian', native: 'Frysk' },
  { code: 'gl', label: 'Galician', native: 'Galego' },
  { code: 'ka', label: 'Georgian', native: 'ქართული' },
  { code: 'el', label: 'Greek', native: 'Ελληνικά' },
  { code: 'gu', label: 'Gujarati', native: 'ગુજરાતી' },
  { code: 'ht', label: 'Haitian Creole', native: 'Kreyòl Ayisyen' },
  { code: 'ha', label: 'Hausa', native: 'Hausa' },
  { code: 'haw', label: 'Hawaiian', native: 'ʻŌlelo Hawaiʻi' },
  { code: 'he', label: 'Hebrew', native: 'עברית' },
  { code: 'hmn', label: 'Hmong', native: 'Hmong' },
  { code: 'hu', label: 'Hungarian', native: 'Magyar' },
  { code: 'is', label: 'Icelandic', native: 'Íslenska' },
  { code: 'ig', label: 'Igbo', native: 'Igbo' },
  { code: 'id', label: 'Indonesian', native: 'Bahasa Indonesia' },
  { code: 'ga', label: 'Irish', native: 'Gaeilge' },
  { code: 'jw', label: 'Javanese', native: 'Basa Jawa' },
  { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'kk', label: 'Kazakh', native: 'Қазақша' },
  { code: 'km', label: 'Khmer', native: 'ខ្មែរ' },
  { code: 'ku', label: 'Kurdish', native: 'Kurdî' },
  { code: 'ky', label: 'Kyrgyz', native: 'Кыргызча' },
  { code: 'lo', label: 'Lao', native: 'ລາວ' },
  { code: 'la', label: 'Latin', native: 'Latina' },
  { code: 'lv', label: 'Latvian', native: 'Latviešu' },
  { code: 'lt', label: 'Lithuanian', native: 'Lietuvių' },
  { code: 'lb', label: 'Luxembourgish', native: 'Lëtzebuergesch' },
  { code: 'mk', label: 'Macedonian', native: 'Македонски' },
  { code: 'mg', label: 'Malagasy', native: 'Malagasy' },
  { code: 'ms', label: 'Malay', native: 'Bahasa Melayu' },
  { code: 'ml', label: 'Malayalam', native: 'മലയാളം' },
  { code: 'mt', label: 'Maltese', native: 'Malti' },
  { code: 'mi', label: 'Maori', native: 'Māori' },
  { code: 'mr', label: 'Marathi', native: 'मराठी' },
  { code: 'mn', label: 'Mongolian', native: 'Монгол' },
  { code: 'my', label: 'Myanmar', native: 'မြန်မာ' },
  { code: 'ne', label: 'Nepali', native: 'नेपाली' },
  { code: 'no', label: 'Norwegian', native: 'Norsk' },
  { code: 'ny', label: 'Nyanja', native: 'Chichewa' },
  { code: 'ps', label: 'Pashto', native: 'پښتو' },
  { code: 'fa', label: 'Persian', native: 'فارسی' },
  { code: 'pl', label: 'Polish', native: 'Polski' },
  { code: 'pa', label: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
  { code: 'ro', label: 'Romanian', native: 'Română' },
  { code: 'sm', label: 'Samoan', native: 'Gagana Samoa' },
  { code: 'gd', label: 'Scots Gaelic', native: 'Gàidhlig' },
  { code: 'sr', label: 'Serbian', native: 'Српски' },
  { code: 'st', label: 'Sesotho', native: 'Sesotho' },
  { code: 'sn', label: 'Shona', native: 'Shona' },
  { code: 'sd', label: 'Sindhi', native: 'سنڌي' },
  { code: 'si', label: 'Sinhala', native: 'සිංහල' },
  { code: 'sk', label: 'Slovak', native: 'Slovenčina' },
  { code: 'sl', label: 'Slovenian', native: 'Slovenščina' },
  { code: 'so', label: 'Somali', native: 'Soomaali' },
  { code: 'su', label: 'Sundanese', native: 'Basa Sunda' },
  { code: 'sw', label: 'Swahili', native: 'Kiswahili' },
  { code: 'sv', label: 'Swedish', native: 'Svenska' },
  { code: 'tl', label: 'Tagalog', native: 'Tagalog' },
  { code: 'tg', label: 'Tajik', native: 'Тоҷикӣ' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
  { code: 'te', label: 'Telugu', native: 'తెలుగు' },
  { code: 'th', label: 'Thai', native: 'ไทย' },
  { code: 'tr', label: 'Turkish', native: 'Türkçe' },
  { code: 'uk', label: 'Ukrainian', native: 'Українська' },
  { code: 'ur', label: 'Urdu', native: 'اردو' },
  { code: 'uz', label: 'Uzbek', native: 'Oʻzbekcha' },
  { code: 'vi', label: 'Vietnamese', native: 'Tiếng Việt' },
  { code: 'cy', label: 'Welsh', native: 'Cymraeg' },
  { code: 'xh', label: 'Xhosa', native: 'IsiXhosa' },
  { code: 'yi', label: 'Yiddish', native: 'יידיש' },
  { code: 'yo', label: 'Yoruba', native: 'Yorùbá' },
  { code: 'zu', label: 'Zulu', native: 'IsiZulu' },
];

function setTranslateCookie(languageCode) {
  const value = languageCode === 'en' ? '' : `/en/${languageCode}`;
  const expiry = languageCode === 'en'
    ? 'Thu, 01 Jan 1970 00:00:00 GMT'
    : 'Fri, 31 Dec 9999 23:59:59 GMT';

  document.cookie = `googtrans=${value}; expires=${expiry}; path=/`;

  if (window.location.hostname.includes('.')) {
    document.cookie = `googtrans=${value}; expires=${expiry}; path=/; domain=.${window.location.hostname}`;
  }
}

function initializeGoogleTranslate() {
  if (!window.google?.translate?.TranslateElement) {
    return;
  }

  if (!document.getElementById('google_translate_element')?.hasChildNodes()) {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: 'en',
        autoDisplay: false,
      },
      'google_translate_element'
    );
  }
}

function loadGoogleTranslateScript() {
  window.googleTranslateElementInit = initializeGoogleTranslate;

  if (document.getElementById(GOOGLE_TRANSLATE_SCRIPT_ID)) {
    initializeGoogleTranslate();
    return;
  }

  const script = document.createElement('script');
  script.id = GOOGLE_TRANSLATE_SCRIPT_ID;
  script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  script.async = true;
  document.body.appendChild(script);
}

function applyTranslation(languageCode) {
  setTranslateCookie(languageCode);

  if (languageCode === 'en') {
    return;
  }

  loadGoogleTranslateScript();

  let attempts = 0;
  const interval = window.setInterval(() => {
    const combo = document.querySelector('.goog-te-combo');
    attempts += 1;

    if (combo) {
      combo.value = '';
      combo.dispatchEvent(new Event('change', { bubbles: true }));

      window.setTimeout(() => {
        combo.value = languageCode;
        combo.dispatchEvent(new Event('change', { bubbles: true }));
      }, 100);
      window.clearInterval(interval);
    }

    if (attempts > 40) {
      window.clearInterval(interval);
      if (!window.location.search.includes('translated=1')) {
        const separator = window.location.search ? '&' : '?';
        window.location.replace(`${window.location.pathname}${window.location.search}${separator}translated=1${window.location.hash}`);
      }
    }
  }, 250);
}

export default function LanguageGate() {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [showGate, setShowGate] = useState(false);
  const [languageQuery, setLanguageQuery] = useState('');
  const initialized = useRef(false);

  const selectedLabel = useMemo(() => {
    return languages.find((language) => language.code === selectedLanguage)?.native || 'English';
  }, [selectedLanguage]);

  const filteredLanguages = useMemo(() => {
    const normalizedQuery = languageQuery.trim().toLowerCase();

    if (!normalizedQuery) {
      return languages;
    }

    return languages.filter((language) => {
      return language.label.toLowerCase().includes(normalizedQuery)
        || language.native.toLowerCase().includes(normalizedQuery);
    });
  }, [languageQuery]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);

    if (searchParams.get('choose-language') === '1') {
      window.sessionStorage.removeItem(STORAGE_KEY);
      window.localStorage.removeItem(STORAGE_KEY);
      setTranslateCookie('en');
      setSelectedLanguage('en');
      setShowGate(true);
      searchParams.delete('choose-language');
      const queryString = searchParams.toString();
      const cleanUrl = `${window.location.pathname}${queryString ? `?${queryString}` : ''}${window.location.hash}`;
      window.history.replaceState({}, '', cleanUrl);
      return;
    }

    const savedLanguage = window.localStorage.getItem(STORAGE_KEY);

    if (!savedLanguage) {
      window.localStorage.setItem(STORAGE_KEY, 'en');
      setSelectedLanguage('en');
      setShowGate(false);
      return;
    }

    if (searchParams.get('translated') === '1') {
      searchParams.delete('translated');
      const queryString = searchParams.toString();
      const cleanUrl = `${window.location.pathname}${queryString ? `?${queryString}` : ''}${window.location.hash}`;
      window.history.replaceState({}, '', cleanUrl);
    }

    setSelectedLanguage(savedLanguage);
    setShowGate(false);
    if (!initialized.current) {
      initialized.current = true;
      applyTranslation(savedLanguage);
    }
  }, []);

  const chooseLanguage = useCallback((languageCode) => {
    const previousLanguage = window.localStorage.getItem(STORAGE_KEY);
    window.localStorage.setItem(STORAGE_KEY, languageCode);
    setSelectedLanguage(languageCode);
    setShowGate(false);
    applyTranslation(languageCode);

    if (languageCode === 'en' && previousLanguage && previousLanguage !== 'en') {
      window.location.reload();
    }
  }, []);

  return (
    <>
      <div id="google_translate_element" aria-hidden="true" />

      {showGate && (
        <div className="language-gate notranslate" role="dialog" aria-modal="true" aria-labelledby="language-gate-title">
          <div className="language-gate-panel">
            <div className="language-gate-icon" aria-hidden="true">
              <Globe2 size={28} />
            </div>
            <h2 id="language-gate-title">Choose your reading language</h2>
            <p>
              Select the language you want to read Shambhavaa in. You can change it anytime.
            </p>
            <input
              type="search"
              className="language-search"
              placeholder="Search languages..."
              value={languageQuery}
              onChange={(event) => setLanguageQuery(event.target.value)}
            />
            <div className="language-grid">
              {filteredLanguages.map((language) => (
                <button
                  key={language.code}
                  type="button"
                  className="language-option"
                  data-language-code={language.code}
                  onClick={() => chooseLanguage(language.code)}
                >
                  <span>{language.native}</span>
                  <small>{language.label}</small>
                </button>
              ))}
            </div>
            {filteredLanguages.length === 0 && (
              <p className="language-empty">No matching language found.</p>
            )}
          </div>
        </div>
      )}

      {!showGate && (
        <a
          href="?choose-language=1"
          className="language-switcher notranslate"
          aria-label="Change language"
        >
          <Globe2 size={16} />
          <span>{selectedLabel}</span>
          <X size={14} aria-hidden="true" />
        </a>
      )}
    </>
  );
}
