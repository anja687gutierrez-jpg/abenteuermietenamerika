import { useState, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Vehicle types matching the backend vehicleTypeEnum */
type VehicleType =
  | 'tesla_model_y'
  | 'tesla_model_x'
  | 'tesla_model_3'
  | 'tesla_cybertruck';

/** Pickup locations offered on the frontend */
type PickupLocation = 'Las Vegas' | 'Los Angeles' | 'San Francisco';

interface BookingPayload {
  vehicleType: VehicleType;
  pickupDate: string; // YYYY-MM-DD
  dropoffDate: string; // YYYY-MM-DD
  pickupLocation: PickupLocation;
  customerEmail: string;
}

interface PriceEstimate {
  days: number;
  dailyRate: number;
  subtotal: number;
  serviceFee: number;
  total: number;
}

interface BookingState {
  loading: boolean;
  error: string | null;
  checkoutUrl: string | null;
}

interface UseBookingReturn extends BookingState {
  /** Calculate a client-side price estimate (display only — server recalculates). */
  estimate: (
    vehicleType: VehicleType,
    pickupDate: string,
    dropoffDate: string
  ) => PriceEstimate | null;
  /** Submit booking to the secured backend. */
  submit: (payload: BookingPayload) => Promise<void>;
  /** Validate dates before submission. */
  validateDates: (
    pickupDate: string,
    dropoffDate: string
  ) => string | null;
  /** Reset state for a new booking attempt. */
  reset: () => void;
}

// ---------------------------------------------------------------------------
// Constants (display-only — server is the source of truth via calculatePrice)
// ---------------------------------------------------------------------------

const SERVICE_FEE = 139;

/** Client-side daily rates for estimate display. Server recalculates from DB. */
const DAILY_RATES: Record<VehicleType, number> = {
  tesla_model_y: 149,
  tesla_model_x: 199,
  tesla_model_3: 119,
  tesla_cybertruck: 299,
};

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useBooking(): UseBookingReturn {
  const { locale, config } = useLanguage();
  const [state, setState] = useState<BookingState>({
    loading: false,
    error: null,
    checkoutUrl: null,
  });

  /**
   * Client-side estimate for the booking summary display.
   *
   * IMPORTANT: This is a visual estimate only. The server recalculates
   * the authoritative price via lib/pricing/calculate.ts — the frontend
   * never sends price values. This prevents the critical vulnerability
   * (Gap #2) where client-sent prices were trusted.
   */
  const estimate = useCallback(
    (
      vehicleType: VehicleType,
      pickupDate: string,
      dropoffDate: string
    ): PriceEstimate | null => {
      const start = new Date(pickupDate);
      const end = new Date(dropoffDate);
      if (isNaN(start.getTime()) || isNaN(end.getTime()) || end <= start)
        return null;

      const days = Math.ceil(
        (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
      );
      const dailyRate = DAILY_RATES[vehicleType] ?? 149;
      const subtotal = days * dailyRate;

      return {
        days,
        dailyRate,
        subtotal,
        serviceFee: SERVICE_FEE,
        total: subtotal + SERVICE_FEE,
      };
    },
    []
  );

  /**
   * Date validation — returns error message or null if valid.
   */
  const validateDates = useCallback(
    (pickupDate: string, dropoffDate: string): string | null => {
      if (!pickupDate || !dropoffDate) {
        return locale === 'en'
          ? 'Please select a start and return date.'
          : 'Bitte wählen Sie ein Start- und Rückgabedatum.';
      }

      const start = new Date(pickupDate);
      const end = new Date(dropoffDate);

      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return locale === 'en'
          ? 'Invalid date format.'
          : 'Ungültiges Datumsformat.';
      }

      if (end <= start) {
        return locale === 'en'
          ? 'Return date must be after the start date.'
          : 'Das Rückgabedatum muss nach dem Startdatum liegen.';
      }

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (start < today) {
        return locale === 'en'
          ? 'Start date cannot be in the past.'
          : 'Das Startdatum darf nicht in der Vergangenheit liegen.';
      }

      return null;
    },
    [locale]
  );

  /**
   * Submit the booking to /api/public/checkout.
   *
   * The payload intentionally does NOT include any price values.
   * The backend:
   *   1. Looks up the vehicle from DB
   *   2. Calls calculatePrice() server-side
   *   3. Generates an idempotency key
   *   4. Checks strict availability (overlapping bookings)
   *   5. Creates the booking with server-computed prices
   *   6. Returns checkoutUrl for the guest flow
   */
  const submit = useCallback(
    async (payload: BookingPayload) => {
      // Client-side pre-validation
      const dateError = validateDates(payload.pickupDate, payload.dropoffDate);
      if (dateError) {
        setState({ loading: false, error: dateError, checkoutUrl: null });
        return;
      }

      if (!payload.customerEmail || !payload.customerEmail.includes('@')) {
        const msg =
          locale === 'en'
            ? 'Please enter a valid email address.'
            : 'Bitte geben Sie eine gültige E-Mail-Adresse ein.';
        setState({ loading: false, error: msg, checkoutUrl: null });
        return;
      }

      setState({ loading: true, error: null, checkoutUrl: null });

      try {
        const res = await fetch(config.checkoutApiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            vehicleType: payload.vehicleType,
            pickupDate: payload.pickupDate,
            dropoffDate: payload.dropoffDate,
            pickupLocation: payload.pickupLocation,
            customerEmail: payload.customerEmail,
            source: config.bookingSource,
            locale,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(
            data.error ||
              (locale === 'en'
                ? 'Something went wrong. Please try again.'
                : 'Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.')
          );
        }

        // Idempotency: backend returns existing booking URL if duplicate
        const url: string = data.checkoutUrl || data.bookingUrl;
        setState({ loading: false, error: null, checkoutUrl: url });

        // Redirect to the guest booking flow
        if (url) window.location.href = url;
      } catch (err) {
        const fallback =
          locale === 'en'
            ? 'Something went wrong. Please try again.'
            : 'Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.';
        setState({
          loading: false,
          error: err instanceof Error ? err.message : fallback,
          checkoutUrl: null,
        });
      }
    },
    [locale, config.checkoutApiUrl, config.bookingSource, validateDates]
  );

  const reset = useCallback(() => {
    setState({ loading: false, error: null, checkoutUrl: null });
  }, []);

  return { ...state, estimate, submit, validateDates, reset };
}

export type { VehicleType, PickupLocation, BookingPayload, PriceEstimate };
