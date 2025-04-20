import { Link } from 'react-router';
import { MainPath } from '../layout/nav/enums';
import { BtnVariant } from '../types/enums';

type LinkButtonProps = {
  linkText: string;
  linkTo: MainPath | string;
  variant?: BtnVariant;
};

const LinkButton = ({
  variant = BtnVariant.Primary,
  linkTo,
  linkText,
}: LinkButtonProps) => (
  <Link className={`btn btn-${variant}`} to={linkTo}>
    <span className="button-text">{linkText}</span>
  </Link>
);

export default LinkButton;
