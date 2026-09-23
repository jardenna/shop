import { ErrorBoundary } from 'react-error-boundary';
import { CartItem } from '../../app/api/apiTypes/cartApiTypes';
import DropdownBtn from '../../components/dropdownBtn/DropdownBtn';
import ErrorBoundaryFallback from '../../components/ErrorBoundaryFallback';
import { useFavorites } from '../../components/favorites/useFavorites';
import IconContent from '../../components/IconContent';
import { useGetTotalQtyQuery } from '../../features/cart/cartApiSlice';
import { useLanguage } from '../../features/language/useLanguage';
import { localStorageKeys, useLocalStorage } from '../../hooks/useLocalStorage';
import { IconName } from '../../types/enums';
import type { HeaderProps } from '../header/Header';
import LanguageModal from '../header/languageModal/LanguageModal';
import { ShopPath } from '../nav/enums';
import HeaderBadgeLinks from './HeaderBadgeLinks';

const HeaderIcons = ({
  dropdownBtnList,
  onSubmit,
  onChange,
  values,
  currencyOptions,
  defaultValue,
  onSelectCurrency,
  localLanguage,
  currentUser,
}: HeaderProps) => {
  const { language } = useLanguage();
  const { favorites, onReset } = useFavorites({});
  const [cartItems] = useLocalStorage<CartItem[]>(
    localStorageKeys.cartItems,
    [],
  );

  const cartItemsLength = cartItems.length;
  const favoriteItemText =
    favorites && favorites.length === 1 ? language.item : language.items;

  const { data: qty } = useGetTotalQtyQuery(undefined, {
    skip: !currentUser,
  });

  const totalQuantity = qty?.totalQuantity ?? 0;

  const cartListItemText = totalQuantity === 1 ? language.item : language.items;

  return (
    <ErrorBoundary
      FallbackComponent={(props) => (
        <ErrorBoundaryFallback {...props} variant="small" />
      )}
      onReset={onReset}
    >
      <ul className="header-icon-list">
        <li>
          <DropdownBtn
            dropdownList={dropdownBtnList}
            placement="bottom-start"
            ariaHasPopup="menu"
            triggerBtnClassName="header-icon-btn"
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
            itemUpdatedText={language.itemsUpdated}
            itemText={cartListItemText}
            count={currentUser ? totalQuantity : cartItemsLength}
          />
        </li>
        <li>
          <LanguageModal
            values={values}
            onChange={onChange}
            currencyOptions={currencyOptions}
            defaultValue={defaultValue}
            onSelectCurrency={onSelectCurrency}
            localLanguage={localLanguage}
            onSubmit={onSubmit}
          />
        </li>
        <li>
          <HeaderBadgeLinks
            linkTo={ShopPath.Favorites}
            ariaLabel={language.viewYourFavorites}
            iconName={IconName.Heart}
            count={currentUser ? (favorites?.length ?? 0) : 0}
            itemUpdatedText={language.favoritesUpdated}
            itemText={favoriteItemText}
          />
        </li>
      </ul>
    </ErrorBoundary>
  );
};

export default HeaderIcons;
