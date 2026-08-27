import Button from '../../../components/Button';
import { BtnVariant } from '../../../types/enums';

interface AdminOrderFooterProps {
  isCanceled: boolean;
  isDelivered: boolean;
  language: Record<string, string>;
  onCancelOrder: () => void;
}

const AdminOrderFooter = ({
  isCanceled,
  isDelivered,
  language,
  onCancelOrder,
}: AdminOrderFooterProps) => (
  <footer className="footer">
    <Button variant={BtnVariant.Secondary}>{language.printOrder}</Button>
    {!isCanceled && !isDelivered && (
      <Button onClick={onCancelOrder} variant={BtnVariant.Danger}>
        {language.cancelOrder}
      </Button>
    )}
  </footer>
);

export default AdminOrderFooter;
