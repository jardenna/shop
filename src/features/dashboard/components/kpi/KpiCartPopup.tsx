import { PeriodKpiResponse } from '../../../../app/api/apiTypes/dashboardApiTypes';
import {
  GoalKeys,
  GoalPeriod,
} from '../../../../app/api/apiTypes/dashboardGoalsApiTypes';
import Chip from '../../../../components/chips/Chip';
import { useCurrency } from '../../../currency/useCurrency';
import KpiCartPopupItem from './KpiCartPopupItem';

interface KpiCartPopupProps {
  kpi: PeriodKpiResponse;
  language: Record<string, string>;
  period: GoalPeriod;
}

const KpiCartPopup = ({ period, kpi, language }: KpiCartPopupProps) => {
  const isRevenue = kpi.key.toLowerCase().includes('revenue');
  const chipText = kpi.value - kpi.previousValue;

  const { convertedPrice: convertedChipPrice } = useCurrency(chipText);

  const popupLabelKeys: Record<GoalKeys, string> = {
    newCustomers: 'customers',
    orders: 'orders',
    revenue: 'revenue',
  };

  const popupLabel = language[popupLabelKeys[kpi.key]];

  const chipVariant = chipText > 0 ? 'success' : 'danger';

  return (
    <section className="kpi-cart-popup">
      <h3 className="kpi-popup-title">
        {language.comparisonWithPreviousPeriod}
      </h3>
      <KpiCartPopupItem
        endDate={kpi.currentPeriod.endDate}
        startDate={kpi.currentPeriod.startDate}
        period={period}
        isRevenue={isRevenue}
        count={kpi.value}
        label={popupLabel}
      />
      <KpiCartPopupItem
        endDate={kpi.previousPeriod.endDate}
        startDate={kpi.previousPeriod.startDate}
        period={period}
        count={kpi.previousValue}
        label={popupLabel}
        isPrevious
        isRevenue={isRevenue}
      />

      <div className="kpi-value-info">
        {language.netChangeInPeriod}
        <Chip
          chipText={`${isRevenue ? convertedChipPrice : chipText}`}
          variant={chipVariant}
        />
      </div>
    </section>
  );
};

export default KpiCartPopup;
