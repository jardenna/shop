import { Link } from 'react-router';
import DropdownBtn from '../../components/dropdownBtn/DropdownBtn';
import useFavorites from '../../components/favorites/useFavorites';
import IconContent from '../../components/IconContent';
import type { PrimaryActionBtnProps } from '../../components/modal/Modal';
import ModalContainer from '../../components/modal/ModalContainer';
import VisuallyHidden from '../../components/VisuallyHidden';
import useLanguage from '../../features/language/useLanguage';
import { BtnVariant, IconName, SizeVariant } from '../../types/enums';
import type { HeaderProps } from '../header/Header';
import { ShopPath } from '../nav/enums';
import LanguageCurrencyPreferences from './LanguageCurrencyPreferences';

type OmittedHeaderProps = Omit<
  HeaderProps,
  'primaryActionBtn' | 'ariaLabel' | 'isMobileSize'
>;

type HeaderIconsProps = OmittedHeaderProps & {
  primaryActionBtn: PrimaryActionBtnProps;
};

const HeaderIcons = ({
  userDropdownList,
  primaryActionBtn,
  onChange,
  values,
  currencyOptions,
  defaultValue,
  onSelectCurrency,
  secondaryActionBtn,
}: HeaderIconsProps) => {
  const { language } = useLanguage();
  const { favorites } = useFavorites({});

  return (
    <ul className="header-icon-list">
      {/* <li>
          <IconBtn
            iconName={IconName.Search}
            title={language.search}
            onClick={handleSearch}
            ariaLabel={language.search}
          />
        </li> */}
      <li>
        <DropdownBtn
          dropdownList={userDropdownList}
          ariaControls="user-dropdown"
          placement="bottom-start"
        >
          <IconContent
            ariaLabel={language.myAccount}
            iconName={IconName.User}
            title={language.user}
          />
        </DropdownBtn>
      </li>
      <li>
        <Link to={ShopPath.ShoppingCart} className="btn btn-ghost">
          <IconContent
            iconName={IconName.ShoppingBag}
            title={language.bag}
            ariaLabel={language.viewCart}
          />
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
      <li>
        <Link to={ShopPath.Favorites} className="btn btn-ghost favorite-link">
          <IconContent
            iconName={IconName.Heart}
            title={language.heart}
            ariaLabel={language.viewYourFavorites}
          />
          {favorites.length > 0 && (
            <span className="favorites-count">
              {favorites.length}
              <VisuallyHidden> {language.productPlural}</VisuallyHidden>
            </span>
          )}
        </Link>
      </li>
    </ul>
  );
};

export default HeaderIcons;
