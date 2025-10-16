import type { IconDefaultProps } from './Icon';

const ShoppingBagIcon = ({ ariaHidden, className, size }: IconDefaultProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="none"
    aria-hidden={ariaHidden}
  >
    <path d="M20.677 13.654a5.23 5.23 0 0 0 1.073-3.194c-.01-2.632-1.968-4.78-4.5-5.137V5.25a5.25 5.25 0 0 0-10.5 0v.059a5.2 5.2 0 0 0-2.444 1.014 5.23 5.23 0 0 0-.983 7.33A5.623 5.623 0 0 0 6.375 24h11.25a5.623 5.623 0 0 0 3.052-10.346M12 1.5a3.75 3.75 0 0 1 3.75 3.75h-7.5A3.75 3.75 0 0 1 12 1.5m5.625 21H6.375a4.122 4.122 0 0 1-1.554-7.942.75.75 0 0 0 .214-1.256A3.7 3.7 0 0 1 3.75 10.5a3.755 3.755 0 0 1 3-3.674V9a.75.75 0 0 0 1.5 0V6.75h7.5V9a.75.75 0 1 0 1.5 0V6.826a3.755 3.755 0 0 1 3 3.674 3.7 3.7 0 0 1-1.285 2.802.75.75 0 0 0 .213 1.256 4.122 4.122 0 0 1-1.553 7.942" />
  </svg>
);

export default ShoppingBagIcon;
