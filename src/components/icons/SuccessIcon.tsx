import { FC } from 'react';
import { IconDefaultProps } from './Icon';

const SuccessIcon: FC<IconDefaultProps> = ({
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
    stroke="#04515f"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden={ariaHidden}
  >
    <title>{title}</title>
    <circle cx="12" cy="12" r="10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export default SuccessIcon;
