import type { IconDefaultProps } from './Icon';

const LayoutGridIcon = ({
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
    fill="currentcolor"
    stroke="none"
    aria-hidden={ariaHidden}
  >
    <title>{title}</title>
    <rect x="6.09106" y="1.36353" width="9.54545" height="1.36364" />
    <rect x="6.09106" y="6.81812" width="9.54545" height="1.36364" />
    <rect x="6.09106" y="12.2727" width="9.54545" height="1.36364" />
    <rect x="0.636475" width="4.09091" height="4.09091" />
    <rect x="0.636475" y="5.45459" width="4.09091" height="4.09091" />
    <rect x="0.636475" y="10.9092" width="4.09091" height="4.09091" />
  </svg>
);

export default LayoutGridIcon;
