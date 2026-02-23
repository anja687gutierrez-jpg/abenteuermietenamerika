import { SEO } from '../components/SEO';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { FleetGrid } from '../components/fleet/FleetGrid';
import { ComparisonTable } from '../components/fleet/ComparisonTable';
import { BookingBar } from '../components/booking/BookingBar';

/**
 * Fleet page — /flotte
 *
 * Assembly: Header → FleetGrid → ComparisonTable → BookingBar → Footer
 *
 * SEO: LocalBusiness + Product + WebSite + Navigation schemas.
 * The comparison table and equipment breakdown strengthen E-E-A-T by
 * demonstrating deep product expertise.
 */
export function FlottePage() {
  return (
    <>
      <SEO route="/flotte" />
      <Header />
      <main>
        <FleetGrid />
        <ComparisonTable />
        <BookingBar />
      </main>
      <Footer />
    </>
  );
}
