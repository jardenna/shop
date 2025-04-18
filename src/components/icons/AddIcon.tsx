import { IconDefaultProps } from './Icon';

const AddIcon = ({ size, title, className, ariaHidden }: IconDefaultProps) => (
  <svg
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    className={className}
    viewBox="0 0 18 19"
    fillRule="evenodd"
    strokeLinejoin="round"
    strokeMiterlimit="2"
    aria-hidden={ariaHidden}
  >
    <title>{title}</title>
    <path
      d="M0 10.908v-3.6h7.092V0h3.744v7.308h7.128v3.6h-7.128v7.308H7.092v-7.308H0z"
      fillRule="nonzero"
    />
  </svg>
);

export default AddIcon;
