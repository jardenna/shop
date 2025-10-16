import type { IconDefaultProps } from '../Icon';

const KidIcon = ({ size, className, ariaHidden, fill }: IconDefaultProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    className={className}
    viewBox="0 0 24 46"
    fill={fill || 'currentColor'}
    stroke="none"
    fillRule="evenodd"
    clipRule="evenodd"
    strokeLinejoin="round"
    strokeMiterlimit="2"
    aria-hidden={ariaHidden}
  >
    <path
      d="M175.973 129.872c-.091-.999-.147-1.649-.147-1.649 0-.487.564-.75 1.258-1.017l2.438-.946 1.943 1.225 1.818-1.255 2.516.976c.694.267 1.258.475 1.258 1.017 0 0-.056.65-.147 1.649h-10.937Z"
      transform="translate(-170.022 -117.367)"
    />
    <path
      d="M177.017 145.262h8.966l.85-16.926h-10.666l.85 16.926ZM177.48 121.307a3.94 3.94 0 1 1 7.88 0 3.94 3.94 0 0 1-7.88 0Z"
      transform="translate(-170.022 -117.367)"
    />
    <path
      d="M186.119 141.01v20.499a1.826 1.826 0 0 1-1.824 1.824 1.827 1.827 0 0 1-1.825-1.824V141.01h3.649ZM180.564 141.01v20.499a1.826 1.826 0 0 1-1.824 1.824 1.827 1.827 0 0 1-1.825-1.824V141.01h3.649Z"
      transform="translate(-170.022 -117.367)"
    />
    <path
      d="m175.939 127.918-7.665 13.049a1.513 1.513 0 1 0 2.602 1.547l7.665-13.049-2.602-1.547Z"
      transform="rotate(-7.86 -764.313 1306.605)"
    />
    <path
      d="m186.332 127.461 14.652 3.788a1.515 1.515 0 0 1-.742 2.935l-14.652-3.788.742-2.935Z"
      transform="rotate(50.448 225.693 -110.659)"
    />
  </svg>
);

export default KidIcon;
