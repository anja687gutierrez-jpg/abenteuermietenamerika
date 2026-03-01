import { useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';

const LOOP_START = 6;
const LOOP_SPEED = 0.4;
const FADE_SPEED = 1;
const FADE_DURATION = 1.5;
const MAX_LOOPS = 2; // loop waves twice, then freeze on last frame

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
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const a = videoARef.current;
    const b = videoBRef.current;
    if (!a || !b) return;

    let active = a;
    let standby = b;
    let fading = false;
    let loopCount = 0; // tracks completed loops of the waves section

    const fadeVideoTime = FADE_DURATION * FADE_SPEED;

    standby.currentTime = LOOP_START;
    standby.style.opacity = '0';

    const onTimeUpdate = () => {
      if (fading) return;
      const remaining = active.duration - active.currentTime;

      // Last loop — just let it play to the end and freeze
      if (loopCount >= MAX_LOOPS) return;

      if (remaining <= fadeVideoTime) {
        fading = true;
        loopCount++;

        // Speed up for crossfade
        active.playbackRate = FADE_SPEED;

        // Start standby at normal speed
        standby.currentTime = LOOP_START;
        standby.playbackRate = FADE_SPEED;
        standby.play();

        const fadeStart = performance.now();

        const tick = () => {
          const elapsed = (performance.now() - fadeStart) / 1000;
          const progress = Math.min(elapsed / FADE_DURATION, 1);
          standby.style.opacity = String(progress);
          active.style.opacity = String(1 - progress);

          if (progress < 1) {
            requestAnimationFrame(tick);
          } else {
            active.pause();
            active.currentTime = LOOP_START;
            active.style.opacity = '0';
            standby.style.opacity = '1';
            standby.playbackRate = LOOP_SPEED;

            const prev = active;
            active = standby;
            standby = prev;
            fading = false;
          }
        };
        requestAnimationFrame(tick);
      }
    };

    a.addEventListener('timeupdate', onTimeUpdate);
    b.addEventListener('timeupdate', onTimeUpdate);

    return () => {
      a.removeEventListener('timeupdate', onTimeUpdate);
      b.removeEventListener('timeupdate', onTimeUpdate);
    };
  }, []);

  return (
    <section className="hero" id="home">
      <div className="hero-bg">
        {/* Desktop: Two stacked videos — crossfade at normal speed, slow loop */}
        <video
          ref={videoARef}
          className="hero-video"
          autoPlay
          muted
          playsInline
          poster="/hero-poster.jpg"
        >
          <source src="/hero-loop.mp4" type="video/mp4" />
        </video>
        <video
          ref={videoBRef}
          className="hero-video"
          muted
          playsInline
          style={{ position: 'absolute', top: 0, left: 0, opacity: 0 }}
        >
          <source src="/hero-loop.mp4" type="video/mp4" />
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
