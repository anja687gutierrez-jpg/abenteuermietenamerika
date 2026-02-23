import { useState, useCallback } from 'react';
import { useLanguage } from '../../context/LanguageContext';

/**
 * Hero section — exact DOM structure from legacy index.html.
 *
 * Uses CSS classes from design-system.css:
 *   .hero, .hero-bg, .hero-video, .hero-static-image, .hero-overlay,
 *   .hero-container (2-col grid), .hero-content, .hero-badge,
 *   .hero-title .highlight (LED animation), .hero-desc,
 *   .opal-pill, .hero-actions, .stats-box, .btn-group, .btn-main,
 *   .hero-lead-capture, .hero-lead-form
 */
export function Hero() {
  const { t, config } = useLanguage();
  const [leadEmail, setLeadEmail] = useState('');
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const handleLeadSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!leadEmail.trim()) return;
      // Send to Google Sheets endpoint
      fetch(config.googleSheetsUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: leadEmail, source: 'hero-lead-capture' }),
      });
      setLeadSubmitted(true);
    },
    [leadEmail, config.googleSheetsUrl]
  );

  return (
    <section className="hero" id="home">
      <div className="hero-bg">
        {/* Desktop: Video */}
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          poster="/zion-campsite-tesla.jpg"
        >
          <source src="/tesla.mp4" type="video/mp4" />
        </video>
        {/* Mobile: Static Image with Ken Burns */}
        <div className="hero-static-image" aria-hidden="true" />
      </div>
      <div className="hero-overlay" />

      <div className="hero-container">
        {/* Left column — content */}
        <div className="hero-content">
          <span className="hero-badge">
            <i className="fas fa-flag-usa" />{' '}
            <span>{t('USA Roadtrip Spezialist', 'USA Roadtrip Specialist')}</span>
          </span>

          <h1 className="hero-title">
            {t('Erlebe den ultimativen', 'Experience the ultimate')}
            <br />
            <span className="highlight">USA-Roadtrip</span>
          </h1>

          <p className="hero-desc">
            {t(
              'Das ultimative E-Auto-Erlebnis: Tesla Roadtrip-Paket, Camping-Ausrüstung und KI-gestützte Routenplanung. Alles inklusive.',
              'The ultimate EV experience: Tesla Roadtrip Package, camping gear, and AI-powered route planning. All included.'
            )}
          </p>

          {/* Feature pills */}
          <div className="feature-pills">
            <div className="opal-pill">
              <i className="fas fa-bolt" />{' '}
              <span>{t('Elektroautos', 'Electric Cars')}</span>
            </div>
            <div className="opal-pill">
              <i className="fas fa-charging-station" />{' '}
              <span>{t('Supercharger Inklusive', 'Free Supercharging')}</span>
            </div>
            <div className="opal-pill">
              <i className="fas fa-handshake" />{' '}
              <span>{t('Geprüfte Exklusivpartner', 'Exclusively Vetted Partners')}</span>
            </div>
            <div className="opal-pill">
              <i className="fas fa-robot" />{' '}
              <span>{t('KI-Concierge', 'AI Concierge')}</span>
            </div>
            <div className="opal-pill">
              <i className="fas fa-campground" />{' '}
              <span>{t('Camping-Ausrüstung', 'Camping Gear')}</span>
            </div>
            <div className="opal-pill">
              <i className="fas fa-headset" /> <span>24/7 Support</span>
            </div>
          </div>

          {/* Actions: stats + CTA */}
          <div className="hero-actions">
            <div className="stats-box">
              <div className="stat-item">
                <div className="stat-num">{t('0g', '0g')}</div>
                <div className="stat-label">{t('CO₂ Emissionen', 'CO₂ Emissions')}</div>
              </div>
              <div className="stat-item">
                <div className="stat-num">{t('530km', '330mi')}</div>
                <div className="stat-label">{t('Reichweite', 'Range')}</div>
              </div>
              <div className="stat-item">
                <div className="stat-num">Camp</div>
                <div className="stat-label">{t('Modus Bereit', 'Mode Ready')}</div>
              </div>
              <div className="stat-item">
                <div className="stat-num">{t('KI', 'AI')}</div>
                <div className="stat-label">{t('Routenplanung', 'Route Planning')}</div>
              </div>
            </div>

            <div className="btn-group">
              <a href="#booking-bar" className="btn-main btn-primary-cta">
                <span>{t('Abenteuer Starten', 'Start Adventure')}</span>{' '}
                <i className="fas fa-arrow-right" />
              </a>
            </div>
          </div>
        </div>

        {/* Right column — Lead Capture */}
        <div className="hero-lead-capture" id="heroLeadCapture">
          {!leadSubmitted ? (
            <>
              <div className="lead-capture-badge">
                <i className="fas fa-download" />{' '}
                <span>{t('Kostenlos herunterladen', 'Free Download')}</span>
              </div>
              <h3 className="lead-capture-title">
                {t(
                  'Der ultimative USA Roadtrip Guide',
                  'The Ultimate USA Roadtrip Guide'
                )}
              </h3>
              <ul className="lead-capture-benefits">
                <li>
                  <i className="fas fa-check-circle" />{' '}
                  <span>
                    {t(
                      'Komplette Packliste für Camping-Roadtrips',
                      'Complete packing list for camping roadtrips'
                    )}
                  </span>
                </li>
                <li>
                  <i className="fas fa-check-circle" />{' '}
                  <span>
                    {t(
                      'Geheimtipps zu Tesla Supercharger-Stops',
                      'Insider tips for Tesla Supercharger stops'
                    )}
                  </span>
                </li>
                <li>
                  <i className="fas fa-check-circle" />{' '}
                  <span>
                    {t(
                      'Exklusive Rabattcodes für Partner-Campingplätze',
                      'Exclusive discount codes for partner campsites'
                    )}
                  </span>
                </li>
              </ul>
              <form className="hero-lead-form" onSubmit={handleLeadSubmit}>
                <input
                  type="email"
                  value={leadEmail}
                  onChange={(e) => setLeadEmail(e.target.value)}
                  placeholder={t('Ihre E-Mail-Adresse', 'Your email address')}
                  required
                />
                <button type="submit">
                  <i className="fas fa-paper-plane" />{' '}
                  <span>{t('Guide Anfordern', 'Get the Guide')}</span>
                </button>
              </form>
              <p className="lead-capture-privacy">
                <i className="fas fa-lock" />{' '}
                <span>
                  {t(
                    'Wir respektieren Ihre Privatsphäre. Kein Spam.',
                    'We respect your privacy. No spam.'
                  )}
                </span>
              </p>
            </>
          ) : (
            <div className="lead-form-success">
              <h4>{t('Vielen Dank!', 'Thank you!')}</h4>
              <p>
                {t(
                  'Ihr Guide ist unterwegs — prüfen Sie Ihre E-Mail.',
                  'Your guide is on the way — check your email.'
                )}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
