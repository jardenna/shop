import Button from '../../../components/Button';
import { BtnVariant } from '../../../types/enums';

interface AdminOrderFooterProps {
  isCanceled: boolean;
  isDelivered: boolean;
  language: Record<string, string>;
}

const AdminOrderFooter = ({
  isCanceled,
  isDelivered,
  language,
}: AdminOrderFooterProps) => (
  <footer className="footer">
    <Button variant={BtnVariant.Secondary}>{language.printOrder}</Button>
    {!isCanceled && !isDelivered && (
      <Button variant={BtnVariant.Danger}>{language.cancelOrder}</Button>
    )}
  </footer>
);

export default AdminOrderFooter;
