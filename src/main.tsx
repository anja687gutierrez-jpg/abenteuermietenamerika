import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from '@vuer-ai/react-helmet-async';
import { LanguageProvider } from './context/LanguageContext';
import { App } from './App';

// Global design system — shared tokens, typography, spacing, gradients
import '../design-system.css';

/**
 * Client entry point.
 *
 * Provider order (outside → inside):
 *   StrictMode → HelmetProvider → BrowserRouter → LanguageProvider → App
 *
 * LanguageProvider auto-detects AMA vs GIW from the hostname,
 * so the same build serves both sites.
 */
hydrateRoot(
  document.getElementById('root')!,
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);
