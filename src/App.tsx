import { Routes, Route } from 'react-router-dom';

// Page-level components
import { HomePage } from './pages/Home';
import { FlottePage } from './pages/Flotte';
import { RoutenPage } from './pages/Routen';
import { PreisePage } from './pages/Preise';
import { NotFoundPage } from './pages/NotFound';
import { BookingConfirmationPage } from './pages/BookingConfirmation';

// Global overlays (fixed-position, every page)
import { KlausyBubble } from './components/ai/KlausyBubble';
import { FAB } from './components/ui/FAB';
import { MobileBottomNav } from './components/ui/MobileBottomNav';
import { ExitIntentPopup } from './components/ui/ExitIntentPopup';

/**
 * Application route definitions + global overlays.
 *
 * Physical routes (pre-rendered at build time):
 *   /        → Home (hero, fleet preview, routes preview, FAQ, testimonials)
 *   /flotte  → Fleet detail (all vehicle cards + comparison)
 *   /routen  → Route catalog (6 National Park tours)
 *   /preise  → Pricing tiers + what's included
 *
 * These match the SSG_ROUTES array in vite.config.ts.
 */
export function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/flotte" element={<FlottePage />} />
        <Route path="/routen" element={<RoutenPage />} />
        <Route path="/preise" element={<PreisePage />} />
        <Route path="/booking/:token" element={<BookingConfirmationPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {/* Global fixed-position overlays */}
      <KlausyBubble />
      <FAB />
      <ExitIntentPopup />
      <MobileBottomNav />
    </>
  );
}
