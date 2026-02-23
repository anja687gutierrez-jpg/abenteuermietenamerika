import { useState, useCallback } from 'react';
import { useLanguage } from '../../context/LanguageContext';

// ---------------------------------------------------------------------------
// FAQ data — from legacy JSON-LD schema (9 Q&A pairs)
// ---------------------------------------------------------------------------

interface FaqItem {
  q: { de: string; en: string };
  a: { de: string; en: string };
}

const FAQ_ITEMS: FaqItem[] = [
  {
    q: {
      de: 'Was ist im Tesla Camping Mietpreis enthalten?',
      en: 'What is included in the Tesla Camping rental price?',
    },
    a: {
      de: 'Im Buchungspreis enthalten: Campingausr\u00fcstung (Dachzelt/Bodenzelt, Schlafmatte, K\u00fchlbox, Kochset, St\u00fchle), Versicherung, Tesla Supercharging, KI-Routenplaner App und Concierge Support ab $119/Tag. Zus\u00e4tzlich: Kaution $250 (wird erstattet), Reinigung $50-150 bei Bedarf, Maut/Parkgeb\u00fchren selbst.',
      en: 'Included in the booking price: Camping equipment (rooftop/ground tent, sleeping pad, cooler, kitchen set, chairs), insurance, Tesla Supercharging, AI route planner app, and concierge support from $119/day. Additional: $250 refundable deposit, $50-150 cleaning fee if needed, tolls/parking separate.',
    },
  },
  {
    q: {
      de: 'Was ist die KI-Routenplaner App?',
      en: 'What is the AI Route Planner App?',
    },
    a: {
      de: 'Unsere exklusive Tour Guide App plant automatisch optimale Routen mit Ladestopps, zeigt versteckte Campingpl\u00e4tze und Nationalpark-Highlights. Die App arbeitet mit der Tesla-Telemetrie zusammen und funktioniert auch offline.',
      en: 'Our exclusive tour guide app automatically plans optimal routes with charging stops, shows hidden campsites and National Park highlights. The app works with Tesla telemetry and functions offline.',
    },
  },
  {
    q: {
      de: 'Was bietet der Concierge Service?',
      en: 'What does the Concierge Service offer?',
    },
    a: {
      de: 'Unser deutschsprachiger Concierge Service steht Ihnen 24/7 zur Verf\u00fcgung \u2013 vor, w\u00e4hrend und nach Ihrer Reise. Wir helfen bei Routenplanung, Campingplatz-Reservierungen, Notf\u00e4llen und allen Fragen rund um Ihren USA Roadtrip.',
      en: 'Our bilingual concierge service is available 24/7 \u2013 before, during, and after your trip. We help with route planning, campsite reservations, emergencies, and all questions about your USA road trip.',
    },
  },
  {
    q: {
      de: 'Ist das Tesla Supercharging wirklich kostenlos?',
      en: 'Is Tesla Supercharging really free?',
    },
    a: {
      de: 'Ja! Die Nutzung des Tesla Supercharger-Netzwerks ist im Buchungspreis enthalten. Hinweis: Dies gilt nur f\u00fcr offizielle Tesla Supercharger \u2013 Drittanbieter-Ladestationen (z.B. Electrify America, ChargePoint) sind nicht inklusive.',
      en: 'Yes! Tesla Supercharger network usage is included in the booking price. Note: This only applies to official Tesla Superchargers \u2013 third-party charging stations (e.g. Electrify America, ChargePoint) are not included.',
    },
  },
  {
    q: {
      de: 'Wie weit kann ich mit einem Tesla fahren?',
      en: 'How far can I drive with a Tesla?',
    },
    a: {
      de: 'Der Tesla Model Y hat eine Reichweite von ca. 330 Meilen (530 km), der Cybertruck ca. 340 Meilen (547 km). Mit dem dichten Tesla Supercharger-Netzwerk und unserer KI-App f\u00fcr optimale Ladestopps ist Reichweitenangst kein Thema.',
      en: 'The Tesla Model Y has a range of approx. 330 miles (530 km), the Cybertruck approx. 340 miles (547 km). With the dense Tesla Supercharger network and our AI app for optimal charging stops, range anxiety is not an issue.',
    },
  },
  {
    q: {
      de: 'Welche Nationalpark-Routen gibt es?',
      en: 'What National Park routes are available?',
    },
    a: {
      de: 'Wir bieten 6 vorgeplante Routen: Grand Circle (Grand Canyon, Zion, Bryce), Route 66, Rocky Mountains (Yellowstone, Grand Teton), Pacific Coast Highway, San Diego Desert Loop und Lake Michigan. Alle mit KML-Dateien f\u00fcr Google Earth.',
      en: 'We offer 6 pre-planned routes: Grand Circle (Grand Canyon, Zion, Bryce), Route 66, Rocky Mountains (Yellowstone, Grand Teton), Pacific Coast Highway, San Diego Desert Loop, and Lake Michigan. All with KML files for Google Earth.',
    },
  },
  {
    q: {
      de: 'Kann ich die Route 66 mit dem Tesla fahren?',
      en: 'Can I drive Route 66 with a Tesla?',
    },
    a: {
      de: 'Ja! Unsere 14-t\u00e4gige Route 66 Tour f\u00fchrt von Chicago nach Santa Monica \u2013 3.940 km amerikanische Geschichte. Die Route ist in 2 KML-Dateien aufgeteilt (Chicago\u2192Oklahoma, Oklahoma\u2192LA) f\u00fcr Google Earth. Das Tesla Supercharger-Netzwerk deckt die gesamte Strecke ab.',
      en: 'Yes! Our 14-day Route 66 tour goes from Chicago to Santa Monica \u2013 2,400 miles of American history. The route is split into 2 KML files (Chicago\u2192Oklahoma, Oklahoma\u2192LA) for Google Earth. The Tesla Supercharger network covers the entire route.',
    },
  },
  {
    q: {
      de: 'Wo kann ich den Tesla abholen?',
      en: 'Where can I pick up the Tesla?',
    },
    a: {
      de: 'Abholung ist m\u00f6glich in Las Vegas (LAS), Los Angeles (LAX) und San Francisco (SFO). Las Vegas ist ideal f\u00fcr Grand Canyon, Zion und weitere Nationalpark-Routen im S\u00fcdwesten.',
      en: 'Pickup is available in Las Vegas (LAS), Los Angeles (LAX), and San Francisco (SFO). Las Vegas is ideal for Grand Canyon, Zion, and other National Park routes in the Southwest.',
    },
  },
  {
    q: {
      de: 'Ist eine Versicherung inklusive?',
      en: 'Is insurance included?',
    },
    a: {
      de: 'Ja, eine umfassende Versicherung ist im Buchungspreis enthalten. Zus\u00e4tzlich fallen an: Kaution ($250, wird erstattet), eventuelle Reinigungsgeb\u00fchren ($50-150). Mautgeb\u00fchren und Parkkosten tr\u00e4gt der Kunde. Details in unseren AGB.',
      en: 'Yes, comprehensive insurance is included in the booking price. Additional costs: $250 refundable deposit, potential cleaning fees ($50-150). Tolls and parking are paid by the customer. Details in our terms.',
    },
  },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function FaqAccordion() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = useCallback((i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  }, []);

  return (
    <section id="faq" style={{ padding: 'var(--space-16) 0' }}>
      <div className="container">
        <div className="sec-head">
          <h2 className="sec-title">
            {t('H\u00e4ufige Fragen', 'Frequently Asked Questions')}
          </h2>
          <p className="sec-sub">
            {t(
              'Alles, was Sie vor Ihrer Buchung wissen m\u00fcssen.',
              'Everything you need to know before booking.'
            )}
          </p>
        </div>

        <div
          style={{
            maxWidth: '800px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-3)',
          }}
        >
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                style={{
                  background: 'var(--color-white)',
                  borderRadius: 'var(--radius-xl)',
                  border: '1px solid var(--color-border-light)',
                  overflow: 'hidden',
                  boxShadow: isOpen ? 'var(--shadow-card)' : 'var(--shadow-xs)',
                  transition: 'box-shadow var(--duration-fast) ease',
                }}
              >
                <button
                  onClick={() => toggle(i)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 'var(--space-5) var(--space-6)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-lg)',
                    fontWeight: 'var(--weight-semibold)' as any,
                    color: 'var(--color-text-primary)',
                    textAlign: 'left',
                    gap: 'var(--space-4)',
                  }}
                >
                  <span>{t(item.q.de, item.q.en)}</span>
                  <i
                    className="fas fa-chevron-down"
                    style={{
                      fontSize: 'var(--text-sm)',
                      color: 'var(--color-text-muted)',
                      transition: 'transform var(--duration-fast) ease',
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      flexShrink: 0,
                    }}
                  />
                </button>
                <div
                  style={{
                    maxHeight: isOpen ? '300px' : '0',
                    overflow: 'hidden',
                    transition:
                      'max-height var(--duration-normal) ease, padding var(--duration-normal) ease',
                    padding: isOpen
                      ? '0 var(--space-6) var(--space-5)'
                      : '0 var(--space-6) 0',
                  }}
                >
                  <p
                    style={{
                      fontSize: 'var(--text-base)',
                      lineHeight: 'var(--leading-relaxed)',
                      color: 'var(--color-text-muted)',
                      margin: 0,
                    }}
                  >
                    {t(item.a.de, item.a.en)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
