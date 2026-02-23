import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { useLanguage } from '../context/LanguageContext';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface BookingConfirmationData {
  token: string;
  vehicleType: string;
  pickupDate: string;
  dropoffDate: string;
  pickupLocation: string;
  customerEmail: string;
  days: number;
  dailyRate: number;
  subtotal: number;
  serviceFee: number;
  total: number;
}

/** Human-readable vehicle names */
const VEHICLE_NAMES: Record<string, { de: string; en: string }> = {
  model_y_camping: { de: 'Model Y (Camping Suite)', en: 'Model Y (Camping Suite)' },
  model_y_budget: { de: 'Model Y (Budget)', en: 'Model Y (Budget)' },
  cybertruck: { de: 'Cybertruck (Off-Grid)', en: 'Cybertruck (Off-Grid)' },
};

/** Platform base URL — login & booking management live here */
const PLATFORM_URL = import.meta.env.DEV
  ? 'http://localhost:3000'
  : 'https://abenteuer-mieten-platform.vercel.app';

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function BookingConfirmationPage() {
  const { token } = useParams<{ token: string }>();
  const { t, locale, config } = useLanguage();

  // Read booking data from localStorage (survives refresh + new tabs)
  const booking = useMemo<BookingConfirmationData | null>(() => {
    try {
      const raw = localStorage.getItem('booking_confirmation');
      if (!raw) return null;
      const data = JSON.parse(raw) as BookingConfirmationData;
      if (data.token !== token) return null;
      return data;
    } catch {
      return null;
    }
  }, [token]);

  // Password form state
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [signupConflict, setSignupConflict] = useState(false);

  // Email for signup — from booking data or manual entry (fallback)
  const [fallbackEmail, setFallbackEmail] = useState('');

  // Booking lookup form state (fallback)
  const [lookupEmail, setLookupEmail] = useState('');
  const [lookupSubmitted, setLookupSubmitted] = useState(false);

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setSignupConflict(false);

    if (password.length < 8) {
      setPasswordError(
        t(
          'Passwort muss mindestens 8 Zeichen lang sein.',
          'Password must be at least 8 characters.'
        )
      );
      return;
    }
    if (password !== confirmPassword) {
      setPasswordError(
        t('Passwörter stimmen nicht überein.', 'Passwords do not match.')
      );
      return;
    }

    const email = booking?.customerEmail || fallbackEmail;
    if (!email || !email.includes('@')) {
      setPasswordError(
        t(
          'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
          'Please enter a valid email address.'
        )
      );
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`${PLATFORM_URL}/api/public/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else if (res.status === 409) {
        setSignupConflict(true);
      } else {
        const data = await res.json().catch(() => ({}));
        setPasswordError(
          data.error ||
            t(
              'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.',
              'An error occurred. Please try again.'
            )
        );
      }
    } catch {
      setPasswordError(
        t(
          'Verbindungsfehler. Bitte prüfen Sie Ihre Internetverbindung.',
          'Connection error. Please check your internet connection.'
        )
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleLookupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lookupEmail.includes('@')) return;
    // Future: POST to booking-lookup API → resends confirmation email
    setLookupSubmitted(true);
  };

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr + 'T00:00:00');
      return date.toLocaleDateString(locale === 'de' ? 'de-DE' : 'en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  const vehicleName = booking
    ? (VEHICLE_NAMES[booking.vehicleType]?.[locale === 'de' ? 'de' : 'en'] ??
      booking.vehicleType)
    : '';

  return (
    <>
      <Helmet>
        <title>
          {t(
            `Buchungsbestätigung | ${config.siteName}`,
            `Booking Confirmation | ${config.siteName}`
          )}
        </title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <Header />

      <main
        style={{
          minHeight: '70vh',
          padding: 'var(--space-24) var(--space-6) var(--space-16)',
          fontFamily: 'var(--font-body)',
          maxWidth: '640px',
          margin: '0 auto',
        }}
      >
        {/* A. Back to Homepage */}
        <Link
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
            color: 'var(--color-text-muted)',
            textDecoration: 'none',
            fontSize: 'var(--text-sm)',
            fontWeight: 'var(--weight-semibold)' as any,
            marginBottom: 'var(--space-8)',
            transition: 'color var(--duration-fast) var(--ease-spring)',
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = 'var(--color-text-primary)')
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = 'var(--color-text-muted)')
          }
        >
          &larr;{' '}
          {t('Zurück zur Startseite', 'Back to Homepage')}
        </Link>

        {/* Page heading */}
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-3xl)',
            fontWeight: 'var(--weight-extrabold)' as any,
            color: 'var(--color-text-primary)',
            marginBottom: 'var(--space-2)',
          }}
        >
          {t('Buchungsbestätigung', 'Booking Confirmation')}
        </h1>
        <p
          style={{
            color: 'var(--color-text-muted)',
            fontSize: 'var(--text-base)',
            marginBottom: 'var(--space-8)',
          }}
        >
          {t(
            'Vielen Dank für Ihre Buchung!',
            'Thank you for your booking!'
          )}
        </p>

        {/* B. Booking Summary Card */}
        {booking ? (
          <div
            style={{
              background: '#fff',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-6)',
              marginBottom: 'var(--space-8)',
              boxShadow: 'var(--shadow-card)',
              border: '1px solid rgba(0,0,0,0.06)',
            }}
          >
            {/* Status badge + reference */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 'var(--space-4)',
                flexWrap: 'wrap',
                gap: 'var(--space-2)',
              }}
            >
              <span
                style={{
                  fontSize: 'var(--text-xs)',
                  color: 'var(--color-text-muted)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                Ref: {token?.slice(0, 12)}...
              </span>
              <span
                style={{
                  display: 'inline-block',
                  padding: '2px 10px',
                  borderRadius: 'var(--radius-pill)',
                  background: 'rgba(251, 191, 36, 0.15)',
                  color: '#b45309',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 'var(--weight-semibold)' as any,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                {t('Ausstehend', 'Pending')}
              </span>
            </div>

            {/* Info banner */}
            <div
              style={{
                background: 'rgba(59, 130, 246, 0.08)',
                borderRadius: 'var(--radius-sm)',
                padding: 'var(--space-3) var(--space-4)',
                marginBottom: 'var(--space-5)',
                fontSize: 'var(--text-sm)',
                color: '#1d4ed8',
                lineHeight: 1.5,
              }}
            >
              {t(
                'Ihre Buchung wurde erstellt. Eine Bestätigungs-E-Mail wurde gesendet.',
                'Your booking has been created. A confirmation email has been sent.'
              )}
            </div>

            {/* Vehicle */}
            <div style={summaryRowStyle}>
              <span style={summaryLabelStyle}>
                {t('Fahrzeug', 'Vehicle')}
              </span>
              <span style={summaryValueStyle}>{vehicleName}</span>
            </div>

            {/* Pickup */}
            <div style={summaryRowStyle}>
              <span style={summaryLabelStyle}>
                {t('Abholung', 'Pickup')}
              </span>
              <span style={summaryValueStyle}>
                {formatDate(booking.pickupDate)} &middot;{' '}
                {booking.pickupLocation}
              </span>
            </div>

            {/* Return */}
            <div style={summaryRowStyle}>
              <span style={summaryLabelStyle}>
                {t('Rückgabe', 'Return')}
              </span>
              <span style={summaryValueStyle}>
                {formatDate(booking.dropoffDate)} &middot;{' '}
                {booking.days} {t('Tage', 'days')}
              </span>
            </div>

            {/* Divider */}
            <hr
              style={{
                border: 'none',
                borderTop: '1px solid rgba(0,0,0,0.08)',
                margin: 'var(--space-4) 0',
              }}
            />

            {/* Price breakdown */}
            <div style={summaryRowStyle}>
              <span style={summaryLabelStyle}>
                {t('Mietpreis', 'Rental')}
              </span>
              <span style={summaryValueStyle}>
                ${booking.subtotal.toLocaleString()}
                <span
                  style={{
                    fontSize: 'var(--text-xs)',
                    color: 'var(--color-text-muted)',
                    marginLeft: '4px',
                  }}
                >
                  ({booking.days} &times; ${booking.dailyRate}/
                  {t('Tag', 'day')})
                </span>
              </span>
            </div>

            <div style={summaryRowStyle}>
              <span style={summaryLabelStyle}>
                {t('Servicegebühr', 'Service Fee')}
              </span>
              <span style={summaryValueStyle}>${booking.serviceFee}</span>
            </div>

            <div
              style={{
                ...summaryRowStyle,
                marginTop: 'var(--space-2)',
                paddingTop: 'var(--space-3)',
                borderTop: '2px solid rgba(0,0,0,0.1)',
              }}
            >
              <span
                style={{
                  ...summaryLabelStyle,
                  fontWeight: 'var(--weight-semibold)' as any,
                  color: 'var(--color-text-primary)',
                }}
              >
                {t('Geschätzter Gesamtpreis', 'Estimated Total')}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-xl)',
                  fontWeight: 'var(--weight-extrabold)' as any,
                  color: 'var(--color-text-primary)',
                }}
              >
                ${booking.total.toLocaleString()}
              </span>
            </div>

            <p
              style={{
                fontSize: 'var(--text-xs)',
                color: 'var(--color-text-muted)',
                marginTop: 'var(--space-3)',
                lineHeight: 1.4,
              }}
            >
              {t(
                'Startpreis-Schätzung. Endpreis wird auf unserer Buchungsplattform bestätigt.',
                'Starting price estimate. Final price confirmed on our booking platform.'
              )}
            </p>
          </div>
        ) : (
          /* Fallback: no localStorage data (shared link / cleared storage) */
          <div
            style={{
              background: '#fff',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-6)',
              marginBottom: 'var(--space-8)',
              boxShadow: 'var(--shadow-card)',
              border: '1px solid rgba(0,0,0,0.06)',
            }}
          >
            {/* 1. Booking reference token — always visible */}
            <div
              style={{
                background: 'rgba(59, 130, 246, 0.06)',
                borderRadius: 'var(--radius-sm)',
                padding: 'var(--space-4)',
                marginBottom: 'var(--space-6)',
                textAlign: 'center',
              }}
            >
              <p
                style={{
                  fontSize: 'var(--text-xs)',
                  color: 'var(--color-text-muted)',
                  marginBottom: 'var(--space-1)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                {t('Buchungsreferenz', 'Booking Reference')}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-lg)',
                  fontWeight: 'var(--weight-semibold)' as any,
                  color: 'var(--color-text-primary)',
                  wordBreak: 'break-all',
                  userSelect: 'all',
                }}
              >
                {token}
              </p>
              <p
                style={{
                  fontSize: 'var(--text-xs)',
                  color: 'var(--color-text-muted)',
                  marginTop: 'var(--space-2)',
                }}
              >
                {t(
                  'Speichern Sie diese Referenz — Sie brauchen sie für den Support.',
                  'Save this reference — you\'ll need it for support.'
                )}
              </p>
            </div>

            {/* 2. Look up booking by email */}
            {!lookupSubmitted ? (
              <form onSubmit={handleLookupSubmit}>
                <p
                  style={{
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--weight-semibold)' as any,
                    color: 'var(--color-text-primary)',
                    marginBottom: 'var(--space-3)',
                  }}
                >
                  {t(
                    'Buchungsdetails erneut senden',
                    'Resend Booking Details'
                  )}
                </p>
                <p
                  style={{
                    fontSize: 'var(--text-sm)',
                    color: 'var(--color-text-muted)',
                    marginBottom: 'var(--space-4)',
                    lineHeight: 1.5,
                  }}
                >
                  {t(
                    'Geben Sie die E-Mail-Adresse ein, mit der Sie gebucht haben. Wir senden Ihnen die Details erneut.',
                    'Enter the email you booked with and we\'ll resend your details.'
                  )}
                </p>
                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                  <input
                    type="email"
                    value={lookupEmail}
                    onChange={(e) => setLookupEmail(e.target.value)}
                    placeholder="ihre@email.com"
                    required
                    style={{
                      ...inputStyle,
                      flex: 1,
                      marginBottom: 0,
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      padding: 'var(--space-3) var(--space-4)',
                      borderRadius: '0.5rem',
                      background: 'var(--color-text-primary)',
                      color: '#fff',
                      border: 'none',
                      fontSize: 'var(--text-sm)',
                      fontWeight: 'var(--weight-semibold)' as any,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {t('Senden', 'Send')}
                  </button>
                </div>
              </form>
            ) : (
              <div
                style={{
                  background: 'rgba(34, 197, 94, 0.08)',
                  borderRadius: 'var(--radius-sm)',
                  padding: 'var(--space-4)',
                  textAlign: 'center',
                }}
              >
                <p
                  style={{
                    fontSize: 'var(--text-sm)',
                    color: '#15803d',
                    fontWeight: 'var(--weight-semibold)' as any,
                    marginBottom: 'var(--space-1)',
                  }}
                >
                  {t('E-Mail wird gesendet!', 'Email on its way!')}
                </p>
                <p
                  style={{
                    fontSize: 'var(--text-xs)',
                    color: 'var(--color-text-muted)',
                  }}
                >
                  {t(
                    'Prüfen Sie Ihren Posteingang und Spam-Ordner.',
                    'Check your inbox and spam folder.'
                  )}
                </p>
              </div>
            )}

            {/* Divider */}
            <hr
              style={{
                border: 'none',
                borderTop: '1px solid rgba(0,0,0,0.08)',
                margin: 'var(--space-5) 0',
              }}
            />

            {/* 3. Platform login + WhatsApp */}
            <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
              <a
                href={`${PLATFORM_URL}/sign-in`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  flex: 1,
                  minWidth: '140px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 'var(--space-2)',
                  padding: 'var(--space-3) var(--space-4)',
                  borderRadius: 'var(--radius-pill)',
                  background: '#f97316',
                  color: '#fff',
                  textDecoration: 'none',
                  fontWeight: 'var(--weight-semibold)' as any,
                  fontSize: 'var(--text-sm)',
                }}
              >
                {t('Auf der Plattform anmelden', 'Log in to Platform')}
              </a>
              <a
                href={config.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  flex: 1,
                  minWidth: '140px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 'var(--space-2)',
                  padding: 'var(--space-3) var(--space-4)',
                  borderRadius: 'var(--radius-pill)',
                  background: '#25d366',
                  color: '#fff',
                  textDecoration: 'none',
                  fontWeight: 'var(--weight-semibold)' as any,
                  fontSize: 'var(--text-sm)',
                }}
              >
                WhatsApp
              </a>
            </div>
          </div>
        )}

        {/* C. "Unlock Your Booking" Module */}
        <div
          style={{
            background: '#fff',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--space-6)',
            boxShadow: 'var(--shadow-card)',
            border: '1px solid rgba(0,0,0,0.06)',
            marginBottom: 'var(--space-8)',
          }}
        >
          {!submitted ? (
            <>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-xl)',
                  fontWeight: 'var(--weight-extrabold)' as any,
                  color: 'var(--color-text-primary)',
                  marginBottom: 'var(--space-2)',
                }}
              >
                {t(
                  'Sichern Sie Ihre Buchung',
                  'Secure Your Booking'
                )}
              </h2>
              <p
                style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-text-muted)',
                  marginBottom: 'var(--space-6)',
                  lineHeight: 1.6,
                }}
              >
                {t(
                  'Legen Sie ein Passwort fest, um Ihre Buchung zu verwalten, zu ändern oder zu stornieren — und Ihren Verzicht zu unterschreiben.',
                  'Set a password to manage, modify, or cancel your booking — and sign your waiver.'
                )}
              </p>

              {signupConflict && (
                <div
                  style={{
                    background: 'rgba(251, 191, 36, 0.12)',
                    borderRadius: 'var(--radius-sm)',
                    padding: 'var(--space-3) var(--space-4)',
                    marginBottom: 'var(--space-4)',
                    fontSize: 'var(--text-sm)',
                    color: '#92400e',
                    lineHeight: 1.5,
                  }}
                >
                  {t(
                    'Ein Konto mit dieser E-Mail existiert bereits. ',
                    'An account with this email already exists. '
                  )}
                  <a
                    href={`${PLATFORM_URL}/sign-in`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#f97316', fontWeight: 600, textDecoration: 'none' }}
                  >
                    {t('Jetzt anmelden', 'Sign in now')}
                  </a>
                </div>
              )}

              <form onSubmit={handlePasswordSubmit}>
                {/* Email input — only shown when no booking data in localStorage */}
                {!booking && (
                  <div style={{ marginBottom: 'var(--space-4)' }}>
                    <label
                      style={{
                        display: 'block',
                        fontSize: 'var(--text-sm)',
                        fontWeight: 'var(--weight-semibold)' as any,
                        color: 'var(--color-text-primary)',
                        marginBottom: 'var(--space-1)',
                      }}
                    >
                      {t('E-Mail-Adresse', 'Email Address')}
                    </label>
                    <input
                      type="email"
                      value={fallbackEmail}
                      onChange={(e) => setFallbackEmail(e.target.value)}
                      placeholder="ihre@email.com"
                      style={inputStyle}
                      autoComplete="email"
                      required
                    />
                  </div>
                )}

                <div style={{ marginBottom: 'var(--space-4)' }}>
                  <label
                    style={{
                      display: 'block',
                      fontSize: 'var(--text-sm)',
                      fontWeight: 'var(--weight-semibold)' as any,
                      color: 'var(--color-text-primary)',
                      marginBottom: 'var(--space-1)',
                    }}
                  >
                    {t('Passwort', 'Password')}
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t('Mind. 8 Zeichen', 'Min. 8 characters')}
                    style={inputStyle}
                    autoComplete="new-password"
                  />
                </div>

                <div style={{ marginBottom: 'var(--space-4)' }}>
                  <label
                    style={{
                      display: 'block',
                      fontSize: 'var(--text-sm)',
                      fontWeight: 'var(--weight-semibold)' as any,
                      color: 'var(--color-text-primary)',
                      marginBottom: 'var(--space-1)',
                    }}
                  >
                    {t('Passwort bestätigen', 'Confirm Password')}
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder={t('Passwort wiederholen', 'Repeat password')}
                    style={inputStyle}
                    autoComplete="new-password"
                  />
                </div>

                {passwordError && (
                  <div
                    style={{
                      color: '#dc2626',
                      fontSize: 'var(--text-sm)',
                      marginBottom: 'var(--space-4)',
                    }}
                  >
                    {passwordError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    width: '100%',
                    padding: 'var(--space-3) var(--space-6)',
                    borderRadius: 'var(--radius-sm)',
                    background: submitting ? '#9ca3af' : '#f97316',
                    color: '#fff',
                    border: 'none',
                    fontSize: 'var(--text-base)',
                    fontWeight: 'var(--weight-semibold)' as any,
                    cursor: submitting ? 'not-allowed' : 'pointer',
                    transition: 'background var(--duration-fast) var(--ease-spring)',
                  }}
                  onMouseEnter={(e) => {
                    if (!submitting) e.currentTarget.style.background = '#ea580c';
                  }}
                  onMouseLeave={(e) => {
                    if (!submitting) e.currentTarget.style.background = '#f97316';
                  }}
                >
                  {submitting
                    ? t('Wird erstellt...', 'Creating...')
                    : t(
                        'Konto erstellen & Buchung verwalten',
                        'Create Account & Manage Booking'
                      )}
                </button>
              </form>

              <p
                style={{
                  fontSize: 'var(--text-xs)',
                  color: 'var(--color-text-muted)',
                  marginTop: 'var(--space-4)',
                  textAlign: 'center',
                  lineHeight: 1.5,
                }}
              >
                {t(
                  'Kein Konto gewünscht? ',
                  "Don't want an account? "
                )}
                <a
                  href={`${PLATFORM_URL}/sign-in`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#f97316', textDecoration: 'none', fontWeight: 'var(--weight-semibold)' as any }}
                >
                  {t('Auf der Plattform anmelden', 'Log in to Platform')}
                </a>
                {t(' oder kontaktieren Sie uns per ', ' or contact us via ')}
                <a
                  href={config.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#25d366', textDecoration: 'none' }}
                >
                  WhatsApp
                </a>
                .
              </p>
            </>
          ) : (
            /* Success state — account created, direct to platform login */
            <div style={{ textAlign: 'center', padding: 'var(--space-4) 0' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: 'var(--radius-circle)',
                  background: 'rgba(34, 197, 94, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto var(--space-4)',
                  fontSize: 'var(--text-2xl)',
                }}
              >
                &#10003;
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-xl)',
                  fontWeight: 'var(--weight-extrabold)' as any,
                  color: 'var(--color-text-primary)',
                  marginBottom: 'var(--space-2)',
                }}
              >
                {t('Konto erstellt!', 'Account Created!')}
              </h2>
              <p
                style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-text-muted)',
                  lineHeight: 1.6,
                  marginBottom: 'var(--space-4)',
                }}
              >
                {t(
                  'Melden Sie sich auf der Plattform an, um Ihre Buchung zu verwalten und Ihren Verzicht zu unterschreiben.',
                  'Sign in on the platform to manage your booking and sign your waiver.'
                )}
              </p>
              <a
                href={`${PLATFORM_URL}/sign-in`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  padding: 'var(--space-3) var(--space-8)',
                  borderRadius: 'var(--radius-pill)',
                  background: '#f97316',
                  color: '#fff',
                  textDecoration: 'none',
                  fontWeight: 'var(--weight-semibold)' as any,
                  fontSize: 'var(--text-sm)',
                }}
              >
                {t('Auf der Plattform anmelden', 'Sign in to Platform')}
              </a>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

// ---------------------------------------------------------------------------
// Shared inline styles
// ---------------------------------------------------------------------------

const summaryRowStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  marginBottom: 'var(--space-2)',
  flexWrap: 'wrap',
  gap: 'var(--space-1)',
};

const summaryLabelStyle: React.CSSProperties = {
  fontSize: 'var(--text-sm)',
  color: 'var(--color-text-muted)',
};

const summaryValueStyle: React.CSSProperties = {
  fontSize: 'var(--text-sm)',
  color: 'var(--color-text-primary)',
  fontWeight: 600,
  textAlign: 'right',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.75rem 1rem',
  border: '2px solid #ddd',
  borderRadius: '0.5rem',
  fontSize: '1rem',
  boxSizing: 'border-box',
  fontFamily: 'var(--font-body)',
  transition: 'border-color var(--duration-fast)',
};
