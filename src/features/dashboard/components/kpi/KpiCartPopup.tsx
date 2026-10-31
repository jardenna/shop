import { PeriodKpiResponse } from '../../../../app/api/apiTypes/dashboardApiTypes';
import {
  GoalKeys,
  GoalPeriod,
} from '../../../../app/api/apiTypes/dashboardGoalsApiTypes';
import DateRange from '../../../../components/datePicker/DateRange';
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
  const popupLabelKeys: Record<GoalKeys, string> = {
    newCustomers: 'customers',
    orders: 'orders',
    revenue: 'revenue',
  };

  const popupLabel = language[popupLabelKeys[kpi.key]];

  return (
    <section>
      <h3>{language.comparisonWithPreviousPeriod}</h3>

      <div className="flex">
        <div>
          <p>Seneste {period} dage</p>
          <p>
            <DateRange
              month="short"
              day="numeric"
              endDate={kpi.currentPeriod.endDate}
              startDate={kpi.currentPeriod.startDate}
            />
          </p>
        </div>
        <div>
          <p>{isRevenue ? convertedPrice : kpi.value}</p>
          <p>{popupLabel}</p>
        </div>
      </div>
      <div className="flex">
        <div>
          <p>Forrige {period} dage</p>
          <p>
            <DateRange
              month="short"
              day="numeric"
              endDate={kpi.previousPeriod.endDate}
              startDate={kpi.previousPeriod.startDate}
            />
          </p>
        </div>
        <div>
          <p>{isRevenue ? convertedPreviousPrice : kpi.previousValue}</p>
          <p>{popupLabel}</p>
        </div>
      </div>
      <p>
        {language.change}: {kpi.value - kpi.previousValue}
      </p>
    </section>
  );
};

export default KpiCartPopup;
