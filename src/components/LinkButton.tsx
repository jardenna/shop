import { Link, type LinkProps } from 'react-router';
import { BtnVariant, type BtnVariantValue } from '../types/enums';
import type { AriaCurrentType } from '../types/types';

interface LinkButtonProps {
  linkText: string;
  linkTo: string;
  ariaCurrent?: AriaCurrentType;
  className?: string;
  state?: LinkProps['state'];
  variant?: BtnVariantValue;
}

const LinkButton = ({
  variant = BtnVariant.Ghost,
  linkTo,
  linkText,
  state,
  ariaCurrent,
  className = '',
}: LinkButtonProps) => (
  <Link
    className={`btn btn-${variant} ${className}`}
    to={linkTo}
    state={state}
    aria-current={ariaCurrent}
  >
    <span className="btn-text">{linkText}</span>
  </Link>
);

export default LinkButton;
