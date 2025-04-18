import { IconDefaultProps } from './Icon';

const ArrowUpIcon = ({
  size,
  title,
  className,
  ariaHidden,
}: IconDefaultProps) => (
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
    <path d="m5 12 7-7 7 7" />
    <path d="M12 19V5" />
  </svg>
);

export default ArrowUpIcon;
