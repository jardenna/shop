import Button from '../../../../components/Button';
import DateDisplay from '../../../../components/datePicker/DateDisplay';
import { BtnVariant } from '../../../../types/enums';

interface MyOrderFooterProps {
  estimatedDelivery: Date;
  language: Record<string, string>;
}

const MyOrderFooter = ({ language, estimatedDelivery }: MyOrderFooterProps) => (
  <footer className="my-order-footer">
    <div>
      {language.estimatedDelivery}:
      <DateDisplay date={estimatedDelivery} />
    </div>
    <Button variant={BtnVariant.Ghost}>{language.showDetails}</Button>
  </footer>
);

export default MyOrderFooter;
