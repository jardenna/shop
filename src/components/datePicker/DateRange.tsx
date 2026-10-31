import DateDisplay, { DateDisplayProps } from './DateDisplay';

interface DateRangeProps {
  endDate: Date;
  startDate: Date;
  day?: DateDisplayProps['day'];
  hour?: DateDisplayProps['hour'];
  minute?: DateDisplayProps['minute'];
  month?: DateDisplayProps['month'];
  year?: DateDisplayProps['year'];
}

const DateRange = ({
  startDate,
  endDate,
  ...formatOptions
}: DateRangeProps) => (
  <>
    <DateDisplay date={startDate} {...formatOptions} />
    {' - '}
    <DateDisplay date={endDate} {...formatOptions} />
  </>
);

export default DateRange;
