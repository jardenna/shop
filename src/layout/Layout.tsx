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
import { clearErrorToasts } from '../features/toastSlice';
import { useFormValidation } from '../hooks/useFormValidation';
import { useMediaQuery } from '../hooks/useMediaQuery';
import danishLang from '../locales/da.json';
import englishLang from '../locales/en.json';
import RouteErrorBoundary from '../pages/pageContainer/RouteErrorBoundary';
import type { OptionType } from '../shared/types';
import Footer from './footer/Footer';
import Header from './header/Header';
import { AdminPath, ShopPath } from './nav/navConstants';
import MiniCardPopup from '../features/shop/components/miniCardPopup/MiniCardPopup';

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
  const { currentUser, isAuthReady, isEmployee } = useAuth();
  const { currencyOptions, onChangePrice, exchangeRate } = useCurrency();
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

  const handleSelectCurrency = (name: string, selectedOptions: OptionType) => {
    onCustomChange(name, selectedOptions.value);
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

  const { onChange, values, onCustomChange } = useFormValidation({
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
        defaultValue={{
          label: exchangeRate,
          value: exchangeRate,
          id: exchangeRate,
        }}
        onChange={onChange}
        onSubmit={handleChangePreferences}
        values={values}
        currencyOptions={currencyOptions}
        currentUser={currentUser}
        isAuthReady={isAuthReady}
        onSelectCurrency={(selectedOptions: OptionType) => {
          handleSelectCurrency('currencyOption', selectedOptions);
        }}
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
