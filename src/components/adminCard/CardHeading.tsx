import type { Status } from '../../app/api/apiTypes/adminApiTypes';
import AdminBadge from './AdminBadge';

interface CardHeadingProps {
  name: string;
  scheduledDate: Date | null;
  status: Status;
}

const CardHeading = ({ scheduledDate, name, status }: CardHeadingProps) => (
  <div className="admin-card-heading">
    <p className="admin-card-left-title">{name}</p>
    <AdminBadge status={status} scheduledDate={scheduledDate || null} />
  </div>
);

export default CardHeading;
