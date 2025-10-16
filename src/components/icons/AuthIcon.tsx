import type { IconDefaultProps } from './Icon';

const AuthIcon = ({ size, className, ariaHidden }: IconDefaultProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    className={className}
    viewBox="0 0 125 125"
    fill="none"
    stroke="currentcolor"
    strokeWidth="4"
    aria-hidden={ariaHidden}
  >
    <circle cx="58.1" cy="42.3" r="19.7" />
    <path d="M69.8 99.7H25.1c-5.9 0-10.2-6.6-8.6-13.2 3-12.6 10.1-23.3 19.6-29.9M80.1 56.6c1.4 1 2.8 2.1 4.1 3.2" />
    <path d="M80.1 56.6c1.3.9 2.5 1.8 3.7 2.9" />
    <circle cx="89.2" cy="82.8" r="19.7" />
    <circle cx="81.6" cy="81.8" r="4.1" />
    <path d="M85.7 81.8h15.2M94 81.8v6.1M97.5 81.8V86" />
  </svg>
);

export default AuthIcon;
