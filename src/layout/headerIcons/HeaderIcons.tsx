import { ErrorBoundary } from 'react-error-boundary';
import { Link } from 'react-router';
import DropdownBtn from '../../components/dropdownBtn/DropdownBtn';
import ErrorBoundaryFallback from '../../components/ErrorBoundaryFallback';
import useFavorites from '../../components/favorites/useFavorites';
import IconContent from '../../components/IconContent';
import ModalContainer from '../../components/modal/ModalContainer';
import VisuallyHidden from '../../components/VisuallyHidden';
import useLanguage from '../../features/language/useLanguage';
import { BtnVariant, IconName, SizeVariant } from '../../types/enums';
import type { HeaderProps } from '../header/Header';
import { ShopPath } from '../nav/enums';
import LanguageCurrencyPreferences from './LanguageCurrencyPreferences';

type OmitChecked<T, K extends keyof T> = Omit<T, K>;

type OmittedHeaderProps = OmitChecked<HeaderProps, 'isMobileSize'>;

const HeaderIcons = ({
  dropdownBtnList,
  primaryActionBtn,
  onChange,
  values,
  currencyOptions,
  defaultValue,
  onSelectCurrency,
}: OmittedHeaderProps) => {
  const { language } = useLanguage();
  const { favorites, onReset } = useFavorites({});

  return (
    <ErrorBoundary FallbackComponent={ErrorBoundaryFallback} onReset={onReset}>
      <ul className="header-icon-list">
        {/* <li>
            <IconBtn
              iconName={IconName.Search}
              onClick={handleSearch}
              ariaLabel={language.search}
            />
          </li> */}
        <li>
          <DropdownBtn
            dropdownList={dropdownBtnList}
            ariaControls="user-dropdown"
            placement="bottom-start"
            ariaHasPopup="menu"
          >
            <IconContent
              ariaLabel={language.myAccount}
              iconName={IconName.User}
            />
          </DropdownBtn>
        </li>
        <li>
          <Link to={ShopPath.ShoppingCart} className="btn btn-ghost">
            <IconContent
              iconName={IconName.ShoppingBag}
              ariaLabel={language.viewCart}
            />
          </Link>
        </li>
        <li>
          <ModalContainer
            triggerModalBtnContent={
              <IconContent
                iconName={IconName.Language}
                ariaLabel={language.selectPreferences}
              />
            }
            triggerModalBtnVariant={BtnVariant.Ghost}
            id="languageId"
            primaryActionBtn={primaryActionBtn}
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
              ariaLabel={language.viewYourFavorites}
            />
            {favorites && favorites.length > 0 && (
              <span className="favorites-count">
                {favorites.length}
                <VisuallyHidden> {language.productPlural}</VisuallyHidden>
              </span>
            )}
          </Link>
        </li>
      </ul>
    </ErrorBoundary>
  );
};

export default HeaderIcons;
