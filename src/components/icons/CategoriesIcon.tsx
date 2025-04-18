import { IconDefaultProps } from './Icon';

const CategoriesIcon = ({
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
    <path d="M11 13v4" />
    <path d="M15 5v4" />
    <path d="M3 3v16a2 2 0 0 0 2 2h16" />
    <rect x="7" y="13" width="9" height="4" rx="1" />
    <rect x="7" y="5" width="12" height="4" rx="1" />
  </svg>
);

export default CategoriesIcon;
