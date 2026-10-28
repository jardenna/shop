import type { IconDefaultProps } from './Icon';

const NewOrdersIcon = ({ size, className, ariaHidden }: IconDefaultProps) => (
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
    <path d="M16 5h6" />
    <path d="M19 2v6" />
    <path d="m2.05 2.05 1.099-.028a1 1 0 011.008.815l2.69 14.347A1 1 0 007.83 18H18" />
    <path d="M4.564 5H12" />
    <path d="M6.25 14h12.712a2 2 0 001.991-1.57l.172-1.041" />
    <circle cx="18" cy="20" r="2" />
    <circle cx="8" cy="20" r="2" />
  </svg>
);

export default NewOrdersIcon;
