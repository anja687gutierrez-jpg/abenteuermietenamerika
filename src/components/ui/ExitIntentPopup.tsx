import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../../context/LanguageContext';

/**
 * ExitIntentPopup — "Warten Sie! Gratis Roadtrip-Guide" modal
 *
 * Triggers on mouse leaving viewport (exit intent) or when opened
 * programmatically via the global openExitPopup() function.
 *
 * Uses CSS classes from design-system.css:
 *   .lead-popup-overlay, .lead-popup, .lead-popup-close,
 *   .lead-popup-icon, .lead-form, .lead-form-note,
 *   .lead-form-success
 */

// Global function so FAB can trigger the popup
let _openPopup: (() => void) | null = null;
export function openExitPopup() {
  _openPopup?.();
}

export function ExitIntentPopup() {
  const { t, locale, config } = useLanguage();
  const [active, setActive] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [email, setEmail] = useState('');

  // Register global opener
  useEffect(() => {
    _openPopup = () => {
      setActive(true);
      setSubmitted(false);
    };
    return () => { _openPopup = null; };
  }, []);

  // Exit-intent detection (mouse leaves top of viewport)
  useEffect(() => {
    if (dismissed || submitted) return;
    const handler = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setActive(true);
        // Only trigger once
        setDismissed(true);
      }
    };
    document.addEventListener('mouseout', handler);
    return () => document.removeEventListener('mouseout', handler);
  }, [dismissed, submitted]);

  const close = useCallback(() => {
    setActive(false);
    setDismissed(true);
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!email.trim()) return;
      // Send to Google Sheets endpoint
      fetch(config.googleSheetsUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: config.siteId + ':exit-intent-popup' }),
      });
      setSubmitted(true);
    },
    [email, config.googleSheetsUrl]
  );

  return (
    <div
      className={`lead-popup-overlay${active ? ' active' : ''}`}
      id="exitPopup"
      role="dialog"
      aria-modal="true"
      aria-labelledby="exitPopupTitle"
      onClick={(e) => {
        // Close on overlay click (not popup itself)
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="lead-popup">
        <button className="lead-popup-close" onClick={close}>
          <i className="fas fa-times" />
        </button>

        {!submitted ? (
          <>
            <span className="lead-popup-icon">&#x1F5FA;&#xFE0F;</span>
            <h3 id="exitPopupTitle">
              {t('Warten Sie! Gratis Roadtrip-Guide', 'Wait! Free Roadtrip Guide')}
            </h3>
            {locale === 'de' ? (
              <p>Bevor Sie gehen: Holen Sie sich unsere <strong>exklusive Packliste</strong> und <strong>10 Geheimtipps</strong> für den perfekten USA-Roadtrip – kostenlos!</p>
            ) : (
              <p>Before you go: Get our <strong>exclusive packing list</strong> and <strong>10 insider tips</strong> for the perfect USA road trip – free!</p>
            )}
            <form className="lead-form" onSubmit={handleSubmit}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('Ihre E-Mail-Adresse', 'Your email address')}
                required
              />
              <button type="submit">
                <i className="fas fa-download" />
                {t('Jetzt Gratis Herunterladen', 'Download Free Now')}
              </button>
              <p className="lead-form-note">
                <i className="fas fa-lock" style={{ marginRight: '0.25rem' }} />
                {t('Kein Spam. Jederzeit abmelden.', 'No spam. Unsubscribe anytime.')}
              </p>
            </form>
          </>
        ) : (
          <div className="lead-form-success">
            <i className="fas fa-check-circle" />
            <h4>{t('Vielen Dank!', 'Thank you!')}</h4>
            <p>
              {t(
                'Ihr Gratis Roadtrip-Guide ist unterwegs – prüfen Sie Ihre E-Mail.',
                'Your free Roadtrip Guide is on the way – check your email.'
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
