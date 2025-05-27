import ScheduledDateBadge from '../card/ScheduledDateBadge';

type AdminCardHeadingProps = {
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
}: AdminCardHeadingProps) => (
  <div className="admin-card-heading">
    <h2 className="admin-card-title">{name}</h2>
    <ScheduledDateBadge
      badgeClassName={badgeClassName}
      badgeText={badgeText}
      scheduledDate={scheduledDate || null}
    />
  </div>
);

export default AdminCardHeading;
