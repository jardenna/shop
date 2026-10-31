import { GoalPeriod } from '../../../../app/api/apiTypes/dashboardGoalsApiTypes';
import DateRange from '../../../../components/datePicker/DateRange';

interface KpiCartPopupItemProps {
  endDate: Date;
  label: string;
  period: GoalPeriod;
  startDate: Date;
  text: string | number;
}

const KpiCartPopupItem = ({
  period,
  startDate,
  endDate,
  text,
  label,
}: KpiCartPopupItemProps) => (
  <div className="flex">
    <div>
      <p>Seneste {period} dage</p>
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

export default KpiCartPopupItem;
