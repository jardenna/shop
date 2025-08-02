import { Status } from '../../app/api/apiTypes/adminApiTypes';
import LayoutElement from '../../layout/LayoutElement';
import Badge from '../badge/Badge';

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
      <h2 className="admin-card-title">{name}</h2>
    </LayoutElement>
    <Badge status={status} scheduledDate={scheduledDate || null} />
  </div>
);

export default AdminCardHeading;
