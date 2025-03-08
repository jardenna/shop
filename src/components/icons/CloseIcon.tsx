import { FC } from 'react';
import { IconDefaultProps } from './Icon';

const CloseIcon: FC<IconDefaultProps> = ({
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

    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

export default CloseIcon;
