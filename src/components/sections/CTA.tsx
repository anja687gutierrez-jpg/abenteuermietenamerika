import { useLanguage } from '../../context/LanguageContext';
import { LiquidMetalButton } from '../ui/LiquidMetalButton';

/**
 * CTA — Final call-to-action section
 *
 * Uses CSS classes from design-system.css:
 *   .cta, .cta-content, .cta-title, .cta-text
 */
export function CTA() {
  const { t, config } = useLanguage();

  return (
    <section className="cta" id="contact">
      <div className="cta-content">
        <h2 className="cta-title">
          {t('Bereit für Ihr USA-Abenteuer?', 'Ready for Your USA Adventure?')}
        </h2>
        <p className="cta-text">
          {t(
            'Starten Sie noch heute mit der Planung Ihres ultimativen Roadtrips. Unser Team steht Ihnen 24/7 zur Verfügung.',
            'Start planning your ultimate road trip today. Our team is available 24/7.'
          )}
        </p>
        <LiquidMetalButton
          href={config.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          speed={0.4}
          repetition={6}
          softness={0.6}
          shiftBlue={0.4}
          scale={10}
        >
          {t('Jetzt Kontaktieren', 'Contact Us Now')}
        </LiquidMetalButton>
      </div>
    </section>
  );
}
