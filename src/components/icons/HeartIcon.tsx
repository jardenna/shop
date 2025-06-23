import type { IconDefaultProps } from './Icon';

const HeartIcon = ({
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
    fill="none"
    stroke="currentcolor"
    viewBox="0 0 24 24"
    fillRule="evenodd"
    strokeLinejoin="round"
    strokeMiterlimit="2"
    strokeWidth="2"
    aria-hidden={ariaHidden}
  >
    <title>{title}</title>
    <svg
      role="img"
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      width="24"
    >
      <path d="M20.46 4.54a5.25 5.25 0 0 0-7.425 0l-1.034 1.034-1.037-1.034a5.25 5.25 0 0 0-7.423 7.425L12 20.424l8.459-8.46a5.25 5.25 0 0 0 0-7.424Z" />
    </svg>
  </svg>
);

export default HeartIcon;
