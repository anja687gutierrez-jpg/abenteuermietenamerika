import { useLanguage } from '../../context/LanguageContext';

/**
 * ValueProposition (Concept) — 3 agency cards
 *
 * Uses CSS classes from design-system.css:
 *   .container, .agency-grid, .agency-card
 */
export function ValueProposition() {
  const { t } = useLanguage();

  return (
    <section id="concept" style={{ paddingTop: '2rem' }}>
      <div className="container">
        <div className="agency-grid">
          <div className="agency-card">
            <i className="fas fa-user-check" />
            <h3>{t('Geprüfte Partner', 'Vetted Partners')}</h3>
            <p>
              {t(
                'Jeder unserer Mietpartner wird sorgfältig ausgewählt und geprüft. Nur die besten lokalen Tesla-Besitzer mit erstklassigen Fahrzeugen und perfekten Bewertungen.',
                'Every rental partner is carefully selected and vetted. Only the best local Tesla owners with top-tier vehicles and perfect ratings.'
              )}
            </p>
          </div>
          <div className="agency-card">
            <i className="fas fa-mobile-alt" />
            <h3>{t('KI-Routenplaner', 'AI Route Planner')}</h3>
            <p>
              {t(
                'Unser Vorteil ist Software. Jeder Kunde erhält Zugang zu unserer KI-basierten Routing-App für perfekte Ladestopps und optimale Reiserouten.',
                'Our advantage is software. Every customer gets access to our AI-based routing app for perfect charging stops and optimal travel routes.'
              )}
            </p>
          </div>
          <div className="agency-card">
            <i className="fas fa-headset" />
            <h3>{t('Persönlicher Service', 'Personal Service')}</h3>
            <p>
              {t(
                '24/7 Support auf Deutsch und Englisch. Wir begleiten Sie von der Buchung bis zur Rückgabe – Ihr persönlicher Concierge für den perfekten Roadtrip.',
                '24/7 support in German and English. We accompany you from booking to return – your personal concierge for the perfect road trip.'
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
