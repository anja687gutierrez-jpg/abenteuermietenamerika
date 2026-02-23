import { Helmet } from '@vuer-ai/react-helmet-async';
import { useLanguage } from '../context/LanguageContext';
import type { SiteConfig } from '../context/LanguageContext';

/**
 * SEO Engine — Unified for AMA & GIW
 *
 * Injects per-route <head> tags during SSG pre-rendering:
 *   - Primary meta tags (title, description, robots)
 *   - Open Graph (Facebook / iMessage / WhatsApp)
 *   - Twitter Card
 *   - Canonical + hreflang
 *   - Geographic meta tags (Local SEO — Las Vegas)
 *   - JSON-LD structured data (5 schemas)
 *
 * All values driven by LanguageContext — works for both
 * AMA (abenteuermietenamerika.de) and GIW (goiconicway.com).
 */

// ---------------------------------------------------------------------------
// Per-route SEO data — bilingual
// ---------------------------------------------------------------------------

interface PageSEO {
  title: { de: string; en: string };
  description: { de: string; en: string };
  path: string;
  ogTitle?: { de: string; en: string };
  ogDescription?: { de: string; en: string };
}

const PAGE_SEO: Record<string, PageSEO> = {
  '/': {
    title: {
      de: 'Tesla Roadtrip-Paket USA | Abenteuer Mieten Amerika - Ihre Buchungsplattform',
      en: 'Tesla Road Trip Package USA | Go Iconic Way - Your Booking Platform',
    },
    description: {
      de: 'Buchen Sie Ihr Tesla Roadtrip-Paket in den USA! Wir vermitteln vollelektrische Fahrzeuge mit Camping-Ausrüstung, Versicherung & Supercharging. KI-Routenplaner & vorgeplante Routen: Route 66, Grand Canyon, Yellowstone. Ab $119/Tag.',
      en: 'Book your Tesla road trip package in the USA! We broker all-electric vehicles with camping gear, insurance & Supercharging. AI route planner & pre-planned routes: Route 66, Grand Canyon, Yellowstone. From $119/day.',
    },
    path: '/',
    ogTitle: {
      de: 'Tesla Camping Roadtrip USA | Abenteuer Mieten Amerika',
      en: 'Tesla Camping Road Trip USA | Go Iconic Way',
    },
    ogDescription: {
      de: 'Buchen Sie Ihr Tesla Roadtrip-Paket! Wir vermitteln Fahrzeuge mit Camping-Ausrüstung, Versicherung & Supercharging. Route 66, Grand Canyon, Yellowstone. Ab $119/Tag.',
      en: 'Book your Tesla road trip package! We broker vehicles with camping gear, insurance & Supercharging. Route 66, Grand Canyon, Yellowstone. From $119/day.',
    },
  },
  '/flotte': {
    title: {
      de: 'Tesla Flotte | Model Y, Cybertruck & Model 3 | Abenteuer Mieten',
      en: 'Tesla Fleet | Model Y, Cybertruck & Model 3 | Go Iconic Way',
    },
    description: {
      de: 'Unsere Tesla-Flotte: Model Y Camping-Paket ab $149/Tag, Cybertruck Off-Grid ab $299/Tag, Model Y Budget ab $119/Tag. Alle mit Camping-Ausrüstung, Versicherung & Supercharging.',
      en: 'Our Tesla fleet: Model Y Camping Package from $149/day, Cybertruck Off-Grid from $299/day, Model Y Budget from $119/day. All with camping gear, insurance & Supercharging.',
    },
    path: '/flotte',
  },
  '/routen': {
    title: {
      de: 'Nationalpark-Routen | Route 66, Grand Canyon, Yellowstone | Abenteuer Mieten',
      en: 'National Park Routes | Route 66, Grand Canyon, Yellowstone | Go Iconic Way',
    },
    description: {
      de: '6 vorgeplante Tesla-Routen: Grand Circle, Route 66, Rocky Mountains, Pacific Coast Highway, San Diego Desert Loop, Lake Michigan. KML-Dateien für Google Earth inklusive.',
      en: '6 pre-planned Tesla routes: Grand Circle, Route 66, Rocky Mountains, Pacific Coast Highway, San Diego Desert Loop, Lake Michigan. KML files for Google Earth included.',
    },
    path: '/routen',
  },
  '/preise': {
    title: {
      de: 'Preise & Pakete | Ab $119/Tag | Tesla Camping Roadtrip | Abenteuer Mieten',
      en: 'Pricing & Packages | From $119/day | Tesla Camping Road Trip | Go Iconic Way',
    },
    description: {
      de: 'Tesla Roadtrip-Pakete ab $119/Tag. Budget, Comfort & Off-Grid Pakete. Camping-Ausrüstung, Versicherung, Supercharging & KI-Routenplaner App inklusive. Jetzt buchen.',
      en: 'Tesla road trip packages from $119/day. Budget, Comfort & Off-Grid packages. Camping gear, insurance, Supercharging & AI route planner app included. Book now.',
    },
    path: '/preise',
  },
};

// ---------------------------------------------------------------------------
// JSON-LD Schema builders (config-driven)
// ---------------------------------------------------------------------------

function buildSchemaLocalBusiness(cfg: SiteConfig, locale: string) {
  const isDE = locale === 'de';
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${cfg.siteUrl}/#organization`,
    name: cfg.siteName,
    alternateName: 'Iconic Pathways',
    description: isDE
      ? 'Tesla Roadtrip-Paket buchen in Las Vegas - Ihre Buchungsplattform für Camping-Roadtrips mit Ausrüstung, Versicherung & Supercharging. KI-Routenplaner App, Concierge Service & vorgeplante Nationalpark-Touren. Model Y & Cybertruck.'
      : 'Book your Tesla road trip package in Las Vegas - Your booking platform for camping road trips with gear, insurance & Supercharging. AI route planner app, Concierge Service & pre-planned National Park tours. Model Y & Cybertruck.',
    slogan: isDE
      ? 'Tesla Camping Roadtrips - Sorgenfrei Reisen'
      : 'Tesla Camping Road Trips - Travel Worry-Free',
    url: cfg.siteUrl,
    logo: `${cfg.siteUrl}/favicon-32.png`,
    image: cfg.ogImage,
    telephone: '+1-323-917-7708',
    email: cfg.contactEmail,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '6445 S Tenaya Way, Suite 110',
      addressLocality: 'Las Vegas',
      addressRegion: 'NV',
      postalCode: '89113',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '36.1147',
      longitude: '-115.1728',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '09:00',
      closes: '18:00',
    },
    priceRange: '$119-$299',
    currenciesAccepted: 'USD',
    paymentAccepted: 'Credit Card, Debit Card',
    knowsLanguage: cfg.supportedLangs,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: isDE ? 'Tesla Camping Buchung' : 'Tesla Camping Booking',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: isDE ? 'Tesla Model Y Camping-Paket' : 'Tesla Model Y Camping Package',
            description: isDE
              ? 'Tesla Model Y mit Dachzelt, Schlafmatte, Yeti Kühlbox, Kochset & Campingstühlen'
              : 'Tesla Model Y with rooftop tent, sleeping pad, Yeti cooler, cook set & camping chairs',
          },
          price: '149',
          priceCurrency: 'USD',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: isDE ? 'Tesla Cybertruck Off-Grid' : 'Tesla Cybertruck Off-Grid',
            description: isDE
              ? 'Cybertruck mit Starlink, Höhlenzelt, Kühlschrank, Powerstation & Bergungs-Kit'
              : 'Cybertruck with Starlink, cave tent, fridge, power station & recovery kit',
          },
          price: '299',
          priceCurrency: 'USD',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: isDE ? 'Tesla Model Y Budget' : 'Tesla Model Y Budget',
            description: isDE
              ? 'Tesla Model Y mit Bodenzelt, Schlafsäcken, Campingkocher & Kühlbox'
              : 'Tesla Model Y with ground tent, sleeping bags, camp stove & cooler',
          },
          price: '119',
          priceCurrency: 'USD',
        },
      ],
    },
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: isDE ? 'Camping-Ausrüstung inklusive' : 'Camping gear included', value: true },
      { '@type': 'LocationFeatureSpecification', name: isDE ? 'Tesla Supercharger inklusive' : 'Tesla Supercharger included', value: true },
      { '@type': 'LocationFeatureSpecification', name: isDE ? 'Geprüfte Exklusivpartner' : 'Vetted exclusive partners', value: true },
      { '@type': 'LocationFeatureSpecification', name: isDE ? 'KI-Routenplaner App' : 'AI route planner app', value: true },
      { '@type': 'LocationFeatureSpecification', name: isDE ? 'Persönlicher Concierge Service' : 'Personal Concierge Service', value: true },
      { '@type': 'LocationFeatureSpecification', name: isDE ? 'Vorgeplante Nationalpark-Routen' : 'Pre-planned National Park routes', value: true },
      ...(isDE ? [{ '@type': 'LocationFeatureSpecification', name: 'Deutschsprachiger Support', value: true }] : []),
    ],
    areaServed: [
      { '@type': 'State', name: 'Nevada' },
      { '@type': 'State', name: 'California' },
      { '@type': 'State', name: 'Arizona' },
      { '@type': 'State', name: 'Utah' },
      { '@type': 'State', name: 'Colorado' },
      { '@type': 'State', name: 'Wyoming' },
    ],
    sameAs: [cfg.partnerSiteUrl],
  };
}

function buildSchemaProduct(cfg: SiteConfig, locale: string) {
  const isDE = locale === 'de';
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: isDE
      ? 'Tesla Model Y Camping-Paket - All-Inclusive USA Roadtrip'
      : 'Tesla Model Y Camping Package - All-Inclusive USA Road Trip',
    description: isDE
      ? 'Tesla Model Y buchen mit Dachzelt, Schlafmatte, Yeti Kühlbox, Kochset, Campingstühlen, Versicherung, Tesla Supercharging & KI-Routenplaner App. Roadtrip durch die USA Nationalparks.'
      : 'Book Tesla Model Y with rooftop tent, sleeping pad, Yeti cooler, cook set, camping chairs, insurance, Tesla Supercharging & AI route planner app. Road trip through USA National Parks.',
    image: `${cfg.siteUrl}/teslamodely_flipcard.jpg`,
    brand: { '@type': 'Brand', name: 'Tesla' },
    category: 'Electric Vehicle Camping Package',
    offers: {
      '@type': 'AggregateOffer',
      url: `${cfg.siteUrl}/#fleet`,
      priceCurrency: 'USD',
      lowPrice: '119',
      highPrice: '299',
      priceValidUntil: '2026-12-31',
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      offerCount: '3',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: '149',
        priceCurrency: 'USD',
        unitCode: 'DAY',
        referenceQuantity: {
          '@type': 'QuantitativeValue',
          value: '1',
          unitCode: 'DAY',
        },
      },
    },
    additionalProperty: [
      { '@type': 'PropertyValue', name: isDE ? 'Camping-Ausrüstung' : 'Camping Gear', value: isDE ? 'Inklusive' : 'Included' },
      { '@type': 'PropertyValue', name: isDE ? 'Versicherung' : 'Insurance', value: isDE ? 'Inklusive' : 'Included' },
      { '@type': 'PropertyValue', name: 'Supercharging', value: isDE ? 'Kostenlos' : 'Free' },
      { '@type': 'PropertyValue', name: isDE ? 'KI-Routenplaner App' : 'AI Route Planner App', value: isDE ? 'Inklusive' : 'Included' },
      { '@type': 'PropertyValue', name: 'Concierge Service', value: '24/7 Support' },
      { '@type': 'PropertyValue', name: isDE ? 'Vorgeplante Routen' : 'Pre-planned Routes', value: isDE ? '6 Nationalpark-Touren' : '6 National Park tours' },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      bestRating: '5',
      worstRating: '1',
      reviewCount: '47',
    },
    review: [
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Remo M.' },
        datePublished: '2024-09-15',
        reviewBody: isDE
          ? 'Der absolute Wahnsinn! Von der Buchung bis zur Rückgabe \u2013 alles perfekt. Die App hat uns zu den schönsten Spots geführt.'
          : 'Absolutely incredible! From booking to return \u2013 everything was perfect. The app guided us to the most beautiful spots.',
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      },
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Katja L.' },
        datePublished: '2024-10-20',
        reviewBody: isDE
          ? 'Der Cybertruck war der Star unserer Reise! Überall wurden wir angesprochen. Das Starlink-Internet mitten in der Wüste war unglaublich.'
          : 'The Cybertruck was the star of our trip! People stopped us everywhere. Starlink internet in the middle of the desert was incredible.',
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      },
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Anna S.' },
        datePublished: '2024-11-05',
        reviewBody: isDE
          ? 'Als Solo-Reisende fühlte ich mich dank der 24/7-Unterstützung immer sicher. Die Route zum Grand Canyon war atemberaubend!'
          : 'As a solo traveler I always felt safe thanks to 24/7 support. The route to the Grand Canyon was breathtaking!',
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      },
    ],
  };
}

function buildSchemaFAQ(locale: string) {
  const isDE = locale === 'de';
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: isDE ? 'Was ist im Tesla Camping Mietpreis enthalten?' : 'What is included in the Tesla camping rental price?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: isDE
            ? 'Im Buchungspreis enthalten: Campingausrüstung (Dachzelt/Bodenzelt, Schlafmatte, Kühlbox, Kochset, Stühle), Versicherung, Tesla Supercharging, KI-Routenplaner App und Concierge Support ab $119/Tag. Zusätzlich: Kaution $250 (wird erstattet), Reinigung $50-150 bei Bedarf, Maut/Parkgebühren selbst.'
            : 'Included in the booking price: Camping gear (rooftop/ground tent, sleeping pad, cooler, cook set, chairs), insurance, Tesla Supercharging, AI route planner app and Concierge support from $119/day. Additional: $250 deposit (refundable), cleaning $50-150 if needed, tolls/parking fees on your own.',
        },
      },
      {
        '@type': 'Question',
        name: isDE ? 'Was ist die KI-Routenplaner App?' : 'What is the AI route planner app?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: isDE
            ? 'Unsere exklusive Tour Guide App plant automatisch optimale Routen mit Ladestopps, zeigt versteckte Campingplätze und Nationalpark-Highlights. Die App arbeitet mit der Tesla-Telemetrie zusammen und funktioniert auch offline.'
            : 'Our exclusive Tour Guide App automatically plans optimal routes with charging stops, shows hidden campsites and National Park highlights. The app works with Tesla telemetry and functions offline.',
        },
      },
      {
        '@type': 'Question',
        name: isDE ? 'Was bietet der Concierge Service?' : 'What does the Concierge Service offer?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: isDE
            ? 'Unser deutschsprachiger Concierge Service steht Ihnen 24/7 zur Verfügung \u2013 vor, während und nach Ihrer Reise. Wir helfen bei Routenplanung, Campingplatz-Reservierungen, Notfällen und allen Fragen rund um Ihren USA Roadtrip.'
            : 'Our Concierge Service is available 24/7 \u2013 before, during and after your trip. We help with route planning, campsite reservations, emergencies and all questions about your USA road trip.',
        },
      },
      {
        '@type': 'Question',
        name: isDE ? 'Ist das Tesla Supercharging wirklich kostenlos?' : 'Is Tesla Supercharging really free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: isDE
            ? 'Ja! Die Nutzung des Tesla Supercharger-Netzwerks ist im Buchungspreis enthalten. Hinweis: Dies gilt nur für offizielle Tesla Supercharger \u2013 Drittanbieter-Ladestationen (z.B. Electrify America, ChargePoint) sind nicht inklusive.'
            : 'Yes! Tesla Supercharger network usage is included in the booking price. Note: This applies only to official Tesla Superchargers \u2013 third-party charging stations (e.g. Electrify America, ChargePoint) are not included.',
        },
      },
      {
        '@type': 'Question',
        name: isDE ? 'Wie weit kann ich mit einem Tesla fahren?' : 'How far can I drive on a single charge?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: isDE
            ? 'Der Tesla Model Y hat eine Reichweite von ca. 330 Meilen (530 km), der Cybertruck ca. 340 Meilen (547 km). Mit dem dichten Tesla Supercharger-Netzwerk und unserer KI-App für optimale Ladestopps ist Reichweitenangst kein Thema.'
            : 'The Tesla Model Y has a range of approx. 330 miles (530 km), the Cybertruck approx. 340 miles (547 km). With the dense Tesla Supercharger network and our AI app for optimal charging stops, range anxiety is not an issue.',
        },
      },
      {
        '@type': 'Question',
        name: isDE ? 'Welche Nationalpark-Routen gibt es?' : 'What National Park routes are available?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: isDE
            ? 'Wir bieten 6 vorgeplante Routen: Grand Circle (Grand Canyon, Zion, Bryce), Route 66, Rocky Mountains (Yellowstone, Grand Teton), Pacific Coast Highway, San Diego Desert Loop und Lake Michigan. Alle mit KML-Dateien für Google Earth.'
            : 'We offer 6 pre-planned routes: Grand Circle (Grand Canyon, Zion, Bryce), Route 66, Rocky Mountains (Yellowstone, Grand Teton), Pacific Coast Highway, San Diego Desert Loop and Lake Michigan. All with KML files for Google Earth.',
        },
      },
      {
        '@type': 'Question',
        name: isDE ? 'Kann ich die Route 66 mit dem Tesla fahren?' : 'Can I drive Route 66 in a Tesla?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: isDE
            ? 'Ja! Unsere 14-tägige Route 66 Tour führt von Chicago nach Santa Monica \u2013 3.940 km amerikanische Geschichte. Die Route ist in 2 KML-Dateien aufgeteilt (Chicago\u2192Oklahoma, Oklahoma\u2192LA) für Google Earth. Das Tesla Supercharger-Netzwerk deckt die gesamte Strecke ab.'
            : 'Yes! Our 14-day Route 66 tour goes from Chicago to Santa Monica \u2013 2,448 miles of American history. The route is split into 2 KML files (Chicago\u2192Oklahoma, Oklahoma\u2192LA) for Google Earth. The Tesla Supercharger network covers the entire route.',
        },
      },
      {
        '@type': 'Question',
        name: isDE ? 'Wo kann ich den Tesla abholen?' : 'Where can I pick up the Tesla?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: isDE
            ? 'Abholung ist möglich in Las Vegas (LAS), Los Angeles (LAX) und San Francisco (SFO). Las Vegas ist ideal für Grand Canyon, Zion und weitere Nationalpark-Routen im Südwesten.'
            : 'Pickup is available in Las Vegas (LAS), Los Angeles (LAX) and San Francisco (SFO). Las Vegas is ideal for Grand Canyon, Zion and other Southwest National Park routes.',
        },
      },
      {
        '@type': 'Question',
        name: isDE ? 'Ist eine Versicherung inklusive?' : 'Is insurance included?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: isDE
            ? 'Ja, eine umfassende Versicherung ist im Buchungspreis enthalten. Zusätzlich fallen an: Kaution ($250, wird erstattet), eventuelle Reinigungsgebühren ($50-150). Mautgebühren und Parkkosten trägt der Kunde. Details in unseren AGB.'
            : 'Yes, comprehensive insurance is included in the booking price. Additional costs: $250 deposit (refundable), possible cleaning fees ($50-150). Tolls and parking fees are the customer\'s responsibility. Details in our Terms & Conditions.',
        },
      },
    ],
  };
}

function buildSchemaWebsite(cfg: SiteConfig) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: cfg.siteName,
    url: cfg.siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${cfg.siteUrl}/?s={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

function buildSchemaNavigation(cfg: SiteConfig, locale: string) {
  const isDE = locale === 'de';
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SiteNavigationElement',
        name: isDE ? 'Preise' : 'Pricing',
        description: isDE ? 'Tesla Roadtrip-Pakete ab $119/Tag' : 'Tesla road trip packages from $119/day',
        url: `${cfg.siteUrl}/preise`,
      },
      {
        '@type': 'SiteNavigationElement',
        name: isDE ? 'Fahrzeuge' : 'Vehicles',
        description: isDE ? 'Tesla Model Y Camping-Paket & Cybertruck' : 'Tesla Model Y Camping Package & Cybertruck',
        url: `${cfg.siteUrl}/flotte`,
      },
      {
        '@type': 'SiteNavigationElement',
        name: isDE ? 'Routen' : 'Routes',
        description: isDE ? 'Route 66, Grand Canyon, Death Valley & mehr' : 'Route 66, Grand Canyon, Death Valley & more',
        url: `${cfg.siteUrl}/routen`,
      },
      {
        '@type': 'SiteNavigationElement',
        name: isDE ? 'Kontakt' : 'Contact',
        description: isDE ? 'Jetzt Roadtrip anfragen' : 'Request your road trip now',
        url: `${cfg.siteUrl}/#kontakt`,
      },
    ],
  };
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface SEOProps {
  /** Route path, e.g. "/" or "/flotte" */
  route: string;
  /** Override title for sub-pages */
  title?: string;
  /** Override description for sub-pages */
  description?: string;
  /** Include all JSON-LD schemas (home page only) */
  includeAllSchemas?: boolean;
}

export function SEO({
  route,
  title: titleOverride,
  description: descOverride,
  includeAllSchemas = false,
}: SEOProps) {
  const { locale, config } = useLanguage();
  const page = PAGE_SEO[route] ?? PAGE_SEO['/']!;
  const lang = locale as 'de' | 'en';

  const title = titleOverride ?? page.title[lang];
  const description = descOverride ?? page.description[lang];
  const canonicalUrl = `${config.siteUrl}${page.path === '/' ? '' : page.path}`;
  const ogTitle = page.ogTitle ? page.ogTitle[lang] : title;
  const ogDesc = page.ogDescription ? page.ogDescription[lang] : description;
  const ogLocale = locale === 'de' ? 'de_DE' : 'en_US';

  const isDE = locale === 'de';
  const keywords = isDE
    ? 'Tesla buchen USA, Route 66 Roadtrip, Camping Roadtrip Amerika, E-Auto Buchung Las Vegas, Route 66 Tesla, Nationalparks USA, Grand Canyon Tesla, Zion Camping, Yellowstone Roadtrip, Elektroauto Urlaub, Dachzelt Tesla, Model Y Camping-Paket, Cybertruck buchen, Chicago Santa Monica Route 66'
    : 'Tesla rental USA, Route 66 road trip, camping road trip America, EV rental Las Vegas, Route 66 Tesla, National Parks USA, Grand Canyon Tesla, Zion camping, Yellowstone road trip, electric car vacation, rooftop tent Tesla, Model Y camping package, Cybertruck rental, Chicago Santa Monica Route 66';

  const twitterDesc = isDE
    ? 'Buchen Sie Ihr Tesla Roadtrip-Paket! Camping & Supercharging inklusive. Route 66, Grand Canyon, Yellowstone. Ab $119/Tag.'
    : 'Book your Tesla road trip package! Camping & Supercharging included. Route 66, Grand Canyon, Yellowstone. From $119/day.';

  const ogImageAlt = isDE
    ? 'Tesla Model Y mit Dachzelt vor dem Grand Canyon bei Sonnenuntergang'
    : 'Tesla Model Y with rooftop tent at the Grand Canyon at sunset';

  // Hreflang: AMA is always DE, GIW is always EN
  const amaUrl = `https://www.abenteuermietenamerika.de${page.path === '/' ? '' : page.path}`;
  const giwUrl = `https://www.goiconicway.com${page.path === '/' ? '' : page.path}`;

  return (
    <Helmet>
      {/* Primary */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />

      {/* SEO */}
      <meta
        name="robots"
        content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
      />
      <meta name="googlebot" content="index, follow" />
      <meta name="author" content={config.companyDba} />
      <meta name="publisher" content={config.companyDba} />
      <meta name="copyright" content={`2026 ${config.companyDba}`} />
      <meta name="keywords" content={keywords} />
      <meta name="language" content={locale} />
      <meta name="revisit-after" content="7 days" />
      <meta name="rating" content="general" />

      {/* Canonical + hreflang */}
      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" hrefLang="de" href={amaUrl} />
      <link rel="alternate" hrefLang="en" href={giwUrl} />
      <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />

      {/* Geographic (Local SEO — Las Vegas) */}
      <meta name="geo.region" content="US-NV" />
      <meta name="geo.placename" content="Las Vegas" />
      <meta name="geo.position" content="36.1147;-115.1728" />
      <meta name="ICBM" content="36.1147, -115.1728" />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDesc} />
      <meta property="og:image" content={config.ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={ogImageAlt} />
      <meta property="og:locale" content={ogLocale} />
      {config.supportedLangs.length > 1 && (
        <meta property="og:locale:alternate" content="en_US" />
      )}
      <meta property="og:site_name" content={config.siteName} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={ogTitle} />
      <meta name="twitter:description" content={twitterDesc} />
      <meta name="twitter:image" content={config.ogImage} />
      <meta name="twitter:image:alt" content={ogImageAlt} />

      {/* JSON-LD: Always include LocalBusiness + WebSite + Navigation */}
      <script type="application/ld+json">
        {JSON.stringify(buildSchemaLocalBusiness(config, locale))}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(buildSchemaWebsite(config))}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(buildSchemaNavigation(config, locale))}
      </script>

      {/* JSON-LD: Product + FAQ only on home + relevant pages */}
      {(includeAllSchemas || route === '/' || route === '/flotte' || route === '/preise') && (
        <script type="application/ld+json">
          {JSON.stringify(buildSchemaProduct(config, locale))}
        </script>
      )}
      {(includeAllSchemas || route === '/' || route === '/preise') && (
        <script type="application/ld+json">
          {JSON.stringify(buildSchemaFAQ(locale))}
        </script>
      )}
    </Helmet>
  );
}
