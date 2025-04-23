import DateDisplay from '../datePicker/DateDisplay';

type CategoryScheduledDateProps = {
  name: string;
  publishText: string;
  scheduledDate: Date;
};

const CategoryScheduledDate = ({
  name,
  scheduledDate,
  publishText,
}: CategoryScheduledDateProps) => (
  <span className="category-date">
    <span>
      {name} {publishText}
    </span>
    <DateDisplay date={scheduledDate} hour="2-digit" minute="2-digit" />
  </span>
);

export default CategoryScheduledDate;
