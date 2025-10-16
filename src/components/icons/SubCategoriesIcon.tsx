import type { IconDefaultProps } from './Icon';

const CategoriesIcon = ({ ariaHidden, className, size }: IconDefaultProps) => (
  <svg
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
    <path d="M10 6h8" />
    <path d="M12 16h6" />
    <path d="M3 3v16a2 2 0 0 0 2 2h16" />
    <path d="M8 11h7" />
  </svg>
);

export default CategoriesIcon;
