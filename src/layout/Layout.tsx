import { skipToken } from '@reduxjs/toolkit/query';
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { useAppDispatch } from '../app/hooks';
import { DropdownItem } from '../components/dropdownBtn/DropdownBtn';
import Icon from '../components/icons/Icon';
import type { PrimaryActionBtnProps } from '../components/modal/Modal';
import SkipLink from '../components/skipLinks/SkipLinks';
import { useLogoutMutation } from '../features/auth/authApiSlice';
import { useAuth } from '../features/auth/hooks/useAuth';
import { useCurrency } from '../features/currency/useCurrency';
import { useGetFavoritesQuery } from '../features/favorites/favoritesApiSlice';
import { useLanguage } from '../features/language/useLanguage';
import { clearMessagePopups } from '../features/messagePopupSlice';
import { closeMiniCart } from '../features/miniCartPopupSlice';
import { useFormValidation } from '../hooks/useFormValidation';
import { useMediaQuery } from '../hooks/useMediaQuery';
import danishLang from '../locales/da.json';
import englishLang from '../locales/en.json';
import { IconName } from '../types/enums';
import type { OptionType } from '../types/types';
import Header from './header/Header';
import { ShopPath } from './nav/enums';

const Layout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { language, switchLanguage, selectedLanguage } = useLanguage();

  // Clear all popups whenever the user navigates
  useEffect(() => {
    dispatch(clearMessagePopups());
    dispatch(closeMiniCart());
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

  const primaryActionBtn: PrimaryActionBtnProps = {
    onClick: handleChangePreferences,
    label: localLanguage.updatePreferences,
    isForm: true,
  };

  const accountDropdownList: DropdownItem[] = [
    {
      label: language.myAccount,
      onClick: () =>
        navigate(currentUser ? `/${ShopPath.MyAccount}` : `/${ShopPath.Login}`),
      icon: <Icon iconName={IconName.Auth} size="2.5em" />,
    },

    ...(isEmployee
      ? [
          {
            label: language.dashboard,
            onClick: () => navigate('/dashboard'),
            icon: <Icon iconName={IconName.Admin} />,
          },
        ]
      : []),

    {
      label: currentUser ? language.logout : language.login,
      onClick: currentUser
        ? handleLogout
        : () => navigate(`/${ShopPath.Login}`),
      icon: <Icon iconName={currentUser ? IconName.Logout : IconName.Login} />,
    },
  ];

  return (
    <div className="main-container">
      {!isMobileSize && <SkipLink />}
      <Header
        localLanguage={localLanguage}
        dropdownBtnList={accountDropdownList}
        primaryActionBtn={primaryActionBtn}
        isMobileSize={isMobileSize}
        defaultValue={{
          label: exchangeRate,
          value: exchangeRate,
        }}
        onChange={onChange}
        values={values}
        currencyOptions={currencyOptions}
        currentUser={currentUser}
        isAuthReady={isAuthReady}
        onSelectCurrency={(selectedOptions: OptionType) => {
          handleSelectCurrency('currencyOption', selectedOptions);
        }}
      />
      <main id="main">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
