import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { useLanguage } from '../context/LanguageContext';

/**
 * 404 page — catch-all for unknown routes.
 * Not pre-rendered — only hit during client-side navigation.
 */
export function NotFoundPage() {
  const { t, config } = useLanguage();

  return (
    <>
      <Helmet>
        <title>
          {t(
            `Seite nicht gefunden | ${config.siteName}`,
            `Page Not Found | ${config.siteName}`
          )}
        </title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <Header />
      <main
        style={{
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: 'var(--space-24) var(--space-6)',
          fontFamily: 'var(--font-body)',
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-7xl)',
            fontWeight: 'var(--weight-extrabold)' as any,
            color: 'var(--color-text-primary)',
            marginBottom: 'var(--space-4)',
          }}
        >
          404
        </h1>
        <p
          style={{
            fontSize: 'var(--text-2xl)',
            color: 'var(--color-text-muted)',
            marginBottom: 'var(--space-8)',
          }}
        >
          {t('Diese Seite existiert nicht.', 'This page does not exist.')}
        </p>
        <Link
          to="/"
          style={{
            padding: 'var(--space-3) var(--space-8)',
            borderRadius: 'var(--radius-pill)',
            background: 'var(--gradient-emerald)',
            color: 'var(--color-white)',
            textDecoration: 'none',
            fontWeight: 'var(--weight-semibold)' as any,
            fontSize: 'var(--text-lg)',
          }}
        >
          {t('Zur Startseite', 'Back to Home')}
        </Link>
      </main>
      <Footer />
    </>
  );
}
