import { skipToken } from '@reduxjs/toolkit/query';
import { useEffect } from 'react';
import {
  Outlet,
  ScrollRestoration,
  useLocation,
  useNavigate,
} from 'react-router';
import { useAppDispatch } from '../app/hooks';
import type { ActionNavItemProps } from '../components/dropdownBtn/ActionNavBtn';
import { IconName } from '../components/icons/iconConstants';
import SkipLink from '../components/skipLinks/SkipLinks';
import { useLogoutMutation } from '../features/auth/authApiSlice';
import { useAuth } from '../features/auth/hooks/useAuth';
import { useCurrency } from '../features/currency/useCurrency';
import { useGetFavoritesQuery } from '../features/favorites/favoritesApiSlice';
import { useLanguage } from '../features/language/useLanguage';
import { closeMiniCard } from '../features/miniCardPopupSlice';
import MiniCardPopup from '../features/shop/components/miniCardPopup/MiniCardPopup';
import { clearErrorToasts } from '../features/toastSlice';
import { useFormValidation } from '../hooks/useFormValidation';
import { useMediaQuery } from '../hooks/useMediaQuery';
import danishLang from '../locales/da.json';
import englishLang from '../locales/en.json';
import RouteErrorBoundary from '../pages/pageContainer/RouteErrorBoundary';
import Footer from './footer/Footer';
import Header from './header/Header';
import { AdminPath, ShopPath } from './nav/navConstants';

const Layout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { language, switchLanguage, selectedLanguage } = useLanguage();

  // Clear all popups whenever the user navigates
  useEffect(() => {
    dispatch(closeMiniCard());
    dispatch(clearErrorToasts());
  }, [pathname, dispatch]);

  // Hooks
  const { currentUser, isEmployee } = useAuth();
  const { onChangePrice, exchangeRate } = useCurrency();
  const [logout] = useLogoutMutation();
  const { isMobileSize } = useMediaQuery();

  const { data: favorites = [], refetch } = useGetFavoritesQuery(
    currentUser ? undefined : skipToken,
  );

  useEffect(() => {
    if (currentUser && favorites.length === 0) {
      refetch();
    }
  }, [currentUser, refetch, favorites.length]);

  const handleLogout = () => {
    logout();
    navigate(ShopPath.Root);
  };

  function handleChangePreferences() {
    switchLanguage(values.languageOption);
    onChangePrice(values.currencyOption);
  }

  // Initial state
  const initialState = {
    languageOption: selectedLanguage,
    currencyOption: exchangeRate,
  };

  const { values, onChange } = useFormValidation({
    initialState,
  });

  const localLanguage =
    values.languageOption === 'da' ? danishLang : englishLang;

  const accountDropdownList: ActionNavItemProps[] = [
    {
      label: language.myAccount,
      isActive: pathname.includes(ShopPath.MyAccount),
      onClick: () =>
        navigate(currentUser ? `/${ShopPath.MyAccount}` : `/${ShopPath.Login}`),
      iconName: 'auth',
    },
    {
      label: language.myOrders,
      isActive: pathname.includes(ShopPath.MyOrders),
      onClick: () => navigate(ShopPath.MyOrders),
      iconName: 'basket',
    },
    ...(isEmployee
      ? [
          {
            label: language.dashboard,
            onClick: () => navigate(AdminPath.Admin),
            iconName: IconName.Lock,
          },
        ]
      : []),
    {
      label: currentUser ? language.logout : language.login,
      onClick: currentUser
        ? handleLogout
        : () => navigate(`/${ShopPath.Login}`),
      iconName: currentUser ? 'logout' : 'login',
    },
  ];

  return (
    <div className="main-container">
      {!isMobileSize && <SkipLink />}
      <Header
        localLanguage={localLanguage}
        dropdownBtnList={accountDropdownList}
        isMobileSize={isMobileSize}
        onSubmit={handleChangePreferences}
        values={values}
        onChange={onChange}
      />
      <RouteErrorBoundary>
        <>
          <main id="main">
            <Outlet />
            <MiniCardPopup />
          </main>
          <Footer />
        </>
      </RouteErrorBoundary>
      <ScrollRestoration />
    </div>
  );
};

export default Layout;
