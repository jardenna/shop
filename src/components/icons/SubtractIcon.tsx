import type { IconDefaultProps } from './Icon';

const SubtractIcon = ({
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
    viewBox="0 0 18 4"
    fillRule="evenodd"
    strokeLinejoin="round"
    strokeMiterlimit="2"
    aria-hidden={ariaHidden}
  >
    <title>{title}</title>
    <path d="M0 3.6V0h17.964v3.6H0z" fillRule="nonzero" />
  </svg>
);

export default SubtractIcon;
