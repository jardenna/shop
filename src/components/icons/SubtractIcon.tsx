import { FC } from 'react';
import { IconDefaultProps } from './Icon';

const SubtractIcon: FC<IconDefaultProps> = ({ size, title, className }) => (
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
  >
    <title>{title}</title>
    <path d="M0 3.6V0h17.964v3.6H0z" fillRule="nonzero" />
  </svg>
);

export default SubtractIcon;
