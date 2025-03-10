import { FC } from 'react';
import { IconDefaultProps } from './Icon';

const AccountIcon: FC<IconDefaultProps> = ({
  size,
  title,
  className,
  ariaHidden,
}) => (
  <svg
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    className={className}
    viewBox="0 0 125 125"
    fill="none"
    stroke="currentcolor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeMiterlimit="10"
    aria-hidden={ariaHidden}
  >
    <title>{title}</title>
    <circle cx="57" cy="42.4" r="19.7" />
    <path d="M67.3 99.8H24c-5.9 0-10.2-6.6-8.6-13.2C18.4 74 25.5 63.3 35 56.7M79.3 56.7c3.9 2.7 7.4 6.1 10.4 10" />
    <path d="M94.4 99.2h2.1c1.6 0 2.8-1.3 2.9-2.8v0c0-1.6-1.3-2.9-2.9-2.9H78.1c-1.8 0-3.3-1.2-3.8-2.9v0c-.5-1.3.5-2.7 1.9-2.7h22.3c1 0 2-.5 2.6-1.3l8.5-12.4c.9-1.4 0-3.2-1.7-3.2H68.5M83.2 99.2h5.1M56.6 68h3.8c1.7 0 3.3 1.1 3.8 2.8l7.6 24.7c.7 2.2 2.7 3.7 5 3.7" />
    <circle cx="80" cy="99.5" r="2.8" />
    <circle cx="91.4" cy="99.5" r="2.8" />
    <path d="M70.7 76.6h32M73.1 82.3h25.1" />
  </svg>
);

export default AccountIcon;
