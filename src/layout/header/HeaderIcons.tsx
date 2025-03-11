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
import useFormValidation from '../../hooks/useFormValidation';
import { BtnVariant } from '../../types/enums';
import { MainPath } from '../nav/enums';

interface HeaderIconsProps {
  userDropdownList: DropdownItem[];
  value: string;
  className?: string;
  onLanguageChange: (selectedLanguage: string) => void;
}

const HeaderIcons: FC<HeaderIconsProps> = ({
  userDropdownList,
  onLanguageChange,
  value,
}) => {
  const { language } = useLanguage();
  const { currentUser } = useAuth();

  const initialState = {
    languageOption: value,
  };

  const { onChange, onSubmit, values } = useFormValidation({
    callback: (values) => {
      onLanguageChange(values.languageOption);
    },
    initialState,
  });

  const primaryActionBtn = {
    onClick: onSubmit,
    label: 'ok',
    buttonType: 'submit',
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
