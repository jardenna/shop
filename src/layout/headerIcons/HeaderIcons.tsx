import { ErrorBoundary } from 'react-error-boundary';
import DropdownBtn from '../../components/dropdownBtn/DropdownBtn';
import ErrorBoundaryFallback from '../../components/ErrorBoundaryFallback';
import { useFavorites } from '../../components/favorites/useFavorites';
import IconContent from '../../components/IconContent';
import ModalContainer from '../../components/modal/ModalContainer';
import { useActiveCart } from '../../features/cart/useActiveCart';
import { useLanguage } from '../../features/language/useLanguage';
import { BtnVariant, IconName, SizeVariant } from '../../types/enums';
import type { BaseHeaderProps } from '../header/Header';
import { ShopPath } from '../nav/enums';
import HeaderBadgeLinks from './HeaderBadgeLinks';
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
}: BaseHeaderProps) => {
  const { language } = useLanguage();
  const { favorites, onReset } = useFavorites({});

  const favoriteItemText =
    favorites && favorites.length === 1 ? language.item : language.items;

  const { activeCartList } = useActiveCart();
  const cartListItemText =
    activeCartList.length === 1 ? language.item : language.items;

  return (
    <ErrorBoundary FallbackComponent={ErrorBoundaryFallback} onReset={onReset}>
      <ul className="header-icon-list">
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
          <HeaderBadgeLinks
            linkTo={ShopPath.ShoppingCart}
            ariaLabel={language.viewCart}
            iconName={IconName.ShoppingBag}
            count={activeCartList.length}
            itemUpdatedText={language.itemsUpdated}
            itemText={cartListItemText}
          />
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
          <HeaderBadgeLinks
            linkTo={ShopPath.Favorites}
            ariaLabel={language.viewYourFavorites}
            iconName={IconName.Heart}
            count={favorites?.length || null}
            itemUpdatedText={language.favoritesUpdated}
            itemText={favoriteItemText}
          />
        </li>
      </ul>
    </ErrorBoundary>
  );
};

export default HeaderIcons;
