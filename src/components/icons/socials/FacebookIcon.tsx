import { IconDefaultProps } from '../Icon';

const FacebookIcon = ({ size, className, ariaHidden }: IconDefaultProps) => (
  <svg
    width={size}
    height={size}
    className={className}
    fillRule="evenodd"
    clipRule="evenodd"
    aria-hidden={ariaHidden}
    viewBox="0 0 16 16"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0ZM8.7698 7.99938V13.3333H6.70049V7.99958H5.66667V6.16147H6.70049V5.05788C6.70049 3.55835 7.28425 2.66667 8.94278 2.66667H10.3236V4.50499H9.46048C8.81485 4.50499 8.77214 4.76186 8.77214 5.24127L8.7698 6.16126H10.3333L10.1504 7.99938H8.7698Z" />
  </svg>
);

export default FacebookIcon;
