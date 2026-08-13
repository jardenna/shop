import { Status } from '../../app/api/apiTypes/adminApiTypes';
import AdminBadge from './AdminBadge';

interface CartHeadingProps {
  name: string;
  scheduledDate: Date | null;
  status: Status;
}

const CartHeading = ({ scheduledDate, name, status }: CartHeadingProps) => (
  <div className="admin-cart-left-content">
    <p className="admin-cart-left-title">{name}</p>
    <AdminBadge status={status} scheduledDate={scheduledDate || null} />
  </div>
);

export default CartHeading;
