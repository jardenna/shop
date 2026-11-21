import type {
  GoalKeys,
  GoalPeriod,
} from '../../../../app/api/apiTypes/adminGoalsApiTypes';
import type { PeriodKpiResponse } from '../../../../app/api/apiTypes/dashboardApiTypes';
import Chip from '../../../../components/chips/Chip';
import type { Language } from '../../../../shared/types';
import { useCurrency } from '../../../currency/useCurrency';
import KpiCardPopupItem from './KpiCardPopupItem';

interface KpiCardPopupProps {
  kpi: PeriodKpiResponse;
  language: Language;
  period: GoalPeriod;
}

const KpiCardPopup = ({ period, kpi, language }: KpiCardPopupProps) => {
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
    <section className="kpi-card-popup">
      <h3 className="kpi-popup-title">
        {language.comparisonWithPreviousPeriod}
      </h3>
      <KpiCardPopupItem
        endDate={kpi.currentPeriod.endDate}
        startDate={kpi.currentPeriod.startDate}
        period={period}
        isRevenue={isRevenue}
        count={kpi.value}
        label={popupLabel}
      />
      <KpiCardPopupItem
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

export default KpiCardPopup;
