import type { IconDefaultProps } from './Icon';

const RevenueIcon = ({ size, className, ariaHidden }: IconDefaultProps) => (
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
    <path d="M22 11.354V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2h8.536" />
    <path d="M22 10H2" />
    <path d="M6 14h2" />
    <path d="M16 17h6" />
    <path d="M19 14v6" />
  </svg>
);

export default RevenueIcon;
