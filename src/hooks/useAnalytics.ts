import { useEffect, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type ConsentLevel = 'all' | 'essential' | 'custom' | null;

interface ConsentState {
  analytics: boolean;
  marketing: boolean;
}

interface AnalyticsTracker {
  trackPageView: (pageName: string) => void;
  trackClick: (buttonName: string, category?: string) => void;
  trackFormSubmit: (formName: string) => void;
  trackVehicleView: (vehicleName: string, price: number) => void;
  trackRouteView: (routeName: string) => void;
  trackDownload: (fileName: string) => void;
  trackBookingInquiry: (vehicle: string) => void;
  trackWhatsAppContact: () => void;
  trackLanguageChange: (language: string) => void;
}

interface UseAnalyticsReturn extends AnalyticsTracker {
  consent: ConsentState;
  acceptAll: () => void;
  declineOptional: () => void;
  saveCustom: (analytics: boolean, marketing: boolean) => void;
  hasConsented: boolean;
}

// ---------------------------------------------------------------------------
// Cookie helpers (ported from Analytics IIFE)
// ---------------------------------------------------------------------------

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const value = '; ' + document.cookie;
  const parts = value.split('; ' + name + '=');
  if (parts.length === 2) return parts.pop()!.split(';').shift() ?? null;
  return null;
}

function setCookie(name: string, value: string, days: number): void {
  if (typeof document === 'undefined') return;
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/;SameSite=Lax;Secure`;
}

// ---------------------------------------------------------------------------
// Script loaders (one-shot — idempotent via window checks)
// ---------------------------------------------------------------------------

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Third-party analytics globals — typed as optional since they're
 * injected at runtime by dynamically created script tags.
 */
const win = (typeof window !== 'undefined' ? window : {}) as Record<
  string,
  any
>;

function gtag(...args: unknown[]): void {
  win.gtag?.(...args);
}
function fbq(...args: unknown[]): void {
  win.fbq?.(...args);
}

// ---------------------------------------------------------------------------
// Script loaders (one-shot — idempotent via window property checks)
// ---------------------------------------------------------------------------

function loadGA4(measurementId: string): void {
  if (!measurementId || measurementId.includes('XXXX')) return;
  if (typeof window === 'undefined' || win.gtag) return;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  win.dataLayer = win.dataLayer || [];
  win.gtag = function () {
    win.dataLayer.push(arguments);
  };
  win.gtag('js', new Date());
  win.gtag('config', measurementId, {
    anonymize_ip: true,
    cookie_flags: 'SameSite=Lax;Secure',
  });
}

function loadGoogleAds(adsId: string): void {
  if (!adsId || adsId === 'AW-XXXXXXXXXX') return;
  gtag('config', adsId);
}

function loadMetaPixel(pixelId: string): void {
  if (!pixelId || pixelId === 'XXXXXXXXXXXXXXXX') return;
  if (typeof window === 'undefined' || win.fbq) return;

  /* Meta Pixel base code — official snippet */
  const n: any = (win.fbq = function () {
    n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
  });
  if (!win._fbq) win._fbq = n;
  n.push = n;
  n.loaded = true;
  n.version = '2.0';
  n.queue = [];

  const t = document.createElement('script');
  t.async = true;
  t.src = 'https://connect.facebook.net/en_US/fbevents.js';
  const s = document.getElementsByTagName('script')[0];
  s.parentNode!.insertBefore(t, s);

  win.fbq('init', pixelId);
  win.fbq('track', 'PageView');
}

function loadClarity(clarityId: string): void {
  if (!clarityId || clarityId === 'XXXXXXXXXX') return;
  if (typeof window === 'undefined' || win.clarity) return;

  ((c: any, l: Document, a: string, r: string, i: string) => {
    c[a] =
      c[a] ||
      function () {
        (c[a].q = c[a].q || []).push(arguments);
      };
    const t = l.createElement(r) as HTMLScriptElement;
    t.async = true;
    t.src = 'https://www.clarity.ms/tag/' + i;
    const y = l.getElementsByTagName(r)[0];
    y.parentNode!.insertBefore(t, y);
  })(window, document, 'clarity', 'script', clarityId);
}

// ---------------------------------------------------------------------------
// Consent state reader
// ---------------------------------------------------------------------------

function readConsent(): ConsentState {
  return {
    analytics: getCookie('analytics_cookies') === 'true',
    marketing: getCookie('marketing_cookies') === 'true',
  };
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useAnalytics(): UseAnalyticsReturn {
  const { config } = useLanguage();
  const location = useLocation();
  const initializedRef = useRef(false);
  const consentRef = useRef<ConsentState>(readConsent());

  // Initialize trackers based on stored consent (runs once)
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    const consent = readConsent();
    consentRef.current = consent;

    if (consent.analytics) {
      loadGA4(config.ga4MeasurementId);
      loadClarity(config.clarityId);
    }
    if (consent.marketing) {
      loadMetaPixel(config.metaPixelId);
      loadGoogleAds(config.googleAdsId);
    }
  }, [config]);

  // Track page views on route changes
  useEffect(() => {
    if (!consentRef.current.analytics) return;

    // Map routes to page names
    const pageNames: Record<string, string> = {
      '/': 'Homepage',
      '/flotte': 'Fleet',
      '/routen': 'Routes',
      '/preise': 'Pricing',
    };
    const pageName = pageNames[location.pathname] ?? location.pathname;

    gtag('event', 'page_view', { page_title: pageName });
    fbq('track', 'ViewContent', { content_name: pageName });
  }, [location.pathname]);

  // --- Consent management ---

  const applyConsent = useCallback(
    (analytics: boolean, marketing: boolean) => {
      consentRef.current = { analytics, marketing };
      if (analytics) {
        loadGA4(config.ga4MeasurementId);
        loadClarity(config.clarityId);
      }
      if (marketing) {
        loadMetaPixel(config.metaPixelId);
        loadGoogleAds(config.googleAdsId);
      }
    },
    [config]
  );

  const acceptAll = useCallback(() => {
    setCookie('cookie_consent', 'all', 365);
    setCookie('analytics_cookies', 'true', 365);
    setCookie('marketing_cookies', 'true', 365);
    applyConsent(true, true);
  }, [applyConsent]);

  const declineOptional = useCallback(() => {
    setCookie('cookie_consent', 'essential', 365);
    setCookie('analytics_cookies', 'false', 365);
    setCookie('marketing_cookies', 'false', 365);
    consentRef.current = { analytics: false, marketing: false };
  }, []);

  const saveCustom = useCallback(
    (analytics: boolean, marketing: boolean) => {
      setCookie('cookie_consent', 'custom', 365);
      setCookie('analytics_cookies', analytics.toString(), 365);
      setCookie('marketing_cookies', marketing.toString(), 365);
      applyConsent(analytics, marketing);
    },
    [applyConsent]
  );

  // --- Tracking methods ---

  const trackPageView = useCallback((pageName: string) => {
    gtag('event', 'page_view', { page_title: pageName });
    fbq('track', 'ViewContent', { content_name: pageName });
  }, []);

  const trackClick = useCallback(
    (buttonName: string, category: string = 'engagement') => {
      gtag('event', 'click', {
        event_category: category,
        event_label: buttonName,
      });
    },
    []
  );

  const trackFormSubmit = useCallback((formName: string) => {
    gtag('event', 'form_submit', {
      event_category: 'lead',
      event_label: formName,
    });
    fbq('track', 'Lead', { content_name: formName });
  }, []);

  const trackVehicleView = useCallback(
    (vehicleName: string, price: number) => {
      gtag('event', 'view_item', {
        items: [{ item_name: vehicleName, price, currency: 'USD' }],
      });
      fbq('track', 'ViewContent', {
        content_name: vehicleName,
        content_type: 'vehicle',
        value: price,
        currency: 'USD',
      });
    },
    []
  );

  const trackRouteView = useCallback((routeName: string) => {
    gtag('event', 'select_content', {
      content_type: 'route',
      item_id: routeName,
    });
  }, []);

  const trackDownload = useCallback((fileName: string) => {
    gtag('event', 'file_download', {
      file_name: fileName,
      file_extension: 'kml',
    });
  }, []);

  const trackBookingInquiry = useCallback((vehicle: string) => {
    gtag('event', 'begin_checkout', {
      items: [{ item_name: vehicle }],
    });
    fbq('track', 'InitiateCheckout', { content_name: vehicle });
  }, []);

  const trackWhatsAppContact = useCallback(() => {
    gtag('event', 'contact', { method: 'WhatsApp' });
    fbq('track', 'Contact');
  }, []);

  const trackLanguageChange = useCallback((language: string) => {
    gtag('event', 'select_content', {
      content_type: 'language',
      item_id: language,
    });
  }, []);

  return {
    consent: consentRef.current,
    hasConsented: getCookie('cookie_consent') !== null,
    acceptAll,
    declineOptional,
    saveCustom,
    trackPageView,
    trackClick,
    trackFormSubmit,
    trackVehicleView,
    trackRouteView,
    trackDownload,
    trackBookingInquiry,
    trackWhatsAppContact,
    trackLanguageChange,
  };
}
