import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

// ---------------------------------------------------------------------------
// Footer — matches legacy footer with bilingual links, contact, legal,
//           social placeholders, copyright & Vetted Partner Seal
// ---------------------------------------------------------------------------

export function Footer() {
  const { t, config } = useLanguage();

  return (
    <footer role="contentinfo" aria-label={t('Fußzeile', 'Footer')}>
      <div className="container">
        <div className="footer-content">
          {/* Contact */}
          <div className="footer-section">
            <h3>{t('Kontakt', 'Contact')}</h3>
            <p>
              <a
                href={config.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                <i className="fab fa-whatsapp" style={{ color: '#25D366' }} />{' '}
                WhatsApp: +1 (310) 600-6624
              </a>
            </p>
            <p>
              <i className="fas fa-phone" />{' '}
              {t('Büro: +1 (323) 917-7708', 'Office: +1 (323) 917-7708')}
            </p>
            <p>
              <i className="fas fa-envelope" />{' '}
              <a href={`mailto:${config.contactEmail}`}>
                {config.contactEmail}
              </a>
            </p>
            <p>
              <i className="fas fa-clock" />{' '}
              {t('Mo-So: 9:00 - 18:00 Uhr', 'Mon-Sun: 9:00 AM - 6:00 PM')}
            </p>
            <p>
              <i className="fas fa-map-marker-alt" />{' '}
              Las Vegas, Nevada, USA
            </p>
          </div>

          {/* Sitemap / Services */}
          <div className="footer-section">
            <h3>{t('Navigation', 'Sitemap')}</h3>
            <p>
              <Link to="/flotte">{t('Flotte', 'Fleet')}</Link>
            </p>
            <p>
              <Link to="/routen">{t('Routen', 'Routes')}</Link>
            </p>
            <p>
              <Link to="/preise">{t('Preise', 'Pricing')}</Link>
            </p>
            <p>
              <a href="#concierge">
                {t('KI-Routenplaner', 'AI Route Planner')}
              </a>
            </p>
          </div>

          {/* Legal */}
          <div className="footer-section">
            <h3>{t('Rechtliches', 'Legal')}</h3>
            <p>
              <a href="#" data-modal="terms">
                {t('AGB & Mietbedingungen', 'Terms & Rental Conditions')}
              </a>
            </p>
            <p>
              <a href="#" data-modal="privacy">
                {t('Datenschutz', 'Privacy Policy')}
              </a>
            </p>
            <p>
              <a href="#" data-modal="impressum">
                {t('Impressum', 'Imprint')}
              </a>
            </p>
            <p>
              <a href="#" data-action="cookie-settings">
                {t('Cookie-Einstellungen', 'Cookie Settings')}
              </a>
            </p>
          </div>

          {/* Vetted Seal + Social */}
          <div className="footer-section">
            <h3>{t('Vertrauen', 'Trust')}</h3>

            {/* Vetted Partner Seal */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-3)',
                padding: 'var(--space-3) var(--space-4)',
                background:
                  'linear-gradient(135deg, rgba(245,158,11,0.12), rgba(217,119,6,0.06))',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid rgba(245,158,11,0.25)',
                marginBottom: 'var(--space-4)',
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--radius-md)',
                  background:
                    'linear-gradient(135deg, var(--color-amber-400), var(--color-amber-600))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              </div>
              <div>
                <div
                  style={{
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--weight-bold)' as any,
                    color: 'var(--color-amber-300)',
                  }}
                >
                  {t('Geprüft & Verifiziert', 'Vetted & Verified')}
                </div>
                <div
                  style={{
                    fontSize: 'var(--text-xs)',
                    color: 'var(--color-glass-white-50)',
                  }}
                >
                  {t('Abenteuer Mieten Standard', `${config.siteName} Standard`)}
                </div>
              </div>
            </div>

            {/* Social — coming soon */}
            <p
              style={{
                fontSize: '0.85rem',
                opacity: 0.6,
                fontStyle: 'italic',
              }}
            >
              {t('Kommt bald...', 'Coming soon...')}
            </p>
            <div
              style={{
                display: 'flex',
                gap: '1rem',
                marginTop: '0.5rem',
                opacity: 0.4,
                pointerEvents: 'none',
              }}
            >
              <span>
                <i className="fab fa-instagram" />
              </span>
              <span>
                <i className="fab fa-facebook" />
              </span>
              <span>
                <i className="fab fa-twitter" />
              </span>
              <span>
                <i className="fab fa-youtube" />
              </span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            {t(
              `\u00a9 2026 ${config.companyDba}. Alle Rechte vorbehalten.`,
              `\u00a9 2026 ${config.companyDba}. All rights reserved.`
            )}{' '}
            | Made with <i className="fas fa-heart" /> for adventurers
          </p>
        </div>
      </div>
    </footer>
  );
}
