import './_badge.scss';

interface BadgeProps {
  badgeText: string;
  className?: string;
  variant?: 'small' | 'large';
}

const Badge = ({
  badgeText,
  className = '',
  variant = 'large',
}: BadgeProps) => (
  <span className={`badge badge-${variant} ${className}`}>
    <span>{badgeText}</span>
  </span>
);

export default Badge;
