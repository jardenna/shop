import './_count-badge.scss';

interface CountBadgeProps {
  ariaLabel: string;
  count: number;
}

const CountBadge = ({ count, ariaLabel }: CountBadgeProps) => (
  <>
    <span className="count-badge" aria-hidden>
      {count}
    </span>
    <span className="visually-hidden" aria-live="polite" aria-atomic="true">
      {ariaLabel}
    </span>
  </>
);

export default CountBadge;
