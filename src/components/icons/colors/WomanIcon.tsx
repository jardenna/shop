import type { IconDefaultProps } from '../Icon';

const WomanIcon = ({
  size,
  title,
  className,
  ariaHidden,
  fill,
}: IconDefaultProps) => (
  <svg
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    className={className}
    viewBox="0 0 25 62"
    fill={fill || 'currentColor'}
    stroke="none"
    fillRule="evenodd"
    clipRule="evenodd"
    strokeLinejoin="round"
    strokeMiterlimit="2"
    aria-hidden={ariaHidden}
  >
    <title>{title}</title>
    <path
      d="m83.034 32.656-.002-.044c0-.663-.675-1.023-1.504-1.387l-2.912-1.289s-1.205.53-2.289 1.011a892.554 892.554 0 0 0-2.205-1.053l-3.006 1.331c-.829.364-1.503.648-1.503 1.387l-.003.044h13.424ZM80.851 25.916c-.835-2.627-.809-7.395-4.596-7.395-3.66 0-3.553 4.18-4.525 7.784-.411 1.52 1.364 2.356 2.912 2.71v-.702c-.714-.586-1.334-1.694-1.44-3.701 1.917-.168 3.943-1.156 5.713-2.438.284.501.451 1.111.451 1.819 0 2.435-.689 3.706-1.488 4.34v.727c1.684-.313 3.606-1.155 2.973-3.144ZM75.768 77.475V53.878a1.947 1.947 0 1 0-3.893 0v23.597h3.893ZM80.769 77.475V53.878a1.947 1.947 0 0 0-3.893 0v23.597h3.893ZM72.305 78v.823a1.518 1.518 0 0 0 3.034 0V78h-3.034ZM77.305 78v.823a1.518 1.518 0 0 0 3.034 0V78h-3.034Z"
      transform="translate(-64.092 -18.521)"
    />
    <path
      d="m82.996 32.465 5.483 15.899a1.362 1.362 0 0 1-2.577.88l-5.807-16.839 2.901.06ZM69.648 32.465l-5.483 15.899a1.362 1.362 0 0 0 2.577.88l5.807-16.839-2.901.06Z"
      transform="translate(-64.092 -18.521)"
    />
    <path
      d="M71.354 32.152h10.057v21.893H71.354z"
      transform="translate(-64.092 -18.521)"
    />
    <path
      d="M71.507 44.211h9.751l3.391 17.09H68.116l3.391-17.09Z"
      transform="translate(-64.092 -18.521)"
    />
  </svg>
);

export default WomanIcon;
