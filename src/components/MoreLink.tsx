import { Link, type LinkProps } from 'react-router';
import { IconName } from '../types/enums';
import Icon from './icons/Icon';

interface MoreLinkProps {
  linkText: string;
  linkTo: string;
  state?: LinkProps['state'];
}

const MoreLink = ({ linkText, linkTo, state }: MoreLinkProps) => (
  <Link to={linkTo} className="more-link btn btn-ghost" state={state}>
    {linkText}
    <Icon iconName={IconName.CircleChevronRight} />
  </Link>
);

export default MoreLink;
