import { SEO } from '../components/SEO';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Hero } from '../components/sections/Hero';
import { BookingBar } from '../components/booking/BookingBar';
import { ValueProposition } from '../components/sections/ValueProposition';
import { FleetGrid } from '../components/fleet/FleetGrid';
import { RouteCatalog } from '../components/routes/RouteCatalog';
import { ConciergeInterface } from '../components/ai/ConciergeInterface';
import { Testimonials } from '../components/sections/Testimonials';
import { Founder } from '../components/sections/Founder';
import { AppPortal } from '../components/sections/AppPortal';
import { CTA } from '../components/sections/CTA';

/**
 * Home page — /
 *
 * Assembly order (matches legacy site flow):
 *   Header → Hero → BookingBar → ValueProposition → Fleet → Routes →
 *   Concierge → Testimonials → Founder → AppPortal → CTA → Footer
 *
 * SEO: All 5 JSON-LD schemas (LocalBusiness, Product, FAQ, WebSite, Navigation)
 */
export function HomePage() {
  return (
    <>
      <SEO route="/" includeAllSchemas />
      <Header />
      <main>
        <Hero />
        <BookingBar />
        <ValueProposition />
        <FleetGrid />
        <RouteCatalog />
        <ConciergeInterface />
        <Testimonials />
        <Founder />
        <AppPortal />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
