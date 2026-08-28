import DateDisplay from '../../../../components/datePicker/DateDisplay';

interface MyOrderDetailItemProps {
  label: string;
  date?: Date;
  text?: string;
}

const MyOrderDetailItem = ({ label, text, date }: MyOrderDetailItemProps) => (
  <li className="confirmation-detail-item">
    <p className="text-uppercase">{label}</p>
    {date ? <DateDisplay date={date} /> : <p>{text}</p>}
  </li>
);

export default MyOrderDetailItem;
