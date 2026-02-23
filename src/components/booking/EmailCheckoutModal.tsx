import { useState, useEffect, useRef, useCallback } from 'react';
import { useLanguage } from '../../context/LanguageContext';

interface BookingSummary {
  vehicleName: string;
  days: number;
  totalPrice: number;
  location: string;
}

interface EmailCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  summary: BookingSummary | null;
  onSubmit: (email: string) => void;
  loading: boolean;
  error: string | null;
}

/**
 * EmailCheckoutModal — two-step checkout flow restored from legacy index.html.
 *
 * User fills the booking form → clicks "Verfügbarkeit Prüfen" → this modal
 * opens with a summary + email input → submit triggers the checkout API.
 *
 * All inline styles match the original static HTML (index-pre-phase3.html).
 */
export function EmailCheckoutModal({
  isOpen,
  onClose,
  summary,
  onSubmit,
  loading,
  error,
}: EmailCheckoutModalProps) {
  const { t, config } = useLanguage();
  const [email, setEmail] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus email input when modal opens; clear previous input
  useEffect(() => {
    if (isOpen) {
      setEmail('');
      // Small delay so the DOM is painted before focusing
      const id = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(id);
    }
  }, [isOpen]);

  // Escape key closes modal
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  const handleSubmit = useCallback(() => {
    onSubmit(email.trim());
  }, [email, onSubmit]);

  if (!isOpen || !summary) return null;

  const feeLabel = t('einmalige Servicegebühr', 'one-time service fee');
  const disclaimerText = t(
    'Startpreis-Schätzung. Endpreis wird auf unserer Buchungsplattform bestätigt.',
    'Starting price estimate. Final price confirmed on our booking platform.'
  );
  const dayLabel = t('Tage', 'days');

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="emailModalTitle"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        background: 'rgba(0,0,0,0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: '1rem',
          padding: '2rem',
          maxWidth: '420px',
          width: '90%',
          position: 'relative',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '0.75rem',
            right: '1rem',
            background: 'none',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer',
            color: '#999',
          }}
          aria-label={t('Schließen', 'Close')}
        >
          &times;
        </button>

        {/* Title */}
        <h3
          id="emailModalTitle"
          style={{ margin: '0 0 0.5rem', fontSize: '1.25rem', color: '#1a1a1a' }}
        >
          {t('Fast geschafft!', 'Almost there!')}
        </h3>

        {/* Subtitle */}
        <p style={{ margin: '0 0 1.25rem', color: '#666', fontSize: '0.9rem' }}>
          {t(
            'Geben Sie Ihre E-Mail ein, um zur sicheren Zahlung zu gelangen.',
            'Enter your email to proceed to secure checkout.'
          )}
        </p>

        {/* Booking summary */}
        <div
          style={{
            background: '#f9f9f9',
            borderRadius: '0.5rem',
            padding: '0.75rem 1rem',
            marginBottom: '1.25rem',
            fontSize: '0.85rem',
            color: '#444',
          }}
        >
          <strong>{summary.vehicleName}</strong> &middot; {summary.days}{' '}
          {dayLabel} &middot; ${summary.totalPrice.toLocaleString()} &middot;{' '}
          {summary.location}
          <br />
          <span style={{ color: '#f97316', fontWeight: 600 }}>
            + $139 {feeLabel}
          </span>
          <br />
          <span style={{ fontSize: '0.75rem', color: '#999' }}>
            {disclaimerText}
          </span>
        </div>

        {/* Email input */}
        <input
          ref={inputRef}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !loading) handleSubmit();
          }}
          placeholder="ihre@email.com"
          style={{
            width: '100%',
            padding: '0.75rem 1rem',
            border: '2px solid #ddd',
            borderRadius: '0.5rem',
            fontSize: '1rem',
            boxSizing: 'border-box',
            marginBottom: '0.75rem',
          }}
        />

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: '100%',
            padding: '0.75rem',
            background: loading ? '#9ca3af' : '#f97316',
            color: '#fff',
            border: 'none',
            borderRadius: '0.5rem',
            fontSize: '1rem',
            fontWeight: 600,
            cursor: loading ? 'default' : 'pointer',
          }}
        >
          {loading
            ? t('Verarbeitung…', 'Processing…')
            : t('Jetzt Buchen — Sichere Zahlung', 'Book Now — Secure Checkout')}
        </button>

        {/* Error display */}
        {error && (
          <div style={{ color: '#dc2626', fontSize: '0.85rem', marginTop: '0.5rem' }}>
            {error}
          </div>
        )}

        {/* WhatsApp fallback */}
        <p style={{ textAlign: 'center', margin: '1rem 0 0', fontSize: '0.8rem', color: '#999' }}>
          {t('Lieber chatten?', 'Prefer to chat?')}{' '}
          <a
            href={config.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#25d366' }}
          >
            WhatsApp
          </a>
        </p>
      </div>
    </div>
  );
}
