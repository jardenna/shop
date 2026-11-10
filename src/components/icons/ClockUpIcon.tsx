import type { IconDefaultProps } from './Icon';

const ClockUpIcon = ({ size, className, ariaHidden }: IconDefaultProps) => (
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
    <path d="M12 6v6l1.56.78" />
    <path d="M13.227 21.925a10 10 0 1 1 8.767-9.588" />
    <path d="m14 18 4-4 4 4" />
    <path d="M18 22v-8" />
  </svg>
);

export default ClockUpIcon;
