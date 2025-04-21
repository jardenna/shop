import { Link } from 'react-router';
import useLanguage from '../features/language/useLanguage';
import { MainPath } from '../layout/nav/enums';
import { IconName } from '../types/enums';
import Icon from './icons/Icon';

type MoreLinkProps = {
  linkText: string;
  linkTo: MainPath | string;
};

const MoreLink = ({ linkText, linkTo }: MoreLinkProps) => {
  const { language } = useLanguage();
  return (
    <Link to={linkTo} className="btn btn-ghost more-link">
      {linkText}
      <Icon
        ariaHidden
        iconName={IconName.CircelChevronRight}
        title={language.circelChevronRight}
      />
    </Link>
  );
};

export default MoreLink;
