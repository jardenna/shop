import { Link } from 'react-router';
import { BtnVariant } from '../types/enums';
import { AriaCurrentType } from '../types/types';

type LinkButtonProps = {
  linkText: string;
  linkTo: string;
  ariaCurrent?: AriaCurrentType;
  className?: string;
  variant?: BtnVariant;
};

const LinkButton = ({
  variant = BtnVariant.Ghost,
  linkTo,
  linkText,
  ariaCurrent,
  className = '',
}: LinkButtonProps) => (
  <Link
    className={`btn btn-${variant} ${className}`}
    to={linkTo}
    aria-current={ariaCurrent}
  >
    <span className="btn-text">{linkText}</span>
  </Link>
);

export default LinkButton;
