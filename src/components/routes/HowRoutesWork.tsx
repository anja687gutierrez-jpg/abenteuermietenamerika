import { useLanguage } from '../../context/LanguageContext';

// ---------------------------------------------------------------------------
// Steps for the GPS route download workflow
// ---------------------------------------------------------------------------

interface Step {
  icon: string;
  title: { de: string; en: string };
  desc: { de: string; en: string };
}

const STEPS: Step[] = [
  {
    icon: 'fas fa-map-marked-alt',
    title: { de: 'Route w\u00e4hlen', en: 'Choose a Route' },
    desc: {
      de: 'W\u00e4hlen Sie eine unserer 6 vorgeplanten Nationalpark-Routen \u2014 von 5-Tage-Kurztrips bis zum 14-Tage Route 66 Abenteuer.',
      en: 'Pick one of our 6 pre-planned National Park routes \u2014 from 5-day short trips to the 14-day Route 66 adventure.',
    },
  },
  {
    icon: 'fas fa-download',
    title: { de: 'KML herunterladen', en: 'Download KML' },
    desc: {
      de: 'Laden Sie die KML-Datei herunter und \u00f6ffnen Sie sie in Google Earth, Google Maps oder jeder GPS-App. Die Route enth\u00e4lt alle Stops und Ladestationen.',
      en: 'Download the KML file and open it in Google Earth, Google Maps, or any GPS app. The route includes all stops and charging stations.',
    },
  },
  {
    icon: 'fas fa-bolt',
    title: { de: 'Ladestopps geplant', en: 'Charging Planned' },
    desc: {
      de: 'Jede Route enth\u00e4lt Tesla Supercharger und Destination Charger entlang der Strecke. Keine Reichweitenangst.',
      en: 'Every route includes Tesla Superchargers and Destination Chargers along the way. No range anxiety.',
    },
  },
  {
    icon: 'fas fa-campground',
    title: { de: 'Losfahren & Campen', en: 'Drive & Camp' },
    desc: {
      de: 'Fahren Sie los! Ihr Tesla und die Campingausr\u00fcstung sind bereit. Campen Sie direkt an den Nationalparks.',
      en: 'Hit the road! Your Tesla and camping gear are ready. Camp right at the National Parks.',
    },
  },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function HowRoutesWork() {
  const { t } = useLanguage();

  return (
    <section
      style={{
        padding: 'var(--space-16) 0',
        background: 'var(--color-white)',
      }}
    >
      <div className="container">
        <div className="sec-head">
          <h2 className="sec-title">
            {t('So funktioniert\u2019s', 'How It Works')}
          </h2>
          <p className="sec-sub">
            {t(
              'Von der Routenwahl bis zum Campingplatz \u2014 in 4 einfachen Schritten.',
              'From route selection to campsite \u2014 in 4 simple steps.'
            )}
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 'var(--space-6)',
            maxWidth: '1000px',
            margin: '0 auto',
          }}
        >
          {STEPS.map((step, i) => (
            <div
              key={i}
              style={{
                textAlign: 'center',
                padding: 'var(--space-6)',
              }}
            >
              {/* Step number + icon */}
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: 'var(--radius-xl)',
                  background: 'var(--gradient-emerald-sky)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 'var(--space-4)',
                  position: 'relative',
                }}
              >
                <i
                  className={step.icon}
                  style={{ fontSize: '1.5rem', color: 'var(--color-white)' }}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '-6px',
                    right: '-6px',
                    width: '22px',
                    height: '22px',
                    borderRadius: 'var(--radius-circle)',
                    background: 'var(--color-slate-900)',
                    color: 'var(--color-white)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 'var(--weight-bold)' as any,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {i + 1}
                </span>
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-2xl)',
                  fontWeight: 'var(--weight-bold)' as any,
                  color: 'var(--color-text-primary)',
                  marginBottom: 'var(--space-2)',
                }}
              >
                {t(step.title.de, step.title.en)}
              </h3>
              <p
                style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-text-muted)',
                  lineHeight: 'var(--leading-relaxed)',
                  margin: 0,
                }}
              >
                {t(step.desc.de, step.desc.en)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
