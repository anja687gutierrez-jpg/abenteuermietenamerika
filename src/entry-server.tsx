import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { HelmetProvider, HelmetServerState } from 'react-helmet-async';
import { LanguageProvider } from './context/LanguageContext';
import type { SiteId } from './context/LanguageContext';
import { App } from './App';

/**
 * Server-side rendering entry point for SSG pre-rendering.
 *
 * Called by scripts/prerender.js for each route × each site.
 * Returns the rendered HTML string and Helmet's collected head tags
 * (title, meta, JSON-LD scripts) for injection into the template.
 *
 * @param url    Route path, e.g. "/" or "/flotte"
 * @param siteId Which site to pre-render — 'ama' or 'giw'
 */
export function render(
  url: string,
  siteId: SiteId = 'ama',
): {
  html: string;
  helmet: HelmetServerState;
} {
  const helmetContext: { helmet?: HelmetServerState } = {};

  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <LanguageProvider forceSiteId={siteId}>
          <App />
        </LanguageProvider>
      </StaticRouter>
    </HelmetProvider>
  );

  return {
    html,
    helmet: helmetContext.helmet!,
  };
}
