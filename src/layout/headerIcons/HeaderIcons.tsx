import { FC } from 'react';
import { Link } from 'react-router';
import DropdownBtn from '../../components/dropdownBtn/DropdownBtn';
import IconBtn from '../../components/IconBtn';
import IconContent from '../../components/IconContent';
import Icon, { IconName } from '../../components/icons/Icon';
import { PrimaryActionBtnProps } from '../../components/modal/Modal';
import ModalContainer from '../../components/modal/ModalContainer';
import useLanguage from '../../features/language/useLanguage';
import { BtnVariant, SizeVariant } from '../../types/enums';
import { HeaderProps } from '../header/Header';
import LanguageCurrencyPreferences from '../headerIconsComponents/LanguageCurrencyPreferences';
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
  secondaryActionBtn,
}) => {
  const { language } = useLanguage();

  const handleSearch = () => {
    console.log(12);
  };

  return (
    <section>
      <ul className="header-icon-list">
        <li>
          <IconBtn
            iconName={IconName.Search}
            title={language.search}
            onClick={handleSearch}
            ariaLabel={language.search}
          />
        </li>
        <li>
          <DropdownBtn
            dropdownList={userDropdownList}
            ariaControls="user-dropdown"
          >
            <IconContent
              ariaLabel={language.myAccount}
              iconName={IconName.User}
              title={language.user}
            />
          </DropdownBtn>
        </li>
        <li>
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
                ariaLabel={language.selectPreferences}
              />
            }
            triggerModalBtnVariant={BtnVariant.Ghost}
            id="languageId"
            primaryActionBtn={primaryActionBtn}
            secondaryActionBtn={secondaryActionBtn}
            modalSize={SizeVariant.Md}
            modalHeaderText={language.preferences}
          >
            <LanguageCurrencyPreferences
              values={values}
              onChange={onChange}
              currencyOptions={currencyOptions}
              defaultValue={defaultValue}
              onSelectCurrency={onSelectCurrency}
            />
          </ModalContainer>
        </li>
      </ul>
    </section>
  );
};

export default HeaderIcons;
