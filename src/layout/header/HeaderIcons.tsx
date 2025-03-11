import { FC } from 'react';
import { Link } from 'react-router';
import DropdownBtn, {
  DropdownItem,
} from '../../components/dropdownBtn/DropdownBtn';
import IconBtn from '../../components/IconBtn';
import IconContent from '../../components/IconContent';
import Icon, { IconName } from '../../components/icons/Icon';
import { SecondaryActionBtnProps } from '../../components/modal/Modal';
import ModalContainer from '../../components/modal/ModalContainer';
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
  const primaryActionBtn = {
    onClick: () => {
      console.log(123);
    },
    label: language.deleteAlbum,
  };
  const secondaryActionBtn: SecondaryActionBtnProps = {
    label: language.cancel,
  };

  return (
    <section>
      <ul className="header-icon-list">
        {/* <li className="header-icon">
          <IconBtn
            iconName={IconName.Search}
            title={language.search}
            onClick={onClick}
            ariaLabel={language.search}
          />
        </li> */}
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
          <Link to={MainPath.ShoppingCart} className="btn btn-ghost">
            <Icon iconName={IconName.ShoppingBack} title={language.bag} />
          </Link>
        </li>
        <li>
          <IconBtn
            iconName={IconName.Language}
            title={language.globe}
            onClick={() => {
              console.log(12);
            }}
            ariaLabel="Select preferred language and currency"
          />
        </li>
        <li>
          <ModalContainer
            triggerModalBtnContent={
              <IconContent
                iconName={IconName.Language}
                title={language.globe}
                ariaLabel="Select preferred language and currency"
              />
            }
            triggerModalBtnClassName="danger"
            id="recordId"
            primaryActionBtn={primaryActionBtn}
            secondaryActionBtn={secondaryActionBtn}
          >
            modal
          </ModalContainer>
        </li>
      </ul>
    </section>
  );
};

export default HeaderIcons;
