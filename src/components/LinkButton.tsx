import { Link } from 'react-router';
import { BtnVariant } from '../types/enums';

export type LinkButtonProps = {
  linkText: string;
  linkTo: string;
  ariaCurrent?: any;
  variant?: BtnVariant;
};

const LinkButton = ({
  variant = BtnVariant.Ghost,
  linkTo,
  linkText,
  ariaCurrent,
}: LinkButtonProps) => (
  <Link className={`btn btn-${variant}`} to={linkTo} aria-current={ariaCurrent}>
    <span className="btn-text">{linkText}</span>
  </Link>
);

export default LinkButton;
