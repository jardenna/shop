import './_badge.scss';

type BadgeProps = {
  badgeText: string;
  className: string;
};

const Badge = ({ className, badgeText }: BadgeProps) => (
  <div className={`badge ${className}`}>
    <span>{badgeText}</span>
  </div>
);

export default Badge;
