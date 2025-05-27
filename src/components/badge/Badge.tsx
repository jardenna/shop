import './_badge.scss';

type BadgeProps = {
  badgeText: string;
  className: string;
};

const Badge = ({ className, badgeText }: BadgeProps) => (
  <span className={`badge ${className}`}>
    <span>{badgeText}</span>
  </span>
);

export default Badge;
