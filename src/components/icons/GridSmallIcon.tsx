import type { IconDefaultProps } from './Icon';

const GridSmallIcon = ({ size, className, ariaHidden }: IconDefaultProps) => (
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
    <path d="M21 7.5H3" />
    <path d="M21 12H3" />
    <path d="M21 16.5H3" />
  </svg>
);

export default GridSmallIcon;
