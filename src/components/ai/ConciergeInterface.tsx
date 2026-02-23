import { useState, useRef, useCallback } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useConcierge } from '../../hooks/useConcierge';
import type { ConciergeMode } from '../../hooks/useConcierge';

// ---------------------------------------------------------------------------
// Mode config — icons & bilingual labels matching legacy KlausyAI section
// ---------------------------------------------------------------------------

interface ModeConfig {
  mode: ConciergeMode;
  icon: string;
  de: string;
  en: string;
}

const MODES: ModeConfig[] = [
  { mode: 'route', icon: 'fas fa-sliders-h', de: 'Route Planen', en: 'Plan Route' },
  { mode: 'packing', icon: 'fas fa-suitcase', de: 'Packliste', en: 'Packing List' },
  { mode: 'tesla', icon: 'fas fa-bolt', de: 'Tesla Fragen', en: 'Tesla Questions' },
  { mode: 'vehicle', icon: 'fas fa-car', de: 'Fahrzeug-Berater', en: 'Vehicle Advisor' },
  { mode: 'traffic', icon: 'fas fa-traffic-light', de: 'Verkehrs-Experte', en: 'Traffic Expert' },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ConciergeInterface() {
  const { t } = useLanguage();
  const { reply, loading, error, rateLimited, ask, mode, setMode, placeholder, clear } =
    useConcierge();

  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!input.trim() || loading) return;
      ask(input.trim());
      setInput('');
    },
    [input, loading, ask]
  );

  const handleModeChange = useCallback(
    (newMode: ConciergeMode) => {
      setMode(newMode);
      clear();
      setInput('');
      inputRef.current?.focus();
    },
    [setMode, clear]
  );

  return (
    <section id="concierge" className="ai-wrapper">
      <div className="container">
        <div className="chat-interface">
          {/* Brain icon */}
          <div className="chat-icon brain-icon">
            <i className="fas fa-brain" />
          </div>

          {/* Title */}
          <h2 className="concierge-title">
            {t('Klausy - Dein KI-Concierge', 'Klausy - Your AI Concierge')}
          </h2>
          <p className="concierge-subtitle">
            {t(
              'Hallo! Ich bin Klausy \uD83E\uDD16 Dein pers\u00f6nlicher Reiseberater. W\u00e4hle einen Modus und lass mich dir helfen:',
              "Hi! I'm Klausy \uD83E\uDD16 Your personal travel advisor. Choose a mode and let me help you:"
            )}
          </p>

          {/* Card container */}
          <div className="concierge-card">
            {/* Mode buttons */}
            <div className="mode-buttons">
              {MODES.map((m) => (
                <button
                  key={m.mode}
                  className={`mode-btn${mode === m.mode ? ' active' : ''}`}
                  data-mode={m.mode}
                  onClick={() => handleModeChange(m.mode)}
                >
                  <i className={m.icon} /> <span>{t(m.de, m.en)}</span>
                </button>
              ))}
            </div>

            {/* Chat input */}
            <form onSubmit={handleSubmit} className="chat-input-wrap">
              <input
                ref={inputRef}
                type="text"
                className="term-input"
                id="ai-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={placeholder}
                disabled={loading}
              />
              <button
                type="submit"
                className="ask-btn-gradient"
                disabled={loading || !input.trim()}
              >
                <i className="fas fa-pen" />{' '}
                <span>{loading ? '...' : t('Fragen', 'Ask')}</span>
              </button>
            </form>
          </div>

          {/* AI response output */}
          {loading && (
            <div
              className="ai-message visible"
              style={{ textAlign: 'center' }}
            >
              <div className="klausy-typing">
                <span />
                <span />
                <span />
              </div>
            </div>
          )}

          {reply && (
            <div
              className="ai-message visible"
              dangerouslySetInnerHTML={{ __html: reply }}
            />
          )}

          {error && (
            <div
              className="ai-message visible"
              style={{
                color: rateLimited
                  ? 'var(--color-amber-600)'
                  : 'var(--color-term-red)',
              }}
            >
              {error}
            </div>
          )}

          {/* Disclaimer */}
          <p className="concierge-disclaimer">
            {t(
              '*Dies ist eine Vorschau basierend auf Groq AI. Vollst\u00e4ndige Concierge-Funktionen bei Buchung.',
              '*This is a preview powered by Groq AI. Full concierge features available upon booking.'
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
