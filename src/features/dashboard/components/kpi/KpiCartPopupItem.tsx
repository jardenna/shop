import { GoalPeriod } from '../../../../app/api/apiTypes/dashboardGoalsApiTypes';
import DateRange from '../../../../components/datePicker/DateRange';
import { useLanguage } from '../../../language/useLanguage';

interface KpiCartPopupItemProps {
  count: string | number;
  endDate: Date;
  label: string;
  period: GoalPeriod;
  startDate: Date;
  isPrevious?: boolean;
}

const KpiCartPopupItem = ({
  period,
  startDate,
  endDate,
  count,
  label,
  isPrevious,
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
        <p className="text-bold popup-item-count">{count}</p>
        <p>{label}</p>
      </div>
    </div>
  );
};

export default KpiCartPopupItem;
