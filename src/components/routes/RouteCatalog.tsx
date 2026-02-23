import { useState, useCallback } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAnalytics } from '../../hooks/useAnalytics';

// ---------------------------------------------------------------------------
// Route data — complete from legacy index-legacy.html
// ---------------------------------------------------------------------------

interface TimelineStop {
  day: { de: string; en: string };
  route: string;
  routeDE?: string;
  routeEN?: string;
  distance?: string;
  charger?: string;
  chargerDE?: string;
  chargerEN?: string;
  charging: boolean;
}

interface KmlFile {
  href: string;
  track: string;
  de: string;
  en: string;
}

interface RouteData {
  id: string;
  image: string;
  alt: string;
  meta: { de: string; en: string };
  title: string;
  desc: { de: string; en: string };
  stops: TimelineStop[];
  kml: KmlFile[];
}

const ROUTES: RouteData[] = [
  {
    id: 'grand-circle',
    image: 'zion-campsite-tesla.jpg',
    alt: 'Grand Circle Adventure - Tesla Camping am Zion Nationalpark',
    meta: { de: '7 Tage \u2022 Utah & Arizona', en: '7 Days \u2022 Utah & Arizona' },
    title: 'Grand Circle Adventure',
    desc: {
      de: 'Von Las Vegas zum Grand Canyon und zur\u00fcck \u00fcber Zion und Bryce - erleben Sie drei der spektakul\u00e4rsten Nationalparks Amerikas. Campen Sie unter dem Sternenhimmel am Grand Canyon, wandern Sie durch die roten Schluchten von Zion und bestaunen Sie die einzigartigen Hoodoos in der Escalante-Region.',
      en: "From Las Vegas to the Grand Canyon and back via Zion and Bryce - experience three of America's most spectacular national parks. Camp under the stars at the Grand Canyon, hike through Zion's red canyons, and marvel at the unique hoodoos in the Escalante region.",
    },
    stops: [
      { day: { de: 'Tag 1', en: 'Day 1' }, route: 'Las Vegas \u2192 Grand Canyon', distance: '280 mi', charger: 'Supercharger: Kingman, AZ', charging: true },
      { day: { de: 'Tag 2-3', en: 'Day 2-3' }, route: 'Grand Canyon', routeDE: 'Grand Canyon: South Rim, Wanderungen & Sonnenauf-/unterg\u00e4nge', routeEN: 'Grand Canyon: South Rim, Hikes & Sunrise/Sunset', charging: false },
      { day: { de: 'Tag 4', en: 'Day 4' }, route: 'Grand Canyon \u2192 Zion National Park', distance: '250 mi', charger: 'Supercharger: St. George, UT', charging: true },
      { day: { de: 'Tag 5', en: 'Day 5' }, route: 'Zion', routeDE: 'Zion: Angels Landing, The Narrows & Scenic Drive', routeEN: 'Zion: Angels Landing, The Narrows & Scenic Drive', charging: false },
      { day: { de: 'Tag 6', en: 'Day 6' }, route: 'Zion \u2192 Escalante/Bryce Canyon', distance: '150 mi', charger: 'Destination Charger: Escalante RV Park (50 AMP)', charging: true },
      { day: { de: 'Tag 7', en: 'Day 7' }, route: 'Escalante \u2192 Las Vegas', distance: '290 mi', charger: 'Supercharger: St. George, UT', charging: true },
    ],
    kml: [
      { href: 'Las_Vegas_Tour_-_7_Tage.kml', track: 'Grand_Circle_Route', de: 'Route f\u00fcr Google Earth herunterladen', en: 'Download Route for Google Earth' },
    ],
  },
  {
    id: 'route-66',
    image: '14-days-sunsets-skyline.jpg',
    alt: 'Route 66 Tesla Roadtrip - 14 Tage von Chicago nach Santa Monica',
    meta: { de: '14 Tage \u2022 Cross-Country', en: '14 Days \u2022 Cross-Country' },
    title: 'Route 66 Revival',
    desc: {
      de: "Die legend\u00e4re 'Mother Road' von Chicago nach Santa Monica - 3.940 km amerikanische Geschichte. Erleben Sie Retro-Diners, verlassene Geisterst\u00e4dte, den Cadillac Ranch und das nostalgische Herz Amerikas in einem modernen Tesla.",
      en: "The legendary 'Mother Road' from Chicago to Santa Monica - 2,400 miles of American history. Experience retro diners, abandoned ghost towns, Cadillac Ranch, and the nostalgic heart of America in a modern Tesla.",
    },
    stops: [
      { day: { de: 'Tag 1-2', en: 'Day 1-2' }, route: 'Chicago \u2192 St. Louis', distance: '297 mi', charger: 'Supercharger: Springfield, IL', charging: true },
      { day: { de: 'Tag 3-4', en: 'Day 3-4' }, route: 'Gateway Arch', routeDE: 'Gateway Arch & Historic Route 66 Drive', routeEN: 'Gateway Arch & Historic Route 66 Drive', charging: false },
      { day: { de: 'Tag 5-6', en: 'Day 5-6' }, route: 'Oklahoma City \u2192 Amarillo', distance: '259 mi', charger: 'Supercharger: Elk City, OK', charging: true },
      { day: { de: 'Tag 7-9', en: 'Day 7-9' }, route: 'Cadillac Ranch', routeDE: 'Cadillac Ranch, Santa Fe & Albuquerque', routeEN: 'Cadillac Ranch, Santa Fe & Albuquerque', charging: false },
      { day: { de: 'Tag 10-14', en: 'Day 10-14' }, route: 'Flagstaff \u2192 Grand Canyon \u2192 Las Vegas \u2192 Santa Monica', distance: '580 mi', charger: 'Supercharger: Kingman, Barstow', charging: true },
    ],
    kml: [
      { href: 'Route_66_-_Part_1.kml', track: 'Route_66_Part_1', de: 'Route Teil 1 (Chicago \u2192 Oklahoma)', en: 'Route Part 1 (Chicago \u2192 Oklahoma)' },
      { href: 'Copy_of_Route_66_-_Part_2.kml', track: 'Route_66_Part_2', de: 'Route Teil 2 (Oklahoma \u2192 LA)', en: 'Route Part 2 (Oklahoma \u2192 LA)' },
    ],
  },
  {
    id: 'rocky-mountain',
    image: 'yellowstone.jpg',
    alt: 'Rocky Mountain Roadtrip - Tesla Camping Yellowstone Nationalpark',
    meta: { de: '7 Tage \u2022 Rocky Mountains', en: '7 Days \u2022 Rocky Mountains' },
    title: 'Rocky Mountain Route',
    desc: {
      de: 'Von Denver bis Yellowstone - erleben Sie die majest\u00e4tischen Rocky Mountains. Beobachten Sie Bisons und Grizzlyb\u00e4ren, bestaunen Sie Old Faithful und campen Sie unter dem klarsten Sternenhimmel Amerikas in zwei der ber\u00fchmtesten Nationalparks.',
      en: "From Denver to Yellowstone - experience the majestic Rocky Mountains. Watch bison and grizzly bears, marvel at Old Faithful, and camp under America's clearest starry skies in two of the most famous national parks.",
    },
    stops: [
      { day: { de: 'Tag 1', en: 'Day 1' }, route: 'Denver \u2192 Estes Park', distance: '71 mi', charger: 'Supercharger: Longmont, CO', charging: true },
      { day: { de: 'Tag 2', en: 'Day 2' }, route: 'Rocky Mountain NP & Trail Ridge Road', charging: false },
      { day: { de: 'Tag 3-4', en: 'Day 3-4' }, route: 'Grand Teton National Park', distance: '450 mi', charger: 'Supercharger: Laramie, Rock Springs', charging: true },
      { day: { de: 'Tag 5-6', en: 'Day 5-6' }, route: 'Yellowstone', routeDE: 'Yellowstone: Old Faithful, Grand Prismatic, Mammoth Hot Springs', routeEN: 'Yellowstone: Old Faithful, Grand Prismatic, Mammoth Hot Springs', chargerDE: '9 kostenlose Level-2-Ladestationen im Park', chargerEN: '9 free Level 2 chargers inside the park', charging: false },
      { day: { de: 'Tag 7', en: 'Day 7' }, route: 'Yellowstone \u2192 Jackson Hole', distance: '60 mi', charger: 'Destination Charger: Jackson', charging: true },
    ],
    kml: [],
  },
  {
    id: 'pacific-coast',
    image: 'pacificcoasthighway.jpg',
    alt: 'Pacific Coast Highway Tesla Roadtrip - Big Sur und Kalifornien',
    meta: { de: '10 Tage \u2022 Kalifornien', en: '10 Days \u2022 California' },
    title: 'Pacific Coast Highway',
    desc: {
      de: 'Die vielleicht sch\u00f6nste K\u00fcstenstra\u00dfe der Welt. Von Los Angeles nach San Francisco entlang dramatischer Klippen, durch neblige Redwood-W\u00e4lder und vorbei an Seel\u00f6wen-Kolonien. Campen Sie mit Meerblick in Big Sur - pures Kalifornien-Feeling.',
      en: 'Perhaps the most beautiful coastal road in the world. From Los Angeles to San Francisco along dramatic cliffs, through misty redwood forests, and past sea lion colonies. Camp with ocean views in Big Sur - pure California vibes.',
    },
    stops: [
      { day: { de: 'Tag 1-2', en: 'Day 1-2' }, route: 'Los Angeles \u2192 Santa Barbara', distance: '95 mi', charger: 'Supercharger: Santa Barbara', charging: true },
      { day: { de: 'Tag 3-4', en: 'Day 3-4' }, route: 'San Luis Obispo', routeDE: 'San Luis Obispo & Hearst Castle', routeEN: 'San Luis Obispo & Hearst Castle', charging: false },
      { day: { de: 'Tag 5-7', en: 'Day 5-7' }, route: 'Big Sur Coastline & Pfeiffer Beach', distance: '90 mi', charger: 'Supercharger: Monterey', charging: true },
      { day: { de: 'Tag 8-9', en: 'Day 8-9' }, route: 'Carmel', routeDE: 'Carmel, 17-Mile Drive & Monterey Aquarium', routeEN: 'Carmel, 17-Mile Drive & Monterey Aquarium', charging: false },
      { day: { de: 'Tag 10', en: 'Day 10' }, route: 'Santa Cruz \u2192 San Francisco', distance: '75 mi', charger: 'Supercharger: Daly City', charging: true },
    ],
    kml: [],
  },
  {
    id: 'surf-desert',
    image: 'sandiego.jpg',
    alt: 'San Diego Surf und Desert Escapade - Tesla Camping Anza-Borrego',
    meta: { de: '5 Tage \u2022 S\u00fcdkalifornien', en: '5 Days \u2022 Southern California' },
    title: 'Surf & Desert Escapade',
    desc: {
      de: 'Der perfekte Kurztrip: Morgens Surfen an den Str\u00e4nden von La Jolla, nachmittags Wandern durch W\u00fcstenschluchten, nachts Sterne beobachten in der Anza-Borrego W\u00fcste. Entspannen Sie im hippen Palm Springs und erleben Sie Kaliforniens unglaubliche Vielfalt.',
      en: "The perfect short trip: Surf La Jolla beaches in the morning, hike through desert canyons in the afternoon, stargaze in the Anza-Borrego Desert at night. Relax in hip Palm Springs and experience California's incredible diversity.",
    },
    stops: [
      { day: { de: 'Tag 1', en: 'Day 1' }, route: 'San Diego \u2192 La Jolla Beaches', distance: '15 mi', charger: 'Supercharger: La Jolla UTC', charging: true },
      { day: { de: 'Tag 2', en: 'Day 2' }, route: 'Julian', routeDE: 'Julian (historisches Goldgr\u00e4ber-St\u00e4dtchen)', routeEN: 'Julian (historic gold rush town)', charging: false },
      { day: { de: 'Tag 3', en: 'Day 3' }, route: 'Anza-Borrego Desert State Park', distance: '60 mi', charger: 'Destination Charger: Borrego Springs', charging: true },
      { day: { de: 'Tag 4', en: 'Day 4' }, route: 'Palm Springs', routeDE: 'Palm Springs & Joshua Tree', routeEN: 'Palm Springs & Joshua Tree', charging: false },
      { day: { de: 'Tag 5', en: 'Day 5' }, route: 'Palm Springs \u2192 San Diego/Coronado', distance: '125 mi', charger: 'Supercharger: Cabazon Outlets', charging: true },
    ],
    kml: [],
  },
  {
    id: 'lake-michigan',
    image: 'chicago.jpg',
    alt: 'Lake Michigan Loop Tesla Roadtrip - Chicago und Great Lakes',
    meta: { de: '8 Tage \u2022 Gro\u00dfe Seen', en: '8 Days \u2022 Great Lakes' },
    title: 'Lake Michigan Loop',
    desc: {
      de: "Starten Sie in der 'Windy City' Chicago und umrunden Sie den majest\u00e4tischen Lake Michigan. Entdecken Sie Sandd\u00fcnen am Indiana Dunes, charmante Hafenst\u00e4dte in Door County, Craft-Beer in Milwaukee und die Weing\u00fcter von Traverse City. Ein untersch\u00e4tztes Amerika-Highlight!",
      en: "Start in the 'Windy City' Chicago and circle the majestic Lake Michigan. Discover sand dunes at Indiana Dunes, charming harbor towns in Door County, craft beer in Milwaukee, and Traverse City wineries. An underrated American highlight!",
    },
    stops: [
      { day: { de: 'Tag 1-2', en: 'Day 1-2' }, route: 'Chicago \u2192 Milwaukee', distance: '92 mi', charger: 'Supercharger: Milwaukee Market', charging: true },
      { day: { de: 'Tag 3-4', en: 'Day 3-4' }, route: 'Door County', routeDE: 'Door County Halbinsel & Green Bay', routeEN: 'Door County Peninsula & Green Bay', charging: false },
      { day: { de: 'Tag 5-6', en: 'Day 5-6' }, route: 'Mackinac Bridge \u2192 Traverse City', distance: '280 mi', charger: 'Supercharger: Traverse City', charging: true },
      { day: { de: 'Tag 7', en: 'Day 7' }, route: 'Sleeping Bear Dunes', routeDE: 'Sleeping Bear Dunes National Lakeshore', routeEN: 'Sleeping Bear Dunes National Lakeshore', charging: false },
      { day: { de: 'Tag 8', en: 'Day 8' }, route: 'Grand Rapids \u2192 Indiana Dunes \u2192 Chicago', distance: '180 mi', charger: 'Supercharger: Grand Rapids, Indiana Dunes', charging: true },
    ],
    kml: [],
  },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function RouteCatalog() {
  const { t, locale } = useLanguage();
  const { trackRouteView, trackDownload } = useAnalytics();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleRoute = useCallback(
    (id: string) => {
      setExpandedId((prev) => {
        if (prev === id) return null;
        trackRouteView(id);
        return id;
      });
    },
    [trackRouteView]
  );

  const handleKmlDownload = useCallback(
    (fileName: string) => {
      trackDownload(fileName);
    },
    [trackDownload]
  );

  return (
    <section id="routes">
      <div className="container">
        {/* Section header */}
        <div className="sec-head">
          <h2 className="sec-title">
            {t('Ausgew\u00e4hlte Routen', 'Curated Routes')}
          </h2>
          <p className="sec-sub">
            {t(
              'Von K\u00fcste zu K\u00fcste - w\u00e4hlen Sie Ihre perfekte Route durch Amerikas sch\u00f6nste Nationalparks.',
              "Coast to coast - choose your perfect route through America's most beautiful National Parks."
            )}
          </p>
        </div>

        {/* Route grid — uses .routes-grid from design-system.css */}
        <div className="routes-grid">
          {ROUTES.map((r) => {
            const expanded = expandedId === r.id;
            return (
              <div
                key={r.id}
                className={`route-card${expanded ? ' active' : ''}`}
              >
                {/* Image */}
                <img
                  src={`/${r.image}`}
                  className="route-img"
                  alt={r.alt}
                  loading="lazy"
                  width={600}
                  height={400}
                />

                {/* Body */}
                <div className="route-body">
                  <div className="route-meta">
                    {t(r.meta.de, r.meta.en)}
                  </div>
                  <div className="route-title">{r.title}</div>
                  <div className="route-price">
                    <i className="fas fa-paper-plane" />{' '}
                    <span>
                      {t('Individuelle Anfrage', 'Custom Quote')}
                    </span>
                  </div>
                  <p className="route-desc">{t(r.desc.de, r.desc.en)}</p>
                  <button
                    className="route-btn flight-plan-btn"
                    onClick={() => toggleRoute(r.id)}
                  >
                    <span className="btn-text">
                      {t('Reiseplan Anzeigen', 'View Itinerary')}
                    </span>
                    <i className="fas fa-chevron-down btn-icon" />
                  </button>
                </div>

                {/* Timeline (collapsible) */}
                <div className="route-timeline">
                  <div className="timeline-header">
                    {t('Reiseroute', 'Itinerary')}
                  </div>
                  <div className="timeline-stops">
                    {r.stops.map((stop, i) => (
                      <div
                        key={i}
                        className={`timeline-stop${stop.charging ? ' charging' : ''}`}
                      >
                        <div className="stop-day">
                          {t(stop.day.de, stop.day.en)}
                        </div>
                        <div className="stop-route">
                          {stop.routeDE && stop.routeEN
                            ? t(stop.routeDE, stop.routeEN)
                            : stop.route}
                          {stop.distance && (
                            <span className="stop-distance">
                              {' '}
                              ({stop.distance})
                            </span>
                          )}
                        </div>
                        {(stop.charger || stop.chargerDE) && (
                          <div className="stop-charger">
                            <i className="fas fa-bolt" />{' '}
                            {stop.chargerDE && stop.chargerEN
                              ? t(stop.chargerDE, stop.chargerEN)
                              : stop.charger}
                          </div>
                        )}
                      </div>
                    ))}

                    {/* KML downloads */}
                    {r.kml.length === 1 && (
                      <a
                        href={`/${r.kml[0].href}`}
                        download
                        className="kml-download"
                        data-track={r.kml[0].track}
                        onClick={() => handleKmlDownload(r.kml[0].href)}
                      >
                        <i className="fas fa-map-marked-alt" />
                        <span>{t(r.kml[0].de, r.kml[0].en)}</span>
                      </a>
                    )}
                    {r.kml.length > 1 && (
                      <div className="kml-download-group">
                        {r.kml.map((k, i) => (
                          <a
                            key={i}
                            href={`/${k.href}`}
                            download
                            className="kml-download"
                            data-track={k.track}
                            onClick={() => handleKmlDownload(k.href)}
                          >
                            <i className="fas fa-map-marked-alt" />
                            <span>{t(k.de, k.en)}</span>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
