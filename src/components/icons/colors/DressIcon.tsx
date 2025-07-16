import type { IconDefaultProps } from '../Icon';

const DressIcon = ({
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
    viewBox="120 0 470 470"
    fill="currentColor"
    stroke="none"
    aria-hidden={ariaHidden}
  >
    <title>{title}</title>
    <path d="m 268.767,1.146 c 37.83777,60.444247 -103.04443,60.510127 -65.834,0 -15.30518,-4.020295 -29.15245,7.2389441 -43.215,12.859 0,0 6.685,25.207 2.571,47.831 -9.80876,38.26087 15.701,76.42746 15.701,111.592 -26.31117,85.1886 -59.927,185.59956 -59.927,279.837 68.57528,22.07092 167.78751,21.9871 235.572,0.001 0,-94.23844 -34.45115,-194.6494 -59.89,-278.716 0,-37.06959 21.37827,-76.0119 15.656,-112.723 -4.111,-22.63 2.573,-47.831 2.573,-47.831 C 297.94049,8.0402047 281.94817,-3.0157588 268.767,1.146 Z" />
  </svg>
);

export default DressIcon;
