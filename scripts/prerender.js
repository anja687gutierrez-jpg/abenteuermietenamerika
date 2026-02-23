/**
 * SSG Pre-render Script — Dual-site (AMA + GIW)
 *
 * Reads the client-built index.html template, imports the SSR bundle,
 * and generates static HTML for each route × each site.
 *
 * Output structure:
 *   dist/client-ama/              → abenteuermietenamerika.de
 *     index.html                  → /
 *     flotte/index.html           → /flotte
 *     routen/index.html           → /routen
 *     preise/index.html           → /preise
 *   dist/client-giw/              → goiconicway.com
 *     index.html                  → /
 *     flotte/index.html           → /flotte
 *     routen/index.html           → /routen
 *     preise/index.html           → /preise
 *
 * Run after: vite build && vite build --ssr
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, cpSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

// Routes to pre-render (must match vite.config.ts SSG_ROUTES)
const routes = ['/', '/flotte', '/routen', '/preise'];

// Sites to pre-render
const sites = [
  { siteId: 'ama', lang: 'de', outDir: 'dist/client-ama' },
  { siteId: 'giw', lang: 'en', outDir: 'dist/client-giw' },
];

async function prerender() {
  // 1. Read the client-built HTML template
  const templatePath = resolve(root, 'dist/client/index.html');
  if (!existsSync(templatePath)) {
    console.error('[prerender] dist/client/index.html not found. Run `vite build` first.');
    process.exit(1);
  }
  const baseTemplate = readFileSync(templatePath, 'utf-8');

  // 2. Import the SSR bundle
  const serverEntry = resolve(root, 'dist/server/entry-server.js');
  if (!existsSync(serverEntry)) {
    console.error('[prerender] dist/server/entry-server.js not found. Run `vite build --ssr` first.');
    process.exit(1);
  }
  const { render } = await import(serverEntry);

  for (const site of sites) {
    const siteOutBase = resolve(root, site.outDir);

    // Copy static assets from dist/client/ to site output dir
    const clientDir = resolve(root, 'dist/client');
    cpSync(clientDir, siteOutBase, { recursive: true });

    // Set correct lang attribute for this site
    const template = baseTemplate.replace('<html lang="de">', `<html lang="${site.lang}">`);

    console.log(`\n[prerender] ${site.siteId.toUpperCase()} (${site.lang}) → ${site.outDir}/`);
    console.log(`  Pre-rendering ${routes.length} routes...\n`);

    for (const route of routes) {
      const { html: appHtml, helmet } = render(route, site.siteId);

      // 3. Collect Helmet head tags
      const headTags = [
        helmet.title.toString(),
        helmet.meta.toString(),
        helmet.link.toString(),
        helmet.script.toString(),
      ]
        .filter(Boolean)
        .join('\n    ');

      // 4. Inject into template
      let rendered = template
        .replace('<!--helmet-->', headTags)
        .replace('<!--ssr-outlet-->', appHtml);

      // 5. Write to output path
      const outDir =
        route === '/'
          ? siteOutBase
          : resolve(siteOutBase, route.slice(1));

      mkdirSync(outDir, { recursive: true });
      const outPath = resolve(outDir, 'index.html');
      writeFileSync(outPath, rendered, 'utf-8');

      const size = (Buffer.byteLength(rendered) / 1024).toFixed(1);
      console.log(`  ${route.padEnd(12)} → ${outPath.replace(root + '/', '')} (${size} KB)`);
    }
  }

  console.log('\n[prerender] Done. Static HTML ready for deployment.');
  console.log('  AMA → dist/client-ama/  (deploy to abenteuermietenamerika.de)');
  console.log('  GIW → dist/client-giw/  (deploy to goiconicway.com)');
}

prerender().catch((err) => {
  console.error('[prerender] Fatal error:', err);
  process.exit(1);
});
