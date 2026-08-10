import Button from '../../../../../components/Button';
import DateDisplay from '../../../../../components/datePicker/DateDisplay';

interface MyOrderFooterProps {
  estimatedDelivery: Date;
  language: Record<string, string>;
  onViewDetails: () => void;
}

const MyOrderFooter = ({
  language,
  estimatedDelivery,
  onViewDetails,
}: MyOrderFooterProps) => (
  <footer className="my-order-footer">
    <div>
      {language.estimatedDelivery}: <DateDisplay date={estimatedDelivery} />
    </div>
    <Button onClick={onViewDetails}>{language.showDetails}</Button>
  </footer>
);

export default MyOrderFooter;
