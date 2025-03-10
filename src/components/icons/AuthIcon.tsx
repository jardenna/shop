import { FC } from 'react';
import { IconDefaultProps } from './Icon';

const AuthIcon: FC<IconDefaultProps> = ({
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
    viewBox="0 0 125 125"
    fill="none"
    stroke="currentcolor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeMiterlimit="10"
    aria-hidden={ariaHidden}
  >
    <title>{title}</title>
    <circle className="st0" cx="58.1" cy="42.3" r="19.7" />
    <path
      className="st1"
      d="M69.8 99.7H25.1c-5.9 0-10.2-6.6-8.6-13.2 3-12.6 10.1-23.3 19.6-29.9M80.1 56.6c1.4 1 2.8 2.1 4.1 3.2"
    />
    <path className="st1" d="M80.1 56.6c1.3.9 2.5 1.8 3.7 2.9" />
    <circle className="st1" cx="89.2" cy="82.8" r="19.7" />
    <circle className="st1" cx="81.6" cy="81.8" r="4.1" />
    <path className="st1" d="M85.7 81.8h15.2M94 81.8v6.1M97.5 81.8V86" />
  </svg>
);

export default AuthIcon;
