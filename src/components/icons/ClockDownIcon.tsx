import type { IconDefaultProps } from './Icon';

const ClockDownIcon = ({ size, className, ariaHidden }: IconDefaultProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    className={className}
    fill="none"
    stroke="currentcolor"
    viewBox="0 0 24 24"
    fillRule="evenodd"
    strokeLinejoin="round"
    strokeMiterlimit="2"
    strokeWidth="2"
    aria-hidden={ariaHidden}
  >
    <path d="M12 6v6l2 1" />
    <path d="M12.337 21.994a10 10 0 1 1 9.588-8.767" />
    <path d="m14 18 4 4 4-4" />
    <path d="M18 14v8" />
  </svg>
);

export default ClockDownIcon;
