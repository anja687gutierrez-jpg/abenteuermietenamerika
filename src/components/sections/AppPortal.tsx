import { useLanguage } from '../../context/LanguageContext';

/**
 * AppPortal — "Your Digital Co-Pilot" section
 *
 * Uses CSS classes from design-system.css:
 *   #app-portal, .container, .portal-glass, .portal-content,
 *   .portal-badge, .portal-title, .portal-subtitle,
 *   .app-features, .af-item, .af-icon,
 *   .interface-preview, .ai-pulse-orb, .interface-card,
 *   .card-label, .card-text, .route-visual, .rv-point,
 *   .rv-code, .rv-time, .rv-line, .app-download-btn
 */
export function AppPortal() {
  const { t } = useLanguage();

  return (
    <section id="app-portal">
      <div className="container">
        <div className="portal-glass">

          <div className="portal-content">
            <div className="portal-badge">
              {t('Bei jeder Buchung inklusive', 'Included with Every Booking')}
            </div>
            <h2 className="portal-title">
              {t('Ihr digitaler Co-Pilot', 'Your Digital Co-Pilot')}
            </h2>
            <p className="portal-subtitle">
              {t(
                'Vergessen Sie Reichweitenangst. Unsere eigenständige App liest die Tesla-Telemetrie und verwandelt jeden Kilometer in ein Erlebnis — mit 7 KI-Reisepersönlichkeiten, versteckten Nationalpark-Highlights und Ladestopps so präzise berechnet, dass Sorge nicht entstehen kann.',
                'Forget range anxiety. Our standalone app reads Tesla telemetry and transforms every mile into an experience — with 7 AI travel personas, hidden national park highlights, and charging stops calculated so precisely that worry can\'t arise.'
              )}
            </p>

            <div className="app-features">
              <div className="af-item">
                <div className="af-icon"><i className="fas fa-route" /></div>
                <span>{t('KI-Routenplanung', 'AI Route Planning')}</span>
              </div>
              <div className="af-item">
                <div className="af-icon"><i className="fas fa-charging-station" /></div>
                <span>{t('Supercharger-Stops', 'Supercharger Stops')}</span>
              </div>
              <div className="af-item">
                <div className="af-icon"><i className="fas fa-users" /></div>
                <span>{t('7 KI-Personas', '7 AI Personas')}</span>
              </div>
              <div className="af-item">
                <div className="af-icon"><i className="fas fa-gem" /></div>
                <span>{t('Geheimtipps', 'Hidden Gems')}</span>
              </div>
              <div className="af-item">
                <div className="af-icon"><i className="fas fa-campground" /></div>
                <span>{t('Campingplätze', 'Campsites')}</span>
              </div>
              <div className="af-item">
                <div className="af-icon"><i className="fas fa-mountain" /></div>
                <span>{t('Nationalparks', 'National Parks')}</span>
              </div>
            </div>
          </div>

          <div className="interface-preview">
            <div className="ai-pulse-orb" />

            <div className="interface-card">
              <div className="card-label">Klausy — Travel Bestie</div>
              <div className="card-text">
                &ldquo;Route nach Zion optimiert! Ankunft mit 18% Batterie. Supercharger-Stop in St. George eingeplant. Psst: 10 Min vom Charger liegt ein versteckter Wasserfall — 4.9 Sterne, kaum Touristen.&rdquo;
              </div>
            </div>

            <div className="route-visual">
              <div className="rv-point">
                <span className="rv-code">LAS</span>
                <span className="rv-time">10:00 AM</span>
              </div>
              <div className="rv-line" />
              <div className="rv-point">
                <span className="rv-code">ZION</span>
                <span className="rv-time">02:45 PM</span>
              </div>
            </div>

            <button className="app-download-btn">
              <i className="fas fa-download" style={{ marginRight: '8px' }} />
              <span>{t('Die App Herunterladen', 'Download the App')}</span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
