import type { IconDefaultProps } from './Icon';

const GridLargeIcon = ({ size, className, ariaHidden }: IconDefaultProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden={ariaHidden}
  >
    <rect width="18" height="18" x="3" y="3" rx="2" />
    <path d="M3 12h18" />
  </svg>
);

export default GridLargeIcon;
