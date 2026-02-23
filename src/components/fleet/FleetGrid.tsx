import { useLanguage } from '../../context/LanguageContext';
import { useAnalytics } from '../../hooks/useAnalytics';

// ---------------------------------------------------------------------------
// Vehicle data — matches legacy pokemon-card markup exactly
// ---------------------------------------------------------------------------

interface Stat {
  icon: string;
  de: string;
  en: string;
  width: string; // stat-bar width %
  value: string;
}

interface Equipment {
  icon: string;
  de: string;
  en: string;
  title: string;
}

interface QuickSpec {
  icon: string;
  de: string;
  en: string;
}

interface VehicleCard {
  id: string;
  type: 'adventure' | 'offroad' | 'classic';
  tierClass: string;
  tierIcon: string;
  tierLabel: { de: string; en: string };
  typeLabel: { de: string; en: string };
  typeIcon: string;
  name: string;
  price: number;
  image: string;
  stats: Stat[];
  quickSpecs: QuickSpec[];
  equipment: Equipment[];
  supercharging: { de: string; en: string };
}

const VEHICLES: VehicleCard[] = [
  {
    id: 'model_y_camping',
    type: 'adventure',
    tierClass: 'tier-gold',
    tierIcon: 'fas fa-star',
    tierLabel: { de: 'Beliebt', en: 'Popular' },
    typeLabel: { de: 'Abenteuer', en: 'Adventure' },
    typeIcon: 'fas fa-campground',
    name: 'Model Y Camping-Paket',
    price: 216,
    image: 'teslamodely_flipcard.jpg',
    stats: [
      { icon: 'fas fa-bolt', de: 'Reichweite', en: 'Range', width: '56%', value: '225 mi' },
      { icon: 'fas fa-tachometer-alt', de: '0-60', en: '0-60', width: '53%', value: '6.8s' },
      { icon: 'fas fa-charging-station', de: 'Laden', en: 'Charging', width: '70%', value: '250kW' },
      { icon: 'fas fa-box', de: 'Stauraum', en: 'Storage', width: '85%', value: '68 cu ft' },
    ],
    quickSpecs: [
      { icon: 'fas fa-user-friends', de: '5 Sitze', en: '5 Seats' },
      { icon: 'fas fa-cog', de: 'RWD', en: 'RWD' },
      { icon: 'fas fa-snowflake', de: 'Camp-Modus', en: 'Camp Mode' },
    ],
    equipment: [
      { icon: 'fas fa-campground', de: 'Dachzelt (2P)', en: 'Rooftop Tent (2P)', title: 'Thule Tepui Rooftop Tent' },
      { icon: 'fas fa-bed', de: 'Schlafmatte', en: 'Sleep Mat', title: 'Exped MegaMat Duo 10' },
      { icon: 'fas fa-snowflake', de: 'Kühlbox', en: 'Cooler', title: 'Yeti Tundra 45 Cooler' },
      { icon: 'fas fa-utensils', de: 'Kochset', en: 'Kitchen Set', title: 'Camp Kitchen Set' },
      { icon: 'fas fa-chair', de: 'Stühle x2', en: 'Chairs x2', title: 'Camping Chairs x2' },
      { icon: 'fas fa-lightbulb', de: 'Laterne', en: 'Lantern', title: 'LED Lantern' },
    ],
    supercharging: { de: 'Tesla Supercharging inklusive', en: 'Tesla Supercharging included' },
  },
  {
    id: 'cybertruck',
    type: 'offroad',
    tierClass: 'tier-platinum',
    tierIcon: 'fas fa-gem',
    tierLabel: { de: 'Premium', en: 'Premium' },
    typeLabel: { de: 'Offroad', en: 'Off-Road' },
    typeIcon: 'fas fa-mountain',
    name: 'Cybertruck Off-Grid',
    price: 299,
    image: 'cybertruck_flipcard.jpg',
    stats: [
      { icon: 'fas fa-bolt', de: 'Reichweite', en: 'Range', width: '68%', value: '340 mi' },
      { icon: 'fas fa-tachometer-alt', de: '0-60', en: '0-60', width: '90%', value: '2.6s' },
      { icon: 'fas fa-charging-station', de: 'Laden', en: 'Charging', width: '85%', value: '350kW' },
      { icon: 'fas fa-box', de: 'Stauraum', en: 'Storage', width: '95%', value: '121 cu ft' },
    ],
    quickSpecs: [
      { icon: 'fas fa-user-friends', de: '6 Sitze', en: '6 Seats' },
      { icon: 'fas fa-cog', de: 'Tri-Motor', en: 'Tri-Motor' },
      { icon: 'fas fa-plug', de: 'V2H Power', en: 'V2H Power' },
    ],
    equipment: [
      { icon: 'fas fa-campground', de: 'Dachzelt (4P)', en: 'Rooftop Tent (4P)', title: 'iKamper Skycamp 3.0' },
      { icon: 'fas fa-bed', de: 'Matratze', en: 'Mattress', title: 'Truck Bed Mattress' },
      { icon: 'fas fa-wifi', de: 'Starlink', en: 'Starlink', title: 'Starlink Mini WiFi' },
      { icon: 'fas fa-solar-panel', de: 'Solar', en: 'Solar', title: 'Portable Solar Panel' },
      { icon: 'fas fa-utensils', de: 'Kochset Pro', en: 'Kitchen Pro', title: 'Full Camp Kitchen' },
      { icon: 'fas fa-chair', de: 'Stühle x4', en: 'Chairs x4', title: 'Camping Chairs x4' },
    ],
    supercharging: { de: 'Tesla Supercharging inklusive', en: 'Tesla Supercharging included' },
  },
  {
    id: 'model_y_budget',
    type: 'classic',
    tierClass: 'tier-silver',
    tierIcon: 'fas fa-tag',
    tierLabel: { de: 'Budget', en: 'Budget' },
    typeLabel: { de: 'Klassisch', en: 'Classic' },
    typeIcon: 'fas fa-car',
    name: 'Model Y Budget',
    price: 119,
    image: 'redteslasandiego.jpg',
    stats: [
      { icon: 'fas fa-bolt', de: 'Reichweite', en: 'Range', width: '56%', value: '225 mi' },
      { icon: 'fas fa-tachometer-alt', de: '0-60', en: '0-60', width: '53%', value: '6.8s' },
      { icon: 'fas fa-charging-station', de: 'Laden', en: 'Charging', width: '70%', value: '250kW' },
      { icon: 'fas fa-box', de: 'Stauraum', en: 'Storage', width: '50%', value: '36 cu ft' },
    ],
    quickSpecs: [
      { icon: 'fas fa-user-friends', de: '5 Sitze', en: '5 Seats' },
      { icon: 'fas fa-cog', de: 'RWD', en: 'RWD' },
      { icon: 'fas fa-campground', de: 'Bodenzelt', en: 'Ground Tent' },
    ],
    equipment: [
      { icon: 'fas fa-campground', de: 'Bodenzelt (2P)', en: 'Ground Tent (2P)', title: 'REI Co-op Trail Hut 2' },
      { icon: 'fas fa-bed', de: 'Isomatte', en: 'Sleep Pad', title: 'Therm-a-Rest NeoAir' },
      { icon: 'fas fa-snowflake', de: 'Kühlbox', en: 'Cooler', title: 'Coleman Xtreme 52-Qt' },
      { icon: 'fas fa-utensils', de: 'Kochset', en: 'Kitchen Set', title: 'Basic Camp Kitchen' },
      { icon: 'fas fa-chair', de: 'Stühle x2', en: 'Chairs x2', title: 'Camping Chairs x2' },
      { icon: 'fas fa-lightbulb', de: 'Laterne', en: 'Lantern', title: 'LED Lantern' },
    ],
    supercharging: { de: 'Tesla Supercharging inklusive', en: 'Tesla Supercharging included' },
  },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function FleetGrid() {
  const { t, locale } = useLanguage();
  const { trackVehicleView } = useAnalytics();

  return (
    <section id="fleet" style={{ background: '#EAEAEC' }}>
      <div className="container">
        {/* Section header */}
        <div className="sec-head">
          <h2 className="sec-title">
            {t(
              'Klug konzipiert. Kompromisslos frei.',
              'Smartly Designed. Uncompromisingly Free.'
            )}
          </h2>
          <p className="sec-sub">
            {t(
              'Modernste Elektrofahrzeuge, ausgestattet mit Camping-Zubehör für das ultimative Erlebnis.',
              'Cutting-edge electric vehicles equipped with camping gear for the ultimate experience.'
            )}
          </p>
        </div>

        {/* Fleet grid — uses .fleet-grid from design-system.css */}
        <div className="fleet-grid">
          {VEHICLES.map((v) => (
            <div
              key={v.id}
              className="pokemon-card"
              data-type={v.type}
              onClick={() => trackVehicleView(v.name, v.price)}
            >
              {/* Header: type badge + tier badge */}
              <div className="card-header">
                <span className="card-type">
                  <i className={v.typeIcon} /> {t(v.typeLabel.de, v.typeLabel.en)}
                </span>
                <span className={`card-tier ${v.tierClass}`}>
                  <i className={v.tierIcon} /> {t(v.tierLabel.de, v.tierLabel.en)}
                </span>
              </div>

              {/* Image */}
              <div className="card-img-wrap">
                <img
                  src={`/${v.image}`}
                  className="card-img"
                  alt={v.name}
                  loading="lazy"
                  width={400}
                  height={250}
                />
              </div>

              {/* Identity: name, price, supercharging */}
              <div className="card-identity">
                <h3 className="card-name">{v.name}</h3>
                <div className="card-price">
                  <span className="price-prefix">
                    {t('ab ', 'from ')}
                  </span>
                  ${v.price}
                  <span>/{t('Tag', 'day')}</span>
                </div>
                <div className="card-supercharging">
                  <i className="fas fa-bolt" />{' '}
                  {t(v.supercharging.de, v.supercharging.en)}
                </div>
              </div>

              {/* Stat bars */}
              <div className="stats-section">
                {v.stats.map((s, i) => (
                  <div className="stat-row" key={i}>
                    <span className="stat-label">
                      <i className={s.icon} /> {t(s.de, s.en)}
                    </span>
                    <div className="stat-bar-wrap">
                      <div className="stat-bar" style={{ width: s.width }} />
                    </div>
                    <span className="stat-value">{s.value}</span>
                  </div>
                ))}
              </div>
              <div className="stats-disclaimer">
                {t(
                  '* Angaben dienen nur zur Veranschaulichung',
                  '* Specifications are for illustration only'
                )}
              </div>

              {/* Quick specs */}
              <div className="quick-specs">
                {v.quickSpecs.map((qs, i) => (
                  <div className="qs-item" key={i}>
                    <i className={qs.icon} /> {t(qs.de, qs.en)}
                  </div>
                ))}
              </div>

              {/* Equipment grid */}
              <div className="equipment-section">
                <div className="equip-header">
                  <i className="fas fa-toolbox" />{' '}
                  {t('Enthaltene Ausrüstung', 'Included Equipment')}
                </div>
                <div className="equip-grid">
                  {v.equipment.map((eq, i) => (
                    <div className="equip-item" key={i} title={eq.title}>
                      <i className={eq.icon} />
                      <span>{t(eq.de, eq.en)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Vetted Partner Seal — reinforces curation brand promise */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  padding: 'var(--space-3) var(--space-4)',
                  margin: 'var(--space-3) var(--space-4) 0',
                  background:
                    'linear-gradient(135deg, rgba(245,158,11,0.08), rgba(217,119,6,0.04))',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid rgba(245,158,11,0.2)',
                }}
              >
                <div
                  style={{
                    width: '28px',
                    height: '28px',
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
                    width="14"
                    height="14"
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
                      fontSize: 'var(--text-xs)',
                      fontWeight: 'var(--weight-semibold)' as any,
                      color: 'var(--color-amber-700)',
                      letterSpacing: 'var(--tracking-wide)',
                    }}
                  >
                    {t('Geprüft & Verifiziert', 'Vetted & Verified')}
                  </div>
                  <div
                    style={{
                      fontSize: 'var(--text-2xs)',
                      color: 'var(--color-slate-500)',
                    }}
                  >
                    Abenteuer Mieten Standard
                  </div>
                </div>
              </div>

              {/* CTA button */}
              <button
                className="rent-btn"
                data-vehicle={v.name}
                data-price={v.price}
              >
                {t('Mehr Erfahren', 'Learn More')}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
