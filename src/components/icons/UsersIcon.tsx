import { FC } from 'react';
import { IconDefaultProps } from './Icon';

const UsersIcon: FC<IconDefaultProps> = ({
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
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden={ariaHidden}
  >
    <title>{title}</title>
    <path d="M18 21a8 8 0 0 0-16 0" />
    <circle cx="10" cy="8" r="5" />
    <path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3" />
  </svg>
);

export default UsersIcon;
