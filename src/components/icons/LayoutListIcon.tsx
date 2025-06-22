import type { IconDefaultProps } from './Icon';

const LayoutListIcon = ({
  ariaHidden,
  className,
  size,
  title,
}: IconDefaultProps) => (
  <svg
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    className={className}
    viewBox="0 0 15 15"
    fill="currentColor"
    stroke="none"
    aria-hidden={ariaHidden}
  >
    <title>{title}</title>
    <rect x="10.9091" width="4.09091" height="4.09091" />
    <rect x="10.9091" y="5.45459" width="4.09091" height="4.09091" />
    <rect x="10.9091" y="10.9092" width="4.09091" height="4.09091" />
    <rect x="5.45459" width="4.09091" height="4.09091" />
    <rect x="5.45459" y="5.45459" width="4.09091" height="4.09091" />
    <rect x="5.45459" y="10.9092" width="4.09091" height="4.09091" />
    <rect width="4.09091" height="4.09091" />
    <rect y="5.45459" width="4.09091" height="4.09091" />
    <rect y="10.9092" width="4.09091" height="4.09091" />
  </svg>
);

export default LayoutListIcon;
