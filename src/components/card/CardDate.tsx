import DateDisplay from '../datePicker/DateDisplay';

type CardDateProps = {
  date: Date;
  text: string;
  name?: string;
};

const CardDate = ({ name, date, text }: CardDateProps) => (
  <span className="admin-card-date">
    <span>
      {name} {text}{' '}
    </span>
    <DateDisplay date={date} hour="2-digit" minute="2-digit" />
  </span>
);

export default CardDate;
