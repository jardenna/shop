import { Status } from '../../app/api/apiTypes/adminApiTypes';
import AdminBadge from '../../features/products/components/AdminBadge';

interface AdminCartHeadingProps {
  name: string;
  scheduledDate: Date | null;
  status: Status;
}

const AdminCartHeading = ({
  scheduledDate,
  name,
  status,
}: AdminCartHeadingProps) => (
  <div className="admin-card-left-content">
    <p className="admin-card-left-title">{name}</p>
    <AdminBadge status={status} scheduledDate={scheduledDate || null} />
  </div>
);

export default AdminCartHeading;
