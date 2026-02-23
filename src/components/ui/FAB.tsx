import { useState, useCallback } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { openExitPopup } from './ExitIntentPopup';

/**
 * FAB — Floating Action Button with expandable menu
 *
 * Fixed bottom-right button with Gratis Guide + Klausy + WhatsApp options.
 * Uses .unified-fab, .fab-*, classes from design-system.css.
 *
 * Behavior (matches legacy app.js):
 *   - Headset icon by default
 *   - Click toggles open/close (icon rotates 45deg via .open class)
 *   - "Gratis Guide" opens the exit-intent popup
 *   - "Klausy fragen" scrolls to #concierge section
 *   - WhatsApp opens in new tab
 */
export function FAB() {
  const { t, config } = useLanguage();
  const [open, setOpen] = useState(false);

  const toggle = useCallback(() => setOpen((prev) => !prev), []);

  const handleGuide = useCallback(() => {
    setOpen(false);
    openExitPopup();
  }, []);

  const scrollToConcierge = useCallback(() => {
    setOpen(false);
    const el = document.getElementById('concierge');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div className={`unified-fab${open ? ' open' : ''}`} id="unifiedFab">
      {/* Expandable options — order matches original: Guide, Concierge, WhatsApp */}
      <div className="fab-options">
        <button
          className="fab-option fab-guide"
          onClick={handleGuide}
        >
          <i className="fas fa-map" />{' '}
          <span>{t('Gratis Guide', 'Free Guide')}</span>
        </button>
        <button
          className="fab-option fab-concierge"
          onClick={scrollToConcierge}
        >
          <i className="fas fa-robot" />{' '}
          <span>{t('Klausy fragen', 'Ask Klausy')}</span>
        </button>
        <a
          href={config.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="fab-option fab-whatsapp"
          onClick={() => setOpen(false)}
        >
          <i className="fab fa-whatsapp" />{' '}
          <span>{t('WhatsApp Chat', 'WhatsApp Chat')}</span>
        </a>
      </div>

      {/* Main FAB button */}
      <button
        className={`fab-main${open ? ' open' : ''}`}
        onClick={toggle}
        aria-label={t('Kontaktoptionen', 'Contact options')}
      >
        <span className="fab-pulse" />
        <i className="fas fa-headset" />
      </button>
    </div>
  );
}
