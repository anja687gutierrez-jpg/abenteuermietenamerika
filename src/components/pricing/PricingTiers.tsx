import { useLanguage } from '../../context/LanguageContext';

// ---------------------------------------------------------------------------
// Pricing tier data — the 3 vehicle tiers as pricing cards
// ---------------------------------------------------------------------------

interface IncludedItem {
  icon: string;
  de: string;
  en: string;
}

interface PricingTier {
  id: string;
  name: string;
  tagline: { de: string; en: string };
  price: number;
  tierClass: string;
  tierLabel: { de: string; en: string };
  color: string;
  gradient: string;
  included: IncludedItem[];
  extras: IncludedItem[];
}

const TIERS: PricingTier[] = [
  {
    id: 'budget',
    name: 'Model Y Budget',
    tagline: {
      de: 'Perfekt f\u00fcr Sparfuchs-Abenteurer',
      en: 'Perfect for budget adventurers',
    },
    price: 119,
    tierClass: 'tier-silver',
    tierLabel: { de: 'Budget', en: 'Budget' },
    color: 'var(--color-slate-500)',
    gradient: 'linear-gradient(135deg, var(--color-slate-500), var(--color-slate-400))',
    included: [
      { icon: 'fas fa-car', de: 'Tesla Model Y (RWD)', en: 'Tesla Model Y (RWD)' },
      { icon: 'fas fa-campground', de: '4P Bodenzelt', en: '4P Ground Tent' },
      { icon: 'fas fa-bed', de: 'Schlafs\u00e4cke', en: 'Sleeping Bags' },
      { icon: 'fas fa-utensils', de: 'Campingkocher', en: 'Camp Stove' },
      { icon: 'fas fa-snowflake', de: 'K\u00fchlbox 30L', en: 'Cooler 30L' },
      { icon: 'fas fa-bolt', de: 'Tesla Supercharging', en: 'Tesla Supercharging' },
      { icon: 'fas fa-shield-alt', de: 'Versicherung inkl.', en: 'Insurance Incl.' },
      { icon: 'fas fa-headset', de: '24/7 Concierge', en: '24/7 Concierge' },
    ],
    extras: [
      { icon: 'fas fa-chair', de: 'Campingst\u00fchle', en: 'Camp Chairs' },
      { icon: 'fas fa-first-aid', de: 'Erste-Hilfe-Set', en: 'First Aid Kit' },
    ],
  },
  {
    id: 'comfort',
    name: 'Model Y Camping-Paket',
    tagline: {
      de: 'Unser Bestseller \u2014 Komfort trifft Abenteuer',
      en: 'Our bestseller \u2014 comfort meets adventure',
    },
    price: 216,
    tierClass: 'tier-gold',
    tierLabel: { de: 'Beliebt', en: 'Popular' },
    color: 'var(--color-emerald-600)',
    gradient: 'var(--gradient-emerald)',
    included: [
      { icon: 'fas fa-car', de: 'Tesla Model Y (RWD)', en: 'Tesla Model Y (RWD)' },
      { icon: 'fas fa-campground', de: 'Thule Dachzelt (2P)', en: 'Thule Rooftop Tent (2P)' },
      { icon: 'fas fa-bed', de: 'Exped MegaMat Duo', en: 'Exped MegaMat Duo' },
      { icon: 'fas fa-snowflake', de: 'Yeti Tundra 45 K\u00fchlbox', en: 'Yeti Tundra 45 Cooler' },
      { icon: 'fas fa-utensils', de: 'Camp K\u00fcchen-Set', en: 'Camp Kitchen Set' },
      { icon: 'fas fa-bolt', de: 'Tesla Supercharging', en: 'Tesla Supercharging' },
      { icon: 'fas fa-shield-alt', de: 'Versicherung inkl.', en: 'Insurance Incl.' },
      { icon: 'fas fa-headset', de: '24/7 Concierge', en: '24/7 Concierge' },
      { icon: 'fas fa-mobile-alt', de: 'KI-Routenplaner App', en: 'AI Route Planner App' },
    ],
    extras: [
      { icon: 'fas fa-chair', de: 'Campingst\u00fchle x2', en: 'Camp Chairs x2' },
      { icon: 'fas fa-lightbulb', de: 'LED Laterne', en: 'LED Lantern' },
    ],
  },
  {
    id: 'offgrid',
    name: 'Cybertruck Off-Grid',
    tagline: {
      de: 'Maximale Freiheit \u2014 f\u00fcr ernsthafte Entdecker',
      en: 'Maximum freedom \u2014 for serious explorers',
    },
    price: 299,
    tierClass: 'tier-platinum',
    tierLabel: { de: 'Premium', en: 'Premium' },
    color: 'var(--color-amber-500)',
    gradient: 'var(--gradient-amber)',
    included: [
      { icon: 'fas fa-truck-monster', de: 'Tesla Cybertruck (Tri-Motor)', en: 'Tesla Cybertruck (Tri-Motor)' },
      { icon: 'fas fa-campground', de: 'iKamper Dachzelt (4P)', en: 'iKamper Rooftop Tent (4P)' },
      { icon: 'fas fa-wifi', de: 'Starlink Internet', en: 'Starlink Internet' },
      { icon: 'fas fa-solar-panel', de: 'Solar-Panel', en: 'Solar Panel' },
      { icon: 'fas fa-car-battery', de: 'Jackery 1500 Powerstation', en: 'Jackery 1500 Power Station' },
      { icon: 'fas fa-snowflake', de: 'Dometic K\u00fchlschrank 55L', en: 'Dometic Fridge 55L' },
      { icon: 'fas fa-bolt', de: 'Tesla Supercharging', en: 'Tesla Supercharging' },
      { icon: 'fas fa-shield-alt', de: 'Versicherung inkl.', en: 'Insurance Incl.' },
      { icon: 'fas fa-headset', de: '24/7 Concierge', en: '24/7 Concierge' },
      { icon: 'fas fa-mobile-alt', de: 'KI-Routenplaner App', en: 'AI Route Planner App' },
      { icon: 'fas fa-plug', de: 'V2H Stromversorgung', en: 'V2H Power Supply' },
    ],
    extras: [
      { icon: 'fas fa-tools', de: 'Bergungs-Kit', en: 'Recovery Kit' },
      { icon: 'fas fa-chair', de: 'Campingst\u00fchle x4', en: 'Camp Chairs x4' },
    ],
  },
];

// ---------------------------------------------------------------------------
// Additional fees (shared across all tiers)
// ---------------------------------------------------------------------------

const FEES = [
  { de: '$139 einmalige Servicegeb\u00fchr (Fahrzeugvorbereitung, Ausr\u00fcstung, Reinigung, App)', en: '$139 one-time service fee (vehicle prep, equipment, cleaning, app)' },
  { de: '$250 Kaution (wird erstattet)', en: '$250 refundable deposit' },
  { de: 'Reinigung $50-150 bei Bedarf', en: 'Cleaning $50-150 if needed' },
  { de: 'Maut & Parkgeb\u00fchren tr\u00e4gt der Kunde', en: 'Tolls & parking paid by customer' },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function PricingTiers() {
  const { t } = useLanguage();

  return (
    <section
      id="pricing"
      style={{
        background: 'var(--color-slate-50)',
        padding: 'var(--space-16) 0',
      }}
    >
      <div className="container">
        <div className="sec-head">
          <h2 className="sec-title">
            {t('Preise & Pakete', 'Pricing & Packages')}
          </h2>
          <p className="sec-sub">
            {t(
              'W\u00e4hlen Sie das perfekte Paket f\u00fcr Ihr Abenteuer. Alle Preise inklusive Versicherung & Supercharging.',
              'Choose the perfect package for your adventure. All prices include insurance & Supercharging.'
            )}
          </p>
        </div>

        {/* Tier cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'var(--space-6)',
            maxWidth: '1100px',
            margin: '0 auto',
          }}
        >
          {TIERS.map((tier) => {
            const isPopular = tier.id === 'comfort';
            return (
              <div
                key={tier.id}
                style={{
                  background: 'var(--color-white)',
                  borderRadius: 'var(--radius-2xl)',
                  border: isPopular
                    ? '2px solid var(--color-emerald-400)'
                    : '1px solid var(--color-border-light)',
                  overflow: 'hidden',
                  boxShadow: isPopular
                    ? '0 20px 60px rgba(16, 185, 129, 0.15)'
                    : 'var(--shadow-card)',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Popular badge */}
                {isPopular && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 'var(--space-4)',
                      right: 'var(--space-4)',
                      padding: 'var(--space-1) var(--space-3)',
                      borderRadius: 'var(--radius-pill)',
                      background: 'var(--gradient-emerald)',
                      color: 'var(--color-white)',
                      fontSize: 'var(--text-xs)',
                      fontWeight: 'var(--weight-bold)' as any,
                      letterSpacing: 'var(--tracking-wider)',
                      textTransform: 'uppercase' as const,
                    }}
                  >
                    {t('Bestseller', 'Bestseller')}
                  </div>
                )}

                {/* Header */}
                <div
                  style={{
                    padding: 'var(--space-8) var(--space-6) var(--space-4)',
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      fontSize: 'var(--text-sm)',
                      fontWeight: 'var(--weight-semibold)' as any,
                      color: tier.color,
                      textTransform: 'uppercase' as const,
                      letterSpacing: 'var(--tracking-wider)',
                      marginBottom: 'var(--space-2)',
                    }}
                  >
                    {t(tier.tierLabel.de, tier.tierLabel.en)}
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--text-3xl)',
                      fontWeight: 'var(--weight-bold)' as any,
                      color: 'var(--color-text-primary)',
                      margin: '0 0 var(--space-1)',
                    }}
                  >
                    {tier.name}
                  </h3>
                  <p
                    style={{
                      fontSize: 'var(--text-sm)',
                      color: 'var(--color-text-muted)',
                      margin: '0 0 var(--space-4)',
                    }}
                  >
                    {t(tier.tagline.de, tier.tagline.en)}
                  </p>

                  {/* Price */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      justifyContent: 'center',
                      gap: 'var(--space-1)',
                    }}
                  >
                    <span
                      style={{
                        fontSize: 'var(--text-sm)',
                        color: 'var(--color-text-muted)',
                      }}
                    >
                      {t('ab', 'from')}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'var(--text-7xl)',
                        fontWeight: 'var(--weight-extrabold)' as any,
                        color: 'var(--color-text-primary)',
                        lineHeight: 1,
                      }}
                    >
                      ${tier.price}
                    </span>
                    <span
                      style={{
                        fontSize: 'var(--text-base)',
                        color: 'var(--color-text-muted)',
                      }}
                    >
                      /{t('Tag', 'day')}
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <div
                  style={{
                    height: '1px',
                    background: 'var(--color-border-light)',
                    margin: '0 var(--space-6)',
                  }}
                />

                {/* Included items */}
                <div
                  style={{
                    padding: 'var(--space-5) var(--space-6)',
                    flex: 1,
                  }}
                >
                  <div
                    style={{
                      fontSize: 'var(--text-xs)',
                      fontWeight: 'var(--weight-bold)' as any,
                      color: 'var(--color-text-muted)',
                      textTransform: 'uppercase' as const,
                      letterSpacing: 'var(--tracking-wider)',
                      marginBottom: 'var(--space-3)',
                    }}
                  >
                    {t('Inklusive', 'Included')}
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {tier.included.map((item, i) => (
                      <li
                        key={i}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 'var(--space-3)',
                          padding: 'var(--space-2) 0',
                          fontSize: 'var(--text-base)',
                          color: 'var(--color-text-primary)',
                        }}
                      >
                        <i
                          className={item.icon}
                          style={{
                            width: '18px',
                            textAlign: 'center',
                            color: 'var(--color-emerald-500)',
                            fontSize: 'var(--text-sm)',
                          }}
                        />
                        {t(item.de, item.en)}
                      </li>
                    ))}
                  </ul>

                  {/* Extras */}
                  {tier.extras.length > 0 && (
                    <>
                      <div
                        style={{
                          fontSize: 'var(--text-xs)',
                          fontWeight: 'var(--weight-bold)' as any,
                          color: 'var(--color-text-muted)',
                          textTransform: 'uppercase' as const,
                          letterSpacing: 'var(--tracking-wider)',
                          marginTop: 'var(--space-4)',
                          marginBottom: 'var(--space-2)',
                        }}
                      >
                        {t('Bonus', 'Bonus')}
                      </div>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        {tier.extras.map((item, i) => (
                          <li
                            key={i}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 'var(--space-3)',
                              padding: 'var(--space-1) 0',
                              fontSize: 'var(--text-sm)',
                              color: 'var(--color-text-muted)',
                            }}
                          >
                            <i
                              className={item.icon}
                              style={{
                                width: '18px',
                                textAlign: 'center',
                                color: 'var(--color-teal-400)',
                                fontSize: 'var(--text-xs)',
                              }}
                            />
                            {t(item.de, item.en)}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>

                {/* CTA */}
                <div style={{ padding: '0 var(--space-6) var(--space-6)' }}>
                  <a
                    href="#booking-bar"
                    style={{
                      display: 'block',
                      textAlign: 'center',
                      padding: 'var(--space-3) var(--space-6)',
                      borderRadius: 'var(--radius-pill)',
                      background: isPopular
                        ? 'var(--gradient-emerald)'
                        : 'var(--color-slate-900)',
                      color: 'var(--color-white)',
                      textDecoration: 'none',
                      fontWeight: 'var(--weight-semibold)' as any,
                      fontSize: 'var(--text-base)',
                      transition:
                        'transform var(--duration-fast) ease, box-shadow var(--duration-fast) ease',
                    }}
                  >
                    {t('Jetzt buchen', 'Book Now')}
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional fees notice */}
        <div
          style={{
            maxWidth: '700px',
            margin: 'var(--space-8) auto 0',
            padding: 'var(--space-5) var(--space-6)',
            background: 'var(--color-white)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--color-border-light)',
          }}
        >
          <div
            style={{
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--weight-bold)' as any,
              color: 'var(--color-text-primary)',
              marginBottom: 'var(--space-3)',
            }}
          >
            {t('Zus\u00e4tzliche Geb\u00fchren', 'Additional Fees')}
          </div>
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-2)',
            }}
          >
            {FEES.map((fee, i) => (
              <li
                key={i}
                style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                }}
              >
                <span style={{ color: 'var(--color-slate-400)' }}>\u2022</span>
                {t(fee.de, fee.en)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
