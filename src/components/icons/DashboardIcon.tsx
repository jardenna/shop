import { FC } from 'react';
import { IconDefaultProps } from './Icon';

const DashboardIcon: FC<IconDefaultProps> = ({
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
    strokeWidth="3"
    strokeLinecap="round"
    strokeMiterlimit="10"
    aria-hidden={ariaHidden}
  >
    <title>{title}</title>
    <rect width="7" height="9" x="3" y="3" rx="1" />
    <rect width="7" height="5" x="14" y="3" rx="1" />
    <rect width="7" height="9" x="14" y="12" rx="1" />
    <rect width="7" height="5" x="3" y="16" rx="1" />
  </svg>
);

export default DashboardIcon;
