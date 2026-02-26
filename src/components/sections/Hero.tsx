import { useLanguage } from '../../context/LanguageContext';

/**
 * Hero section — exact DOM structure from legacy index.html.
 *
 * Uses CSS classes from design-system.css:
 *   .hero, .hero-bg, .hero-video, .hero-static-image, .hero-overlay,
 *   .hero-container, .hero-content, .hero-badge,
 *   .hero-title .highlight (LED animation), .hero-desc,
 *   .opal-pill, .hero-actions, .stats-box, .btn-group, .btn-main
 *
 * Lead capture removed from hero — handled by exit-intent popup + FAB "Free Guide".
 */
export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="hero" id="home">
      <div className="hero-bg">
        {/* Desktop: Video */}
        <video
          className="hero-video"
          autoPlay
          muted
          playsInline
          poster="/hero-poster.jpg"
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

      </div>
    </section>
  );
}
