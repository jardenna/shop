import { Link } from 'react-router';
import { IconName } from '../types/enums';
import Icon from './icons/Icon';

type MoreLinkProps = {
  linkText: string;
  linkTo: string;
};

const MoreLink = ({ linkText, linkTo }: MoreLinkProps) => (
  <Link to={linkTo} className="more-link btn btn-ghost">
    {linkText}
    <Icon iconName={IconName.CircleChevronRight} />
  </Link>
);

export default MoreLink;
