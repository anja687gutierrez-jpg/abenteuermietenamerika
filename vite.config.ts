import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

/**
 * Vite SSG Configuration — Abenteuer Mieten Amerika
 *
 * Build pipeline:
 *   1. `vite build`          → client bundle (dist/client/)
 *   2. `vite build --ssr`    → server bundle (dist/server/)
 *   3. `node prerender.js`   → static HTML for each route
 *
 * Pre-rendered routes: /, /flotte, /routen, /preise
 * Deploy target: Cloudflare Pages (dist/client/)
 */

// Routes to pre-render at build time
export const SSG_ROUTES = ['/', '/flotte', '/routen', '/preise'];

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],

  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },

  // Bundle CJS packages into the SSR output to avoid ESM/CJS interop issues
  ssr: {
    noExternal: ['react-helmet-async'],
  },

  build: {
    outDir: isSsrBuild ? 'dist/server' : 'dist/client',
    rollupOptions: {
      output: isSsrBuild
        ? {
            // SSR bundle: clean name so prerender script can find it
            entryFileNames: '[name].js',
          }
        : {
            // Client: hashed filenames for cache-busting
            assetFileNames: 'assets/[name]-[hash][extname]',
            chunkFileNames: 'assets/[name]-[hash].js',
            entryFileNames: 'assets/[name]-[hash].js',
          },
    },
  },

  // Static assets (images, KML files, etc.) live in public/
  publicDir: 'public',

  server: {
    port: 8003,
  },
}));
