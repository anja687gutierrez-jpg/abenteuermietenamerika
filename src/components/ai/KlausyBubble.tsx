import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../../context/LanguageContext';

/**
 * Klausy — Floating AI Concierge Chat Bubble
 *
 * Fixed-position bubble that auto-appears after 8 seconds.
 * Uses .klausy-* classes from design-system.css.
 *
 * Behavior (matches legacy app.js):
 *   - Shows after 8s delay on first visit
 *   - Dismissible via close button
 *   - "Plan Route" scrolls to #concierge section
 *   - "Maybe Later" dismisses
 */
export function KlausyBubble() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    const timer = setTimeout(() => setVisible(true), 8000);
    return () => clearTimeout(timer);
  }, [dismissed]);

  const dismiss = useCallback(() => {
    setVisible(false);
    setDismissed(true);
  }, []);

  const scrollToConcierge = useCallback(() => {
    dismiss();
    const el = document.getElementById('concierge');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, [dismiss]);

  if (dismissed && !visible) return null;

  return (
    <div className={`klausy-bubble${visible ? ' visible' : ''}`} id="klausyBubble">
      <div className="klausy-avatar">🤖</div>
      <div className="klausy-message">
        <button className="klausy-close" onClick={dismiss}>
          <i className="fas fa-times" />
        </button>
        <div className="klausy-header">
          <span className="klausy-name">Klausy</span>
          <span className="klausy-badge">
            {t('Dein freundlicher KI-Concierge', 'Your Friendly AI Concierge')}
          </span>
        </div>
        <div className="klausy-text">
          {t(
            'Hey! 👋 Soll ich dir bei der Routenplanung helfen? Ich kenne alle Nationalparks und Supercharger-Stops!',
            "Hey! 👋 Need help planning your route? I know all the National Parks and Supercharger stops!"
          )}
        </div>
        <div className="klausy-actions">
          <button className="klausy-btn klausy-btn-primary" onClick={scrollToConcierge}>
            {t('Route planen', 'Plan Route')}
          </button>
          <button className="klausy-btn klausy-btn-secondary" onClick={dismiss}>
            {t('Später', 'Maybe Later')}
          </button>
        </div>
      </div>
    </div>
  );
}
