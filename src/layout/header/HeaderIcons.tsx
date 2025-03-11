import { FC } from 'react';
import { Link } from 'react-router';
import { useAppSelector } from '../../app/hooks';
import DropdownBtn, {
  DropdownItem,
} from '../../components/dropdownBtn/DropdownBtn';
import IconBtn from '../../components/IconBtn';
import IconContent from '../../components/IconContent';
import Icon, { IconName } from '../../components/icons/Icon';
import Modal from '../../components/modal/Modal';
import useModal from '../../components/modal/useModal';
import useAuth from '../../features/auth/hooks/useAuth';
import useLanguage from '../../features/language/useLanguage';
import { selectModalId } from '../../features/modalSlice';
import { SizeVariant } from '../../types/enums';
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

  const { openModal } = useModal('loginModal');

  const modalId = useAppSelector(selectModalId);

  const handleLogin = () => {
    openModal();
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
            onClick={handleLogin}
            ariaLabel="Select preferred language and currency"
          />
        </li>
      </ul>

      {modalId && (
        <Modal
          id={modalId}
          modalSize={SizeVariant.Md}
          modalHeaderText="modalText"
          primaryActionBtn={{
            label: language.save,
            onClick: onClick,
          }}
        >
          hello
        </Modal>
      )}
    </section>
  );
};

export default HeaderIcons;
