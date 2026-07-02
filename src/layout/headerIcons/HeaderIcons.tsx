import { ErrorBoundary } from 'react-error-boundary';
import { Link } from 'react-router';
import CountBadge from '../../components/countBadge/CountBadge';
import DropdownBtn from '../../components/dropdownBtn/DropdownBtn';
import ErrorBoundaryFallback from '../../components/ErrorBoundaryFallback';
import { useFavorites } from '../../components/favorites/useFavorites';
import IconContent from '../../components/IconContent';
import ModalContainer from '../../components/modal/ModalContainer';
import { useLanguage } from '../../features/language/useLanguage';
import { BtnVariant, IconName, SizeVariant } from '../../types/enums';
import type { BaseHeaderProps } from '../header/Header';
import { ShopPath } from '../nav/enums';
import LanguageCurrencyPreferences from './LanguageCurrencyPreferences';

const HeaderIcons = ({
  dropdownBtnList,
  primaryActionBtn,
  onChange,
  values,
  currencyOptions,
  defaultValue,
  onSelectCurrency,
  localLanguage,
  cartList,
}: BaseHeaderProps) => {
  const { language } = useLanguage();
  const { favorites, onReset } = useFavorites({});
  console.log(cartList);

  const itemText =
    favorites && favorites.length === 1 ? language.item : language.items;

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
            secondaryActionBtn={{
              label: localLanguage.cancel,
            }}
            triggerModalBtnContent={
              <IconContent
                iconName={IconName.Language}
                ariaLabel={localLanguage.selectPreferences}
              />
            }
            triggerModalBtnVariant={BtnVariant.Ghost}
            id="languageId"
            primaryActionBtn={primaryActionBtn}
            modalSize={SizeVariant.Md}
            modalHeaderText={localLanguage.preferences}
          >
            <LanguageCurrencyPreferences
              values={values}
              onChange={onChange}
              currencyOptions={currencyOptions}
              defaultValue={defaultValue}
              onSelectCurrency={onSelectCurrency}
              localLanguage={localLanguage}
            />
          </ModalContainer>
        </li>
        <li>
          <span className="position-relative">
            <Link to={ShopPath.Favorites} className="btn btn-ghost">
              <IconContent
                iconName={IconName.Heart}
                ariaLabel={language.viewYourFavorites}
              />
            </Link>
            {favorites && favorites.length > 0 && (
              <CountBadge
                count={favorites.length}
                ariaLabel={`${language.favoritesUpdated} ${favorites.length} ${itemText}`}
              />
            )}
          </span>
        </li>
      </ul>
    </ErrorBoundary>
  );
};

export default HeaderIcons;
