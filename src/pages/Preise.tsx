import { SEO } from '../components/SEO';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { PricingTiers } from '../components/pricing/PricingTiers';
import { FaqAccordion } from '../components/pricing/FaqAccordion';
import { BookingBar } from '../components/booking/BookingBar';

/**
 * Pricing page — /preise
 *
 * Assembly: Header → PricingTiers → BookingBar → FaqAccordion → Footer
 *
 * SEO: All 5 JSON-LD schemas including FAQPage for rich snippets.
 * The FAQ is placed on the pricing page because this is where most
 * conversion-related questions occur — matching user intent at the
 * decision point.
 */
export function PreisePage() {
  return (
    <>
      <SEO route="/preise" includeAllSchemas />
      <Header />
      <main>
        <PricingTiers />
        <BookingBar />
        <FaqAccordion />
      </main>
      <Footer />
    </>
  );
}
