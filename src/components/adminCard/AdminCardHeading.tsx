import { Status } from '../../app/api/apiTypes/adminApiTypes';
import AdminBadge from '../../features/products/components/AdminBadge';
import LayoutElement from '../../layout/LayoutElement';

type AdminCardHeadingProps = {
  ariaLabel: string;
  name: string;
  scheduledDate: Date | null;
  status: Status;
};

const AdminCardHeading = ({
  scheduledDate,
  name,
  status,
  ariaLabel,
}: AdminCardHeadingProps) => (
  <div className="flex-justify-space-between">
    <LayoutElement ariaLabel={ariaLabel}>
      <h2>{name}</h2>
    </LayoutElement>
    <AdminBadge status={status} scheduledDate={scheduledDate || null} />
  </div>
);

export default AdminCardHeading;
