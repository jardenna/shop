import VisuallyHidden from '../VisuallyHidden';
import './_count-badge.scss';

interface CountBadgeProps {
  ariaLabel: string;
  count: number;
}

const CountBadge = ({ count, ariaLabel }: CountBadgeProps) => (
  <span className="count-badge">
    {count}
    <VisuallyHidden>{ariaLabel}</VisuallyHidden>
  </span>
);

export default CountBadge;
