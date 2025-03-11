import { FC } from 'react';
import { Link } from 'react-router';
import DropdownBtn, {
  DropdownItem,
} from '../../components/dropdownBtn/DropdownBtn';
import RadioButton from '../../components/formElements/radioButton/RadioButton';
import IconContent from '../../components/IconContent';
import Icon, { IconName } from '../../components/icons/Icon';
import { SecondaryActionBtnProps } from '../../components/modal/Modal';
import ModalContainer from '../../components/modal/ModalContainer';
import useAuth from '../../features/auth/hooks/useAuth';
import useLanguage, {
  languageOptions,
} from '../../features/language/useLanguage';
import { BtnVariant } from '../../types/enums';
import { MainPath } from '../nav/enums';

interface HeaderIconsProps {
  onChange: any;
  primaryActionBtn: any;
  userDropdownList: DropdownItem[];

  values: any;
  className?: string;
}

const HeaderIcons: FC<HeaderIconsProps> = ({
  userDropdownList,
  primaryActionBtn,

  onChange,
  values,
}) => {
  const { language } = useLanguage();
  const { currentUser } = useAuth();

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
          <ModalContainer
            triggerModalBtnContent={
              <IconContent
                iconName={IconName.Language}
                title={language.globe}
                ariaLabel="Select preferred language and currency"
              />
            }
            triggerModalBtnVariant={BtnVariant.Ghost}
            id="languageId"
            primaryActionBtn={primaryActionBtn}
            secondaryActionBtn={secondaryActionBtn}
          >
            <RadioButton
              radioButtonList={languageOptions}
              name="languageOption"
              initialChecked={values.languageOption}
              onChange={onChange}
            />
          </ModalContainer>
        </li>
      </ul>
    </section>
  );
};

export default HeaderIcons;
