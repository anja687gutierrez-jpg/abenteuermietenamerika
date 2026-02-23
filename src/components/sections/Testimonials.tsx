import { useLanguage } from '../../context/LanguageContext';

/**
 * Testimonials — 3 review cards with client photos
 *
 * Uses CSS classes from design-system.css:
 *   #testimonials, .container, .sec-head, .sec-title, .sec-sub,
 *   .testimonials-grid, .testimonial-card, .avatar-wrapper,
 *   .avatar-img, .testimonial-content, .testimonial-quote,
 *   .author-info
 */

interface Testimonial {
  img: string;
  alt: string;
  quote: { de: string; en: string };
  name: string;
  detail: { de: string; en: string };
}

const TESTIMONIALS: Testimonial[] = [
  {
    img: '/tesla_red_client.jpg',
    alt: 'Remo M. Kundenbewertung Tesla Model Y Camping USA',
    quote: {
      de: 'Wir sind große Fans von Nachhaltigkeit. Dieses E-Auto hat unseren Roadtrip unglaublich erschwinglich und unkompliziert gemacht!',
      en: 'We are big fans of sustainability. This EV made our road trip incredibly affordable and hassle-free!',
    },
    name: 'Remo M.',
    detail: { de: 'Schweiz \u2022 Tesla Model Y', en: 'Switzerland \u2022 Tesla Model Y' },
  },
  {
    img: '/cybertruckreview.jpg',
    alt: 'Katja L. Kundenbewertung Tesla Cybertruck Camping',
    quote: {
      de: 'Amerika mit dem Cybertruck zu bereisen war ein einzigartiges Abenteuer. Wir fühlten uns bereit für jedes Terrain!',
      en: 'Traveling America with the Cybertruck was a unique adventure. We felt ready for any terrain!',
    },
    name: 'Katja L.',
    detail: { de: 'Deutschland \u2022 Tesla Cybertruck', en: 'Germany \u2022 Tesla Cybertruck' },
  },
  {
    img: '/anna_testamony.jpg',
    alt: 'Anna S. Kundenbewertung Tesla Model Y USA Roadtrip',
    quote: {
      de: 'Fantastische Reise entlang des Pacific Coast Highway! Der Tesla war perfekt für unser Abenteuer. Sehr empfehlenswert!',
      en: 'Fantastic trip along the Pacific Coast Highway! The Tesla was perfect for our adventure. Highly recommended!',
    },
    name: 'Anna S.',
    detail: { de: 'Dänemark \u2022 Tesla Model Y', en: 'Denmark \u2022 Tesla Model Y' },
  },
];

export function Testimonials() {
  const { t, locale } = useLanguage();

  return (
    <section id="testimonials">
      <div className="container">
        <div className="sec-head">
          <h2 className="sec-title">
            {t('Kundenbewertungen', 'Customer Reviews')}
          </h2>
          <p className="sec-sub">
            {t(
              'Geschichten von Reisenden, die Amerika mit E-Autos über unsere Plattform erkundet haben.',
              'Stories from travelers who explored America with EVs booked through our platform.'
            )}
          </p>
        </div>
        <div className="testimonials-grid">
          {TESTIMONIALS.map((item) => (
            <div className="testimonial-card" key={item.name}>
              <div className="avatar-wrapper">
                <img
                  src={item.img}
                  className="avatar-img"
                  alt={item.alt}
                  loading="lazy"
                />
              </div>
              <div className="testimonial-content">
                <p className="testimonial-quote">
                  {locale === 'de' ? item.quote.de : item.quote.en}
                </p>
                <div className="author-info">
                  <h4>{item.name}</h4>
                  <p>{locale === 'de' ? item.detail.de : item.detail.en}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
