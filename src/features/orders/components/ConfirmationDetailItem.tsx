import DateDisplay from '../../../components/datePicker/DateDisplay';

interface ConfirmationDetailItemProps {
  label: string;
  date?: Date;
  text?: string;
}

const ConfirmationDetailItem = ({
  label,
  text,
  date,
}: ConfirmationDetailItemProps) => (
  <li className="confirmation-detail-item">
    <p className="text-uppercase">{label}</p>
    {date ? <DateDisplay date={date} /> : <p>{text}</p>}
  </li>
);

export default ConfirmationDetailItem;
