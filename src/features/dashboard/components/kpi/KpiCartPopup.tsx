import { PeriodKpiResponse } from '../../../../app/api/apiTypes/dashboardApiTypes';
import { GoalPeriod } from '../../../../app/api/apiTypes/dashboardGoalsApiTypes';
import DateDisplay from '../../../../components/datePicker/DateDisplay';
import { useCurrency } from '../../../currency/useCurrency';
interface KpiCartPopupProps {
  kpi: PeriodKpiResponse;
  language: Record<string, string>;
  period: GoalPeriod;
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
      <p>
        Forrige {period} dage:{' '}
        <DateDisplay date={kpi.previousPeriod.startDate} /> -
        <DateDisplay date={kpi.previousPeriod.endDate} /> {language[kpi.key]}:{' '}
        {isRevenue ? convertedPreviousPrice : kpi.previousValue}
      </p>
      <p>
        Seneste {period} dage :{' '}
        <DateDisplay date={kpi.currentPeriod.startDate} /> -{' '}
        <DateDisplay date={kpi.currentPeriod.endDate} /> {language[kpi.key]}:{' '}
        {isRevenue ? convertedPrice : kpi.value}
      </p>
      <p>
        {language.change}: {kpi.value - kpi.previousValue}
      </p>
    </section>
  );
};

export default KpiCartPopup;
