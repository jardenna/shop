import DateDisplay from '../datePicker/DateDisplay';

type CategoryScheduledDateProps = {
  date: Date;
  text: string;
  name?: string;
};

const CategoryDate = ({ name, date, text }: CategoryScheduledDateProps) => (
  <span className="category-date">
    <span>
      {name} {text}{' '}
    </span>
    <DateDisplay date={date} hour="2-digit" minute="2-digit" />
  </span>
);

export default CategoryDate;
