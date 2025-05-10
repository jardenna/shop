import { Link } from 'react-router';
import { BtnVariant } from '../types/enums';

type LinkButtonProps = {
  linkText: string;
  linkTo: string;
  variant?: BtnVariant;
};

const LinkButton = ({
  variant = BtnVariant.Primary,
  linkTo,
  linkText,
}: LinkButtonProps) => (
  <Link className={`btn btn-${variant}`} to={linkTo}>
    <span className="btn-text">{linkText}</span>
  </Link>
);

export default LinkButton;
