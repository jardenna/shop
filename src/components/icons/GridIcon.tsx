import type { IconDefaultProps } from './Icon';

const GridIcon = ({ size, className, ariaHidden }: IconDefaultProps) => (
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
    <path d="M3 4h18" />
    <path d="M3 9h18" />
    <path d="M3 14h18" />
    <path d="M3 18h18" />
    <path d="M3 22h18" />
  </svg>
);

export default GridIcon;
