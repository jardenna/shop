import { Link } from 'react-router';
import useLanguage from '../features/language/useLanguage';
import { IconName } from '../types/enums';
import Icon from './icons/Icon';

type MoreLinkProps = {
  linkText: string;
  linkTo: string;
};

const MoreLink = ({ linkText, linkTo }: MoreLinkProps) => {
  const { language } = useLanguage();
  return (
    <Link to={linkTo} className="more-link btn btn-ghost">
      {linkText}
      <Icon
        iconName={IconName.CircleChevronRight}
        title={language.circleChevronRight}
      />
    </Link>
  );
};

export default MoreLink;
