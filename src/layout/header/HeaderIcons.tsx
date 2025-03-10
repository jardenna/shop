import { FC } from 'react';
import { Link } from 'react-router';
import DropdownBtn, {
  DropdownItem,
} from '../../components/dropdownBtn/DropdownBtn';
import IconBtn from '../../components/IconBtn';
import IconContent from '../../components/IconContent';
import Icon, { IconName } from '../../components/icons/Icon';
import useAuth from '../../features/auth/hooks/useAuth';
import useLanguage from '../../features/language/useLanguage';
import { MainPath } from '../nav/enums';

interface HeaderIconsProps {
  userDropdownList: DropdownItem[];
  className?: string;
}

const HeaderIcons: FC<HeaderIconsProps> = ({ userDropdownList }) => {
  const { language } = useLanguage();
  const { currentUser } = useAuth();
  const onClick = () => {
    console.log(123);
  };
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
            <DropdownBtn
              username={currentUser.username}
              dropdownList={userDropdownList}
              ariaControls="user-dropdown"
            >
              <IconContent
                ariaLabel={language.myAccount}
                iconName={IconName.User}
                title={language.user}
              />
            </DropdownBtn>
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

        <li>
          <Icon iconName={IconName.Language} title={language.globe} />
        </li>
      </ul>
    </section>
  );
};

export default HeaderIcons;
