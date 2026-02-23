import { useLanguage } from '../../context/LanguageContext';

/**
 * Founder — magazine layout with photo + 2 story cards + handwritten signature
 *
 * Uses CSS classes from design-system.css:
 *   #founder, .container, .sec-head, .sec-title, .sec-sub,
 *   .founder-magazine, .founder-photo, .founder-cards-column,
 *   .founder-card, .founder-card.blue, .founder-card-label,
 *   .founder-signature
 */
export function Founder() {
  const { t, locale } = useLanguage();

  return (
    <section id="founder">
      <div className="container">
        <div className="sec-head" style={{ marginBottom: '2.5rem' }}>
          <h2 className="sec-title">
            {t('Die Gründerin', 'Meet the Founder')}
          </h2>
          <p className="sec-sub" style={{ fontSize: '1.1rem', color: '#64748b' }}>
            {t(
              'Grenzenlos reisen. Intelligent geplant. Sicheres Ankommen.',
              'Travel without limits. Intelligently planned. Safe arrival.'
            )}
          </p>
        </div>

        <article className="founder-magazine">
          {/* Left Column: Photo */}
          <div className="founder-photo">
            <img
              src="/anja-founder.jpg"
              alt={t(
                'Anja Gutierrez - Gründerin Abenteuer Mieten Amerika Tesla Camping Buchungsplattform',
                'Anja Gutierrez - Founder Go Iconic Way Tesla Camping Booking Platform'
              )}
              loading="lazy"
              width="400"
              height="500"
            />
          </div>

          {/* Right Column: 2 Cards + Signature */}
          <div className="founder-cards-column">
            {/* Card 1: Origin + Promise (narrative arc) */}
            <div className="founder-card">
              <div className="founder-card-label">
                {t('Der Weg: Von Ostdeutschland zum Algorithmus', 'The Path: From East Germany to the Algorithm')}
              </div>
              {locale === 'de' ? (
                <>
                  <p>Ich bin in Ostdeutschland aufgewachsen und habe dort Informatik studiert, bevor ich nach Los Angeles – Santa Monica zog. Parallel lernte ich bei einer Schweizer Sightseeing-Firma, wie man erstklassige Reiseerlebnisse konzipiert. Zwei Welten, die ich später verschmelzen würde.</p>
                  <p>Als ich allein mit meinem Sohn die USA im Elektroauto durchquerte, lernte ich: Reichweitenangst ist kein Schicksal, sondern das Resultat fehlender Daten. Als Informatikerin habe ich das nicht als Risiko begriffen, sondern als logische Herausforderung — und sie gelöst.</p>
                  <p>Tausende Meilen durch die entlegensten Wüsten Amerikas haben mein System geschmiedet. Wenn ich es als Alleinerziehende sicher geschafft habe, ist das der Beweis: <strong>Sie können es auch.</strong></p>
                </>
              ) : (
                <>
                  <p>Raised in East Germany, I studied Computer Science there before moving to Los Angeles — Santa Monica. At the same time, I learned at a Swiss sightseeing firm how to design first-class travel experiences. Two worlds I would later fuse.</p>
                  <p>When I crossed the USA alone with my son in an electric car, I learned: Range anxiety isn&apos;t fate, it&apos;s the result of missing data. As a computer scientist, I understood this not as a risk, but as a logical challenge—and I solved it.</p>
                  <p>Thousands of miles through America&apos;s most remote deserts forged my system. If I made it safely as a single mother, that&apos;s the proof: <strong>So can you.</strong></p>
                </>
              )}
            </div>

            {/* Card 2: The System (product-focused) */}
            <div className="founder-card blue">
              <div className="founder-card-label">
                {t('Das System: Ihr intelligentes Buchungspaket', 'The System: Your Intelligent Booking Package')}
              </div>
              {locale === 'de' ? (
                <>
                  <p>Kein simples Mietauto — ein kuratiertes Roadtrip-Paket: Tesla, Camping-Ausrüstung, intelligente Routenplanung und persönlicher Concierge als geschlossenes System, gebucht über meine Plattform:</p>
                  <p><strong>Der digitale Co-Pilot</strong> — Unsere eigenständige App gibt der Tesla-Telemetrie eine Seele. Sie berechnet nicht nur Ladestopps — sie verwandelt jeden Kilometer in ein Erlebnis: versteckte Wasserfälle, lokale Geheimtipps, Nationalpark-Highlights. 7 KI-Reisepersönlichkeiten begleiten Sie unterwegs. Sie erleben, staunen, entdecken — und kommen garantiert an.</p>
                  <p><strong>Klausy Concierge Buddy</strong> — Ihr KI-Reisebegleiter mit logischer Datenanalyse und meiner persönlichen Erfahrung. Supercharger, Insider-Spots, Echtzeit-Backup.</p>
                  <p>Die Technik arbeitet lautlos im Hintergrund. <strong>Sie konzentrieren sich auf das Staunen — ich garantiere die Energie.</strong></p>
                </>
              ) : (
                <>
                  <p>Not a simple rental car—a curated roadtrip package: Tesla, camping gear, intelligent route planning, and personal concierge as a closed system, booked through my platform:</p>
                  <p><strong>The Digital Co-Pilot</strong> — Our standalone app gives Tesla&apos;s telemetry a soul. It doesn&apos;t just calculate charging stops — it transforms every mile into an experience: hidden waterfalls, local insider tips, national park highlights. 7 AI travel personas guide you along the way. You experience, wonder, discover — and arrive guaranteed.</p>
                  <p><strong>Klausy Concierge Buddy</strong> — Your AI travel companion with logical data analysis and my personal experience. Superchargers, insider spots, real-time backup.</p>
                  <p>The technology works silently in the background. <strong>You focus on the wonder—I guarantee the energy.</strong></p>
                </>
              )}
            </div>

            {/* Handwritten signature */}
            <div className="founder-signature" style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: '2rem',
              fontWeight: 600,
              background: 'linear-gradient(135deg, #1e3a5f, #0ea5e9)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '0.5px',
              lineHeight: 1.4,
            }}>
              ~ Anja Gutierrez
            </div>
            <p style={{
              fontStyle: 'italic',
              color: '#64748b',
              fontSize: '0.9rem',
              textAlign: 'right',
              marginTop: '-0.5rem',
            }}>
              {t(
                '„Sicherheit ist die Freiheit, nicht mehr über die Technik nachdenken zu müssen."',
                '"Security is the freedom to no longer think about the technology."'
              )}
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
