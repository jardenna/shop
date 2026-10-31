import { GoalPeriod } from '../../../../app/api/apiTypes/dashboardGoalsApiTypes';
import DateRange from '../../../../components/datePicker/DateRange';
import { useLanguage } from '../../../language/useLanguage';

interface KpiCartPopupItemProps {
  endDate: Date;
  label: string;
  period: GoalPeriod;
  startDate: Date;
  text: string | number;
  isPrevious?: boolean;
}

const KpiCartPopupItem = ({
  period,
  startDate,
  endDate,
  text,
  label,
  isPrevious,
}: KpiCartPopupItemProps) => {
  const { language } = useLanguage();

  return (
    <div className="flex">
      <div>
        <p>
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
        <p>{text}</p>
        <p>{label}</p>
      </div>
    </div>
  );
};

export default KpiCartPopupItem;
