import type { IconDefaultProps } from './Icon';

const ChevronRightIcon = ({
  size,
  className,
  ariaHidden,
}: IconDefaultProps) => (
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
    <path d="m9 18 6-6-6-6" />
  </svg>
);

export default ChevronRightIcon;
