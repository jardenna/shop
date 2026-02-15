import './_badge.scss';

type BadgeProps = {
  badgeText: string;
  className?: string;
};

const Badge = ({ badgeText, className = '' }: BadgeProps) => (
  <span className={`badge ${className}`}>
    <span>{badgeText}</span>
  </span>
);

export default Badge;
