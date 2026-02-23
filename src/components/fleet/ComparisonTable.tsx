import { useLanguage } from '../../context/LanguageContext';

// ---------------------------------------------------------------------------
// Vehicle comparison data
// ---------------------------------------------------------------------------

interface ComparisonRow {
  label: { de: string; en: string };
  budget: string;
  comfort: string;
  offgrid: string;
}

const ROWS: ComparisonRow[] = [
  { label: { de: 'Fahrzeug', en: 'Vehicle' }, budget: 'Model Y (RWD)', comfort: 'Model Y (RWD)', offgrid: 'Cybertruck (Tri-Motor)' },
  { label: { de: 'Preis ab', en: 'From' }, budget: '$119/Tag', comfort: '$216/Tag', offgrid: '$299/Tag' },
  { label: { de: 'Reichweite', en: 'Range' }, budget: '330 mi', comfort: '225 mi*', offgrid: '340 mi' },
  { label: { de: '0-60 mph', en: '0-60 mph' }, budget: '4.8s', comfort: '6.8s', offgrid: '2.6s' },
  { label: { de: 'Laden', en: 'Charging' }, budget: '250 kW', comfort: '250 kW', offgrid: '350 kW' },
  { label: { de: 'Stauraum', en: 'Storage' }, budget: '68 cu ft', comfort: '68 cu ft', offgrid: '121 cu ft' },
  { label: { de: 'Sitze', en: 'Seats' }, budget: '5', comfort: '5', offgrid: '6' },
  { label: { de: 'Zelt', en: 'Tent' }, budget: 'Bodenzelt (4P)', comfort: 'Dachzelt (2P)', offgrid: 'Dachzelt (4P)' },
  { label: { de: 'K\u00fchlbox', en: 'Cooler' }, budget: '30L K\u00fchlbox', comfort: 'Yeti 45', offgrid: 'Dometic 55L K\u00fchlschrank' },
  { label: { de: 'Starlink', en: 'Starlink' }, budget: '\u2014', comfort: '\u2014', offgrid: '\u2713' },
  { label: { de: 'Solar', en: 'Solar' }, budget: '\u2014', comfort: '\u2014', offgrid: '\u2713' },
  { label: { de: 'V2H Strom', en: 'V2H Power' }, budget: '\u2014', comfort: '\u2014', offgrid: '\u2713' },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ComparisonTable() {
  const { t } = useLanguage();

  const headerStyle: React.CSSProperties = {
    padding: 'var(--space-3) var(--space-4)',
    fontFamily: 'var(--font-display)',
    fontWeight: 'var(--weight-bold)' as any,
    fontSize: 'var(--text-base)',
    color: 'var(--color-white)',
    textAlign: 'center',
  };

  const cellStyle: React.CSSProperties = {
    padding: 'var(--space-3) var(--space-4)',
    fontSize: 'var(--text-sm)',
    color: 'var(--color-text-primary)',
    textAlign: 'center',
    borderBottom: '1px solid var(--color-border-light)',
  };

  const labelCell: React.CSSProperties = {
    ...cellStyle,
    textAlign: 'left',
    fontWeight: 'var(--weight-medium)' as any,
    color: 'var(--color-text-muted)',
  };

  return (
    <section
      style={{ padding: 'var(--space-16) 0', background: 'var(--color-white)' }}
    >
      <div className="container">
        <div className="sec-head">
          <h2 className="sec-title">
            {t('Fahrzeug-Vergleich', 'Vehicle Comparison')}
          </h2>
          <p className="sec-sub">
            {t(
              'Alle Pakete im \u00dcberblick \u2014 finden Sie das perfekte Setup.',
              'All packages at a glance \u2014 find your perfect setup.'
            )}
          </p>
        </div>

        <div
          style={{
            maxWidth: '900px',
            margin: '0 auto',
            overflowX: 'auto',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--color-border-light)',
            boxShadow: 'var(--shadow-card)',
          }}
        >
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontFamily: 'var(--font-body)',
              minWidth: '600px',
            }}
          >
            <thead>
              <tr>
                <th style={{ ...headerStyle, background: 'var(--color-slate-800)', textAlign: 'left' }}>
                  {t('Merkmal', 'Feature')}
                </th>
                <th style={{ ...headerStyle, background: 'var(--color-slate-600)' }}>
                  Budget
                </th>
                <th
                  style={{
                    ...headerStyle,
                    background: 'var(--color-emerald-600)',
                  }}
                >
                  Camping-Paket
                </th>
                <th
                  style={{
                    ...headerStyle,
                    background: 'var(--color-amber-600)',
                  }}
                >
                  Off-Grid
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, i) => (
                <tr
                  key={i}
                  style={{
                    background: i % 2 === 0 ? 'var(--color-white)' : 'var(--color-slate-50)',
                  }}
                >
                  <td style={labelCell}>{t(row.label.de, row.label.en)}</td>
                  <td style={cellStyle}>{row.budget}</td>
                  <td style={cellStyle}>{row.comfort}</td>
                  <td style={cellStyle}>{row.offgrid}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p
          style={{
            textAlign: 'center',
            fontSize: 'var(--text-xs)',
            color: 'var(--color-text-muted)',
            marginTop: 'var(--space-4)',
          }}
        >
          {t(
            '* Reichweite reduziert durch Dachzelt-Aerodynamik. Alle Angaben zur Veranschaulichung.',
            '* Range reduced by rooftop tent aerodynamics. All specs for illustration purposes.'
          )}
        </p>
      </div>
    </section>
  );
}
