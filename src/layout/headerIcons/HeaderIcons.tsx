import { FC } from 'react';
import { Link } from 'react-router';
import DropdownBtn from '../../components/dropdownBtn/DropdownBtn';
import FieldSet from '../../components/fieldset/FieldSet';
import RadioButton from '../../components/formElements/radioButton/RadioButton';
import IconBtn from '../../components/IconBtn';
import IconContent from '../../components/IconContent';
import Icon, { IconName } from '../../components/icons/Icon';
import {
  PrimaryActionBtnProps,
  SecondaryActionBtnProps,
} from '../../components/modal/Modal';
import ModalContainer from '../../components/modal/ModalContainer';
import useAuth from '../../features/auth/hooks/useAuth';
import CurrencySelect from '../../features/currency/components/CurrencySelect';
import useLanguage, {
  languageOptions,
} from '../../features/language/useLanguage';
import { BtnVariant, SizeVariant } from '../../types/enums';
import { HeaderProps } from '../header/Header';
import { MainPath } from '../nav/enums';
import './_header-icons.scss';

type OmittedHeaderProps = Omit<HeaderProps, 'primaryActionBtn' | 'ariaLabel'>;

interface HeaderIconsProps extends OmittedHeaderProps {
  primaryActionBtn: PrimaryActionBtnProps;
}

const HeaderIcons: FC<HeaderIconsProps> = ({
  userDropdownList,
  primaryActionBtn,
  onChange,
  values,
  currencyOptions,
  defaultValue,
  onSelectCurrency,
}) => {
  const { language } = useLanguage();
  const { currentUser } = useAuth();

  const secondaryActionBtn: SecondaryActionBtnProps = {
    label: language.cancel,
  };

  const handleSearch = () => {
    console.log(12);
  };

  return (
    <section>
      <ul className="header-icon-list">
        <li className="header-icon">
          <IconBtn
            iconName={IconName.Search}
            title={language.search}
            onClick={handleSearch}
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
          <Link to={MainPath.ShoppingCart} className="btn btn-ghost">
            <Icon iconName={IconName.ShoppingBack} title={language.bag} />
          </Link>
        </li>
        <li className="header-icon">
          <ModalContainer
            triggerModalBtnContent={
              <IconContent
                iconName={IconName.Language}
                title={language.globe}
                ariaLabel={language.selectPreferences}
              />
            }
            triggerModalBtnVariant={BtnVariant.Ghost}
            id="languageId"
            primaryActionBtn={primaryActionBtn}
            secondaryActionBtn={secondaryActionBtn}
            modalSize={SizeVariant.Md}
            modalHeaderText="Pref"
          >
            <div className="preferences">
              <FieldSet legendText={language.selectLanguage} showLegendText>
                <RadioButton
                  radioButtonList={languageOptions}
                  name="languageOption"
                  initialChecked={values.languageOption}
                  onChange={onChange}
                  radioBtnVariant="card"
                />
              </FieldSet>
              <FieldSet legendText={language.selectCurrency} showLegendText>
                <CurrencySelect
                  inputHasNoLabel
                  options={currencyOptions}
                  defaultValue={defaultValue}
                  onSelectCurrency={onSelectCurrency}
                  labelText={language.currency}
                />
              </FieldSet>
            </div>
          </ModalContainer>
        </li>
      </ul>
    </section>
  );
};

export default HeaderIcons;
