import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Locale = 'de' | 'en';

/**
 * Site configuration — the only thing that differs between AMA and GIW.
 *
 *   AMA  (abenteuermietenamerika.de) → bilingual DE/EN, default DE
 *   GIW  (goiconicway.com)           → English-only, locked to EN
 */
type SiteId = 'ama' | 'giw';

interface SiteConfig {
  siteId: SiteId;
  defaultLang: Locale;
  supportedLangs: Locale[];
  storagePrefix: string;
  // API endpoints
  conciergeApiUrl: string;
  checkoutApiUrl: string;
  bookingSource: string;
  googleSheetsUrl: string;
  whatsappUrl: string;
  // Branding — site-specific for SEO, footer, meta tags
  siteUrl: string;
  partnerSiteUrl: string;
  siteName: string;
  companyDba: string;
  contactEmail: string;
  ogImage: string;
  // Analytics
  ga4MeasurementId: string;
  googleAdsId: string;
  metaPixelId: string;
  clarityId: string;
}

interface LanguageContextValue {
  locale: Locale;
  setLocale: (lang: Locale) => void;
  t: (de: string, en: string) => string;
  isBilingual: boolean;
  config: SiteConfig;
}

// ---------------------------------------------------------------------------
// Site configurations
// ---------------------------------------------------------------------------

const SITE_CONFIGS: Record<SiteId, SiteConfig> = {
  ama: {
    siteId: 'ama',
    defaultLang: 'de',
    supportedLangs: ['de', 'en'],
    storagePrefix: 'ama',
    conciergeApiUrl:
      'https://ama-api.anja687gutierrez.workers.dev/api/concierge',
    checkoutApiUrl:
      'https://abenteuer-mieten-platform.vercel.app/api/public/checkout',
    bookingSource: 'abenteuer',
    googleSheetsUrl:
      'https://script.google.com/macros/s/AKfycbzF4t-juXYphl5JjFjzurt9ARcaYnyOHYo4vCVUgmb99l96p-seSdcQJTZKaP5d92icyg/exec',
    whatsappUrl: 'https://wa.me/13106006624',
    siteUrl: 'https://www.abenteuermietenamerika.de',
    partnerSiteUrl: 'https://www.goiconicway.com',
    siteName: 'Abenteuer Mieten Amerika',
    companyDba: 'Gutierrez Ventures LLC DBA Abenteuer Mieten Amerika\u2122',
    contactEmail: 'info@abenteuermietenamerika.de',
    ogImage: 'https://www.abenteuermietenamerika.de/og-image.jpg',
    ga4MeasurementId: 'G-7LCWYNKB6M',
    googleAdsId: 'AW-XXXXXXXXXX',
    metaPixelId: 'XXXXXXXXXXXXXXXX',
    clarityId: 'XXXXXXXXXX',
  },
  giw: {
    siteId: 'giw',
    defaultLang: 'en',
    supportedLangs: ['en'],
    storagePrefix: 'giw',
    conciergeApiUrl:
      'https://ama-api.anja687gutierrez.workers.dev/api/concierge',
    checkoutApiUrl:
      'https://abenteuer-mieten-platform.vercel.app/api/public/checkout',
    bookingSource: 'goiconicway',
    googleSheetsUrl:
      'https://script.google.com/macros/s/AKfycbzF4t-juXYphl5JjFjzurt9ARcaYnyOHYo4vCVUgmb99l96p-seSdcQJTZKaP5d92icyg/exec',
    whatsappUrl: 'https://wa.me/13106006624',
    siteUrl: 'https://www.goiconicway.com',
    partnerSiteUrl: 'https://www.abenteuermietenamerika.de',
    siteName: 'Go Iconic Way',
    companyDba: 'Gutierrez Ventures LLC DBA Go Iconic Way\u2122',
    contactEmail: 'info@goiconicway.com',
    ogImage: 'https://www.goiconicway.com/og-image.jpg',
    ga4MeasurementId: 'G-7LCWYNKB6M', // shared GA4 property
    googleAdsId: 'AW-XXXXXXXXXX',
    metaPixelId: 'XXXXXXXXXXXXXXXX',
    clarityId: 'XXXXXXXXXX',
  },
};

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

const LanguageContext = createContext<LanguageContextValue | null>(null);

/**
 * Detect the active site from the hostname at runtime.
 * Falls back to AMA (the primary German site) during SSG / dev.
 */
function detectSiteId(): SiteId {
  if (typeof window === 'undefined') return 'ama';
  const host = window.location.hostname;
  if (host.includes('goiconicway') || host.includes('iconicpathways'))
    return 'giw';
  return 'ama';
}

function getInitialLocale(config: SiteConfig): Locale {
  // GIW is English-only — skip storage check
  if (config.supportedLangs.length === 1) return config.defaultLang;

  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(`${config.storagePrefix}_lang`);
    if (stored === 'de' || stored === 'en') return stored;
  }
  return config.defaultLang;
}

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

interface LanguageProviderProps {
  children: ReactNode;
  /** Override site detection for testing or SSG. */
  forceSiteId?: SiteId;
}

export function LanguageProvider({
  children,
  forceSiteId,
}: LanguageProviderProps) {
  const siteId = forceSiteId ?? detectSiteId();
  const config = SITE_CONFIGS[siteId];
  const [locale, setLocaleState] = useState<Locale>(() =>
    getInitialLocale(config)
  );

  const setLocale = useCallback(
    (lang: Locale) => {
      // GIW ignores language changes — always English
      if (!config.supportedLangs.includes(lang)) return;
      setLocaleState(lang);
      if (typeof window !== 'undefined') {
        localStorage.setItem(`${config.storagePrefix}_lang`, lang);
        document.documentElement.setAttribute('lang', lang);
      }
    },
    [config]
  );

  // Set html lang on mount
  useEffect(() => {
    document.documentElement.setAttribute('lang', locale);
  }, [locale]);

  /**
   * Inline translation helper.
   * Usage: t('Buchen', 'Book')
   */
  const t = useCallback(
    (de: string, en: string): string => (locale === 'de' ? de : en),
    [locale]
  );

  return (
    <LanguageContext.Provider
      value={{
        locale,
        setLocale,
        t,
        isBilingual: config.supportedLangs.length > 1,
        config,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a <LanguageProvider>');
  }
  return ctx;
}

export type { Locale, SiteId, SiteConfig };
