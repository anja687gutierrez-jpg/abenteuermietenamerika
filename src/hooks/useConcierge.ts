import { useState, useCallback, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/**
 * Concierge modes — each sets a different system prompt on the
 * Cloudflare Worker (KlausyAI backend).
 */
type ConciergeMode = 'route' | 'packing' | 'tesla' | 'vehicle' | 'traffic';

interface ConciergeState {
  reply: string | null;
  loading: boolean;
  error: string | null;
  rateLimited: boolean;
}

interface UseConciergeReturn extends ConciergeState {
  ask: (message: string) => Promise<void>;
  mode: ConciergeMode;
  setMode: (mode: ConciergeMode) => void;
  placeholder: string;
  clear: () => void;
}

// ---------------------------------------------------------------------------
// Placeholders per mode (ported from KlausyAI IIFE)
// ---------------------------------------------------------------------------

const PLACEHOLDERS: Record<ConciergeMode, { de: string; en: string }> = {
  route: {
    de: 'z.B. Plane eine 7-tägige Reise nach Zion von Las Vegas...',
    en: 'e.g. Plan a 7-day trip to Zion from Las Vegas...',
  },
  packing: {
    de: 'z.B. Was sollte ich für einen Winter-Campingtrip einpacken?',
    en: 'e.g. What should I pack for a winter camping trip?',
  },
  tesla: {
    de: 'z.B. Wie funktioniert der Camp-Modus?',
    en: 'e.g. How does Camp Mode work?',
  },
  vehicle: {
    de: 'z.B. Welcher Tesla ist am besten für eine 4-köpfige Familie?',
    en: 'e.g. Which Tesla is best for a family of 4?',
  },
  traffic: {
    de: 'z.B. Beste Zeit für den Grand Canyon?',
    en: 'e.g. Best time for Grand Canyon?',
  },
};

// ---------------------------------------------------------------------------
// HTML sanitizer (strip scripts/iframes/event handlers from AI responses)
// ---------------------------------------------------------------------------

function sanitizeHTML(raw: string): string {
  return raw
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
    .replace(/<embed\b[^>]*>/gi, '')
    .replace(/\bon\w+\s*=/gi, 'data-removed=');
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useConcierge(): UseConciergeReturn {
  const { locale, config } = useLanguage();
  const [mode, setMode] = useState<ConciergeMode>('route');
  const [state, setState] = useState<ConciergeState>({
    reply: null,
    loading: false,
    error: null,
    rateLimited: false,
  });

  // Abort controller ref for cancelling in-flight requests
  const abortRef = useRef<AbortController | null>(null);

  const ask = useCallback(
    async (message: string) => {
      const trimmed = message.trim();
      if (!trimmed) return;

      // Cancel any in-flight request
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setState({ reply: null, loading: true, error: null, rateLimited: false });

      try {
        const res = await fetch(config.conciergeApiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: trimmed,
            mode,
            language: locale,
          }),
          signal: controller.signal,
        });

        const data = await res.json();

        // Rate limited (429)
        if (res.status === 429) {
          const msg =
            locale === 'en'
              ? data.error ||
                'Rate limit reached. Please try again later.'
              : data.error_de ||
                'Anfragelimit erreicht. Bitte versuchen Sie es später erneut.';
          setState({
            reply: null,
            loading: false,
            error: msg,
            rateLimited: true,
          });
          return;
        }

        if (!res.ok || data.error) {
          throw new Error(data.error || 'API_ERROR');
        }

        setState({
          reply: sanitizeHTML(data.reply),
          loading: false,
          error: null,
          rateLimited: false,
        });
      } catch (err: unknown) {
        // Ignore abort errors (user fired a new query)
        if (err instanceof DOMException && err.name === 'AbortError') return;

        const fallback =
          locale === 'en'
            ? 'Our concierge is currently offline. Please use WhatsApp for assistance.'
            : 'Unser Concierge ist gerade offline. Bitte nutzen Sie WhatsApp für Hilfe.';

        setState({
          reply: null,
          loading: false,
          error:
            err instanceof Error && err.message !== 'API_ERROR'
              ? err.message
              : fallback,
          rateLimited: false,
        });
      }
    },
    [config.conciergeApiUrl, mode, locale]
  );

  const clear = useCallback(() => {
    abortRef.current?.abort();
    setState({ reply: null, loading: false, error: null, rateLimited: false });
  }, []);

  const placeholder = PLACEHOLDERS[mode][locale];

  return { ...state, ask, mode, setMode, placeholder, clear };
}

export type { ConciergeMode };
