import { useLanguage } from '../../context/LanguageContext';

/**
 * MobileBottomNav — fixed bottom navigation bar (mobile only)
 *
 * Uses CSS classes from design-system.css:
 *   .mobile-bottom-nav, .mobile-bottom-nav-items, .mobile-nav-item
 *
 * CSS handles display:none on desktop, display:block on mobile (max-width: 768px)
 */
export function MobileBottomNav() {
  const { t } = useLanguage();

  return (
    <nav className="mobile-bottom-nav" id="mobile-bottom-nav" aria-label={t('Schnellnavigation', 'Quick navigation')}>
      <div className="mobile-bottom-nav-items">
        <a href="#home" className="mobile-nav-item" data-section="home">
          <i className="fas fa-home" />
          <span>Home</span>
        </a>
        <a href="#fleet" className="mobile-nav-item" data-section="fleet">
          <i className="fas fa-car" />
          <span>Autos</span>
        </a>
        <a href="#routes" className="mobile-nav-item" data-section="routes">
          <i className="fas fa-route" />
          <span>Routen</span>
        </a>
        <a href="#testimonials" className="mobile-nav-item" data-section="testimonials">
          <i className="fas fa-star" />
          <span>Reviews</span>
        </a>
        <a href="#contact" className="mobile-nav-item" data-section="contact">
          <i className="fas fa-envelope" />
          <span>{t('Kontakt', 'Contact')}</span>
        </a>
      </div>
    </nav>
  );
}
