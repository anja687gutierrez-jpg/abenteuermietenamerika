import { SEO } from '../components/SEO';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { RouteCatalog } from '../components/routes/RouteCatalog';
import { HowRoutesWork } from '../components/routes/HowRoutesWork';
import { BookingBar } from '../components/booking/BookingBar';

/**
 * Routes page — /routen
 *
 * Assembly: Header → HowRoutesWork → RouteCatalog → BookingBar → Footer
 *
 * SEO: LocalBusiness + WebSite + Navigation schemas.
 * The "How it Works" section + KML downloads prove expertise to Google's
 * E-E-A-T signals — this is a professional brokerage, not a landing page.
 */
export function RoutenPage() {
  return (
    <>
      <SEO route="/routen" />
      <Header />
      <main>
        <HowRoutesWork />
        <RouteCatalog />
        <BookingBar />
      </main>
      <Footer />
    </>
  );
}
