import { PeriodKpiResponse } from '../../../../app/api/apiTypes/dashboardApiTypes';
import {
  GoalKeys,
  GoalPeriod,
} from '../../../../app/api/apiTypes/dashboardGoalsApiTypes';
import { useCurrency } from '../../../currency/useCurrency';
import KpiCartPopupItem from './KpiCartPopupItem';

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

  const popupLabelKeys: Record<GoalKeys, string> = {
    newCustomers: 'customers',
    orders: 'orders',
    revenue: 'revenue',
  };

  const currentValue = isRevenue ? convertedPrice : kpi.value;
  const previousValue = isRevenue ? convertedPreviousPrice : kpi.previousValue;
  const popupLabel = language[popupLabelKeys[kpi.key]];

  return (
    <section className="kpi-cart-popup">
      <h3 className="kpi-popup-title">
        {language.comparisonWithPreviousPeriod}
      </h3>
      <KpiCartPopupItem
        endDate={kpi.currentPeriod.endDate}
        startDate={kpi.currentPeriod.startDate}
        period={period}
        count={currentValue}
        label={popupLabel}
      />
      <KpiCartPopupItem
        endDate={kpi.previousPeriod.endDate}
        startDate={kpi.previousPeriod.startDate}
        period={period}
        count={previousValue}
        label={popupLabel}
        isPrevious
      />

      <p>
        {language.change}: {kpi.value - kpi.previousValue}
      </p>
    </section>
  );
};

export default KpiCartPopup;
