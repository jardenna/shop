import { ErrorBoundary } from 'react-error-boundary';
import { useAppSelector } from '../../app/hooks';
import ActionNavBtn from '../../components/dropdownBtn/ActionNavBtn';
import ErrorBoundaryFallback from '../../components/ErrorBoundaryFallback';
import { useFavorites } from '../../components/favorites/useFavorites';
import IconContent from '../../components/IconContent';
import { useAuth } from '../../features/auth/hooks/useAuth';
import { useGetTotalQtyQuery } from '../../features/cart/cartApiSlice';
import { selectCartList } from '../../features/cartSlice';
import { useLanguage } from '../../features/language/useLanguage';
import type { HeaderProps } from '../header/Header';
import LanguageModal from '../header/languageModal/LanguageModal';
import { ShopPath } from '../nav/navConstants';
import HeaderBadgeLinks from './HeaderBadgeLinks';

const HeaderIcons = ({
  dropdownBtnList,
  onSubmit,
  onChange,
  values,
  localLanguage,
}: HeaderProps) => {
  const { language } = useLanguage();
  const { favorites, onReset } = useFavorites({});
  const cartItems = useAppSelector(selectCartList);
  const { currentUser } = useAuth();

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
          <ActionNavBtn
            actionNavDropdownList={dropdownBtnList}
            placement="bottom-start"
            ariaHasPopup="menu"
            triggerBtnClassName="header-icon-btn"
          >
            <IconContent ariaLabel={language.myAccount} iconName="user" />
          </ActionNavBtn>
        </li>
        <li>
          <HeaderBadgeLinks
            linkTo={ShopPath.ShoppingCart}
            ariaLabel={language.viewCart}
            iconName="shoppingBag"
            itemUpdatedText={language.itemsUpdated}
            itemText={cartListItemText}
            count={currentUser ? totalQuantity : cartItemsLength}
          />
        </li>
        <li>
          <LanguageModal
            values={values}
            onChange={onChange}
            localLanguage={localLanguage}
            onSubmit={onSubmit}
          />
        </li>
        <li>
          <HeaderBadgeLinks
            linkTo={ShopPath.Favorites}
            ariaLabel={language.viewYourFavorites}
            iconName="heart"
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
