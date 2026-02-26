import { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { LiquidMetalButton } from '../ui/LiquidMetalButton';

/**
 * Header — exact structure from legacy index.html
 *
 * Uses CSS classes from design-system.css:
 *   header, nav, .logo-link, .logo-text, .logo-line-1, .logo-line-2,
 *   .nav-links, .nav-link, .nav-actions,
 *   .lang-toggle, .lang-btn, .login-btn,
 *   .mobile-menu-toggle, .hamburger,
 *   .mobile-nav-overlay, .mobile-nav-drawer, .mobile-nav-header,
 *   .mobile-nav-logo, .mobile-nav-close, .mobile-nav-links,
 *   .mobile-nav-link, .mobile-nav-cta, .mobile-nav-contact
 */

interface NavItem {
  href: string;
  de: string;
  en: string;
}

const NAV_ITEMS: NavItem[] = [
  { href: '#home', de: 'Home', en: 'Home' },
  { href: '#booking-bar', de: 'Reise Planen', en: 'Plan Your Trip' },
  { href: '#fleet', de: 'E-Flotte', en: 'E-Fleet' },
  { href: '#routes', de: 'Routen', en: 'Routes' },
  { href: '#concierge', de: 'KI-Concierge', en: 'AI Concierge' },
  { href: '#founder', de: 'Über uns', en: 'About' },
];

export function Header() {
  const { locale, setLocale, t, isBilingual, config } = useLanguage();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Glassmorphism intensifies on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close drawer on route change
  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);

  // Close drawer on outside click
  useEffect(() => {
    if (!drawerOpen) return;
    const handler = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setDrawerOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [drawerOpen]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  const toggleDrawer = useCallback(() => setDrawerOpen((o) => !o), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  return (
    <>
      <header id="header" className={scrolled ? 'scrolled' : ''} role="banner">
        <nav aria-label={t('Hauptnavigation', 'Main navigation')} role="navigation">
          {/* Logo — multi-line text with TM */}
          <Link to="/" className="logo-link">
            <div className="logo-text">
              <span className="logo-line-1">
                {t('Abenteuer Mieten', 'Go Iconic')}
              </span>
              <span className="logo-line-2">
                {t('Amerika', 'Way')}
                <sup style={{ fontSize: '0.65em', verticalAlign: 'super', fontWeight: 400 }}>&trade;</sup>
              </span>
            </div>
          </Link>

          {/* Desktop nav links */}
          <div className="nav-links">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="nav-link"
              >
                {locale === 'de' ? item.de : item.en}
              </a>
            ))}
          </div>

          {/* Nav actions */}
          <div className="nav-actions">
            {/* Language switcher (AMA only) */}
            {isBilingual && (
              <div className="lang-toggle" id="langToggle">
                <button
                  className={`lang-btn${locale === 'de' ? ' active' : ''}`}
                  onClick={() => setLocale('de')}
                >
                  <span className="lang-flag">&#x1F1E9;&#x1F1EA;</span> DE
                </button>
                <button
                  className={`lang-btn${locale === 'en' ? ' active' : ''}`}
                  onClick={() => setLocale('en')}
                >
                  <span className="lang-flag">&#x1F1FA;&#x1F1F8;</span> EN
                </button>
              </div>
            )}

            {/* WhatsApp CTA */}
            <LiquidMetalButton
              href={config.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              speed={0.4}
              repetition={6}
              softness={0.6}
              shiftBlue={0.4}
              scale={10}
            >
              {t('Kontakt', 'Contact Us')}
            </LiquidMetalButton>

            {/* Mobile Menu Toggle */}
            <button
              className={`mobile-menu-toggle${drawerOpen ? ' active' : ''}`}
              id="mobileMenuToggle"
              aria-label={drawerOpen ? 'Close Menu' : 'Open Menu'}
              onClick={toggleDrawer}
            >
              <span className="hamburger" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Navigation Overlay */}
      <div
        className={`mobile-nav-overlay${drawerOpen ? ' active' : ''}`}
        onClick={closeDrawer}
      />

      {/* Mobile Navigation Drawer */}
      <nav
        ref={drawerRef}
        className={`mobile-nav-drawer${drawerOpen ? ' active' : ''}`}
        aria-label="Mobile Navigation"
      >
        <div className="mobile-nav-header">
          <div className="mobile-nav-logo">
            <span style={{ display: 'block', fontSize: '0.65rem', letterSpacing: '2px', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.7)' }}>
              {t('Abenteuer Mieten', 'Go Iconic')}
            </span>
            <span style={{ display: 'block', fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>
              {t('Amerika', 'Way')}
            </span>
          </div>
          <button className="mobile-nav-close" aria-label="Close Menu" onClick={closeDrawer}>
            <i className="fas fa-times" />
          </button>
        </div>

        <div className="mobile-nav-links">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="mobile-nav-link"
              onClick={closeDrawer}
            >
              {locale === 'de' ? item.de : item.en}
            </a>
          ))}
          <a href="#app-portal" className="mobile-nav-link" onClick={closeDrawer}>
            {t('Die App', 'The App')}
          </a>
        </div>

        <div className="mobile-nav-cta">
          <a
            href={config.whatsappUrl}
            className="btn-main"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-whatsapp" />
            {' '}{t('Abenteuer Starten', 'Start Adventure')}
          </a>

          <div className="mobile-nav-contact">
            <a href={config.whatsappUrl} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-whatsapp" style={{ color: '#25D366' }} />
              <span>WhatsApp: +1 (310) 600-6624</span>
            </a>
            <a href="tel:+13239177708">
              <i className="fas fa-phone" />
              <span>{t('Büro: +1 (323) 917-7708', 'Office: +1 (323) 917-7708')}</span>
            </a>
            <a href={`mailto:${config.contactEmail}`}>
              <i className="fas fa-envelope" />
              {config.contactEmail}
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
