import { FC } from 'react';
import { Link } from 'react-router';
import DropdownBtn from '../../components/dropdownBtn/DropdownBtn';
import IconBtn from '../../components/IconBtn';
import IconContent from '../../components/IconContent';
import Icon, { IconName } from '../../components/icons/Icon';
import useAuth from '../../features/auth/hooks/useAuth';
import useLanguage from '../../features/language/useLanguage';
import { MainPath } from '../nav/enums';

interface HeaderIconsProps {
  className?: string;
  onClick: () => void;
}

const HeaderIcons: FC<HeaderIconsProps> = ({ onClick }) => {
  const { language } = useLanguage();
  const { currentUser } = useAuth();

  return (
    <section>
      <ul className="header-icon-list">
        <li className="header-icon">
          <IconBtn
            iconName={IconName.Search}
            title={language.search}
            onClick={onClick}
            ariaLabel={language.search}
          />
        </li>
        <li className="header-icon">
          {currentUser ? (
            <DropdownBtn username={currentUser.username} />
          ) : (
            <Link to={MainPath.Login}>
              <IconContent
                ariaLabel={language.myAccount}
                iconName={IconName.User}
                title={language.user}
              />
            </Link>
          )}
        </li>
        <li className="header-icon">
          <IconBtn
            iconName={IconName.ShoppingBack}
            title={language.bag}
            onClick={onClick}
            ariaLabel={language.myBag}
          />
        </li>
        <li className="header-icon">
          <IconBtn
            iconName={IconName.Currency}
            title={language.currency}
            onClick={onClick}
            ariaLabel={language.currency}
          />
        </li>
        <li>
          <Icon iconName={IconName.Language} title="" />
        </li>
      </ul>
    </section>
  );
};

export default HeaderIcons;
