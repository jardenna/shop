import { FC } from 'react';
import { IconDefaultProps } from './Icon';

const SearchIcon: FC<IconDefaultProps> = ({
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
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden={ariaHidden}
  >
    <title>{title}</title>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

export default SearchIcon;

{
  /* <svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round"
  className="lucide lucide-search"
>
  <circle cx="11" cy="11" r="8" />
  <path d="m21 21-4.3-4.3" />
</svg>; */
}
