import { PeriodKpiResponse } from '../../../../app/api/apiTypes/dashboardApiTypes';
import { DashboardPeriod } from '../../../../app/api/apiTypes/dashboardGoalsApiTypes';
import { useCurrency } from '../../../currency/useCurrency';

interface KpiCartPopupProps {
  kpi: PeriodKpiResponse;
  language: Record<string, string>;
  period: DashboardPeriod;
}

const KpiCartPopup = ({ period, kpi, language }: KpiCartPopupProps) => {
  const isRevenue = kpi.key.toLowerCase().includes('revenue');
  const { convertedPrice } = useCurrency(kpi.value);
  const { convertedPrice: convertedPreviousPrice } = useCurrency(
    kpi.previousValue,
  );

  return (
    <section>
      <h3>{language.comparisonWithPreviousPeriod}</h3>
      Forrige {period} dage {language[kpi.key]}:{' '}
      {isRevenue ? convertedPreviousPrice : kpi.value} Seneste {period} dage{' '}
      {language[kpi.key]}: {isRevenue ? convertedPrice : kpi.value} Ændring +10
    </section>
  );
};

export default KpiCartPopup;
