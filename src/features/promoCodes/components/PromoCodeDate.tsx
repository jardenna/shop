import DateDisplay from '../../../components/datePicker/DateDisplay';

interface PromoCodeDateProps {
  date: string;
}

const PromoCodeDate = ({ date }: PromoCodeDateProps) => (
  <DateDisplay
    date={date}
    hour="2-digit"
    minute="2-digit"
    month="short"
    year="2-digit"
  />
);

export default PromoCodeDate;
