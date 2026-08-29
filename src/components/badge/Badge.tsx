import './_badge.scss';

interface BadgeProps {
  badgeText: string;
  className?: string;
  showDot?: boolean;
  variant?: 'small' | 'medium' | 'large';
}

const Badge = ({
  badgeText,
  className = '',
  variant = 'small',
  showDot,
}: BadgeProps) => (
  <span className={`badge badge-${variant} ${className}`}>
    {showDot && <span className="badge-dot" aria-hidden />}{' '}
    <span>{badgeText}</span>
  </span>
);

export default Badge;
