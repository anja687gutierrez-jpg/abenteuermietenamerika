import { useState, useMemo, useCallback } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useBooking } from '../../hooks/useBooking';
import type { VehicleType, PickupLocation } from '../../hooks/useBooking';

/**
 * BookingBar — exact structure from legacy index.html
 *
 * Uses CSS classes from design-system.css:
 *   #booking-bar, .container, .sec-head, .sec-title, .sec-sub,
 *   .booking-widget.horizontal-bar, .widget-form, .input-group,
 *   .input-field, .check-btn, .booking-estimate, .estimate-item,
 *   .estimate-label, .estimate-value, .estimate-note
 */

interface VehicleOption {
  value: VehicleType;
  de: string;
  en: string;
  dailyPrice: number;
}

const VEHICLE_OPTIONS: VehicleOption[] = [
  {
    value: 'tesla_model_y',
    de: 'Model Y (Camping Suite)',
    en: 'Model Y (Camping Suite)',
    dailyPrice: 216,
  },
  {
    value: 'tesla_cybertruck',
    de: 'Cybertruck (Off-Grid)',
    en: 'Cybertruck (Off-Grid)',
    dailyPrice: 299,
  },
  {
    value: 'tesla_model_3',
    de: 'Model Y (Budget)',
    en: 'Model Y (Budget)',
    dailyPrice: 119,
  },
];

const PICKUP_LOCATIONS: PickupLocation[] = [
  'Los Angeles',
  'Las Vegas',
];

export function BookingBar() {
  const { t, locale, config } = useLanguage();
  const { estimate, submit, loading, error } = useBooking();

  const [vehicleType, setVehicleType] = useState<VehicleType>('' as VehicleType);
  const [pickupLocation, setPickupLocation] = useState<PickupLocation>('Los Angeles');
  const [pickupDate, setPickupDate] = useState('');
  const [dropoffDate, setDropoffDate] = useState('');

  const priceEstimate = useMemo(
    () => (pickupDate && dropoffDate && vehicleType ? estimate(vehicleType, pickupDate, dropoffDate) : null),
    [vehicleType, pickupDate, dropoffDate, estimate]
  );

  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!vehicleType) return;
      submit({
        vehicleType,
        pickupDate,
        dropoffDate,
        pickupLocation,
        customerEmail: '',
      });
    },
    [vehicleType, pickupDate, dropoffDate, pickupLocation, submit]
  );

  return (
    <section id="booking-bar">
      <div className="container">
        <div className="sec-head" style={{ marginBottom: '2rem' }}>
          <h2 className="sec-title">
            {t('Ihr Roadtrip-Concierge', 'Your Roadtrip Concierge')}
          </h2>
          <p className="sec-sub">
            {t(
              'Ihre Buchungsplattform für Tesla Roadtrip-Abenteuer. Wir sind Ihr Partner für elektrische Mobilität in den USA.',
              'Your booking platform for Tesla Roadtrip adventures. We\'re your partner for electric mobility in the USA.'
            )}
          </p>
        </div>

        <div className="booking-widget horizontal-bar">
          <form className="widget-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label>{t('Abholung', 'Pickup')}</label>
              <select
                className="input-field"
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value as PickupLocation)}
              >
                <option value="Los Angeles">Los Angeles, CA</option>
                <option value="Las Vegas">Las Vegas, NV</option>
              </select>
            </div>

            <div className="input-group">
              <label>{t('Start', 'Start')}</label>
              <input
                type="date"
                className="input-field"
                value={pickupDate}
                min={today}
                onChange={(e) => setPickupDate(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>{t('Rückgabe', 'Return')}</label>
              <input
                type="date"
                className="input-field"
                value={dropoffDate}
                min={pickupDate || today}
                onChange={(e) => setDropoffDate(e.target.value)}
                required
              />
            </div>

            <div className="input-group" style={{ flex: 1.5 }}>
              <label>{t('Fahrzeug Wählen', 'Choose Vehicle')}</label>
              <select
                className="input-field"
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value as VehicleType)}
              >
                <option value="" disabled>
                  {t('— Fahrzeug wählen —', '— Choose Vehicle —')}
                </option>
                {VEHICLE_OPTIONS.map((v) => (
                  <option key={v.value} value={v.value}>
                    {locale === 'de' ? v.de : v.en}
                  </option>
                ))}
              </select>
            </div>

            <button className="check-btn" type="submit" disabled={loading}>
              {loading
                ? t('Wird geprüft…', 'Checking…')
                : t('Verfügbarkeit Prüfen', 'Check Availability')}
            </button>
          </form>

          <p style={{ textAlign: 'center', fontSize: '0.8rem', color: '#9ca3af', marginTop: '0.75rem' }}>
            <span>
              {t(
                'Neue Abholorte werden laufend hinzugefügt.',
                'New pickup locations added regularly.'
              )}
            </span>{' '}
            <a href={config.whatsappUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#f97316', textDecoration: 'none' }}>
              <span>{t('Schreib uns', 'Text us')}</span>
            </a>{' '}
            <span>{t('für individuelle Abholung.', 'for custom pickup.')}</span>
          </p>

          {/* Real-time Estimate Display */}
          <div className={`booking-estimate${priceEstimate ? ' visible' : ''}`} id="bookingEstimate">
            {priceEstimate && (
              <>
                <div className="estimate-item">
                  <span className="estimate-label">{t('Dauer', 'Duration')}</span>
                  <span className="estimate-value">{priceEstimate.days} {t('Tage', 'days')}</span>
                </div>
                <div className="estimate-item">
                  <span className="estimate-label">{t('Geschätzter Preis', 'Estimated Price')}</span>
                  <span className="estimate-value highlight">${priceEstimate.total}</span>
                </div>
                <span className="estimate-note">
                  {t(
                    'Startpreis-Schätzung. Endpreis wird auf unserer Buchungsplattform bestätigt. Zzgl. $139 einmalige Servicegebühr.',
                    'Starting price estimate. Final price confirmed on our booking platform. Plus $139 one-time service fee.'
                  )}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Error display */}
        {error && (
          <div style={{ marginTop: '1rem', padding: '0.75rem 1rem', borderRadius: '8px', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#fca5a5', fontSize: '0.875rem', textAlign: 'center' }}>
            {error}
          </div>
        )}
      </div>
    </section>
  );
}
