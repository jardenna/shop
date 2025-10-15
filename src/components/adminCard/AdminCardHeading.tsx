import { Status } from '../../app/api/apiTypes/adminApiTypes';
import AdminBadge from '../../features/products/components/AdminBadge';

type AdminCardHeadingProps = {
  name: string;
  scheduledDate: Date | null;
  status: Status;
};

const AdminCardHeading = ({
  scheduledDate,
  name,
  status,
}: AdminCardHeadingProps) => (
  <div className="admin-card-left-content">
    <p className="admin-card-left-title">{name}</p>
    <AdminBadge status={status} scheduledDate={scheduledDate || null} />
  </div>
);

export default AdminCardHeading;
