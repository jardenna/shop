import LayoutElement from '../../layout/LayoutElement';
import Badge from '../badge/Badge';

type AdminCardHeadingProps = {
  ariaLabel: string;
  badgeClassName: string;
  badgeText: string;
  name: string;
  scheduledDate: Date | null;
};

const AdminCardHeading = ({
  scheduledDate,
  badgeClassName,
  name,
  badgeText,
  ariaLabel,
}: AdminCardHeadingProps) => (
  <div className="flex-justify-space-between ">
    <LayoutElement as="header" ariaLabel={ariaLabel}>
      <h2 className="admin-card-title">{name}</h2>
    </LayoutElement>

    <Badge
      badgeClassName={badgeClassName}
      badgeText={badgeText}
      scheduledDate={scheduledDate || null}
    />
  </div>
);

export default AdminCardHeading;
