import { GoalPeriod } from '../../../../app/api/apiTypes/dashboardGoalsApiTypes';
import DateRange from '../../../../components/datePicker/DateRange';
import { useLanguage } from '../../../language/useLanguage';
import ConvertedPrice from '../../../shop/components/ConvertedPrice';

interface KpiCartPopupItemProps {
  count: number;
  endDate: Date;
  isRevenue: boolean;
  label: string;
  period: GoalPeriod;
  startDate: Date;
  isPrevious?: boolean;
}

const KpiCartPopupItem = ({
  period,
  startDate,
  endDate,
  label,
  isPrevious,
  count,
  isRevenue,
}: KpiCartPopupItemProps) => {
  const { language } = useLanguage();

  return (
    <div className="kpi-cart-popup-item">
      <div>
        <p className="text-bold">
          {isPrevious ? language.previous : language.last}{' '}
          {period === 365 ? language.years : `${period} ${language.days}`}
        </p>
        <p>
          <DateRange
            month="short"
            day="numeric"
            endDate={endDate}
            startDate={startDate}
          />
        </p>
      </div>
      <div>
        <p className="text-bold popup-item-count">
          {isRevenue ? <ConvertedPrice price={count} /> : <span>{count}</span>}
        </p>
        <p>{label}</p>
      </div>
    </div>
  );
};

export default KpiCartPopupItem;
