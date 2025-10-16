import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { useAppDispatch } from '../app/hooks';
import { DropdownItem } from '../components/dropdownBtn/DropdownBtn';
import Icon from '../components/icons/Icon';
import type { SecondaryActionBtnProps } from '../components/modal/Modal';
import SkipLink from '../components/skipLinks/SkipLinks';
import { useLogoutMutation } from '../features/auth/authApiSlice';
import useAuth from '../features/auth/hooks/useAuth';
import useCurrency from '../features/currency/useCurrency';
import useLanguage from '../features/language/useLanguage';
import { clearMessagePopups } from '../features/messagePopupSlice';
import { useGetFavoritesQuery } from '../features/shop/shopApiSlice';
import useFormValidation from '../hooks/useFormValidation';
import useMediaQuery from '../hooks/useMediaQuery';
import { BtnType, IconName } from '../types/enums';
import type { OptionType } from '../types/types';
import { getPathName, pathEquals } from '../utils/utils';
import Header from './header/Header';
import { AdminPath, ShopPath } from './nav/enums';

const Layout = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const pathInfo = getPathName(pathname);
  const { language, switchLanguage, selectedLanguage } = useLanguage();
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Clear all popups whenever the user navigates
    dispatch(clearMessagePopups());
  }, [pathname, dispatch]);

  // Hooks
  const { currentUser } = useAuth();
  const { currencyOptions, onChangePrice, exchangeRate } = useCurrency();
  const [logout, { isLoading }] = useLogoutMutation();
  const { isMobileSize } = useMediaQuery();

  const { data: favorites = [], refetch } = useGetFavoritesQuery(undefined, {
    skip: !currentUser, // only fetch if user exists
  });

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

  function handleSubmit() {
    switchLanguage(values.languageOption);
    onChangePrice(values.currencyOption);
  }

  // Initial state
  const initialState = {
    languageOption: selectedLanguage,
    currencyOption: exchangeRate,
  };

  const { onChange, onSubmit, values, onCustomChange } = useFormValidation({
    callback: handleSubmit,
    initialState,
  });

  const primaryActionBtn = {
    onSubmit,
    label: language.updatePreferences,
    buttonType: BtnType.Submit,
  };

  const secondaryActionBtn: SecondaryActionBtnProps = {
    label: language.cancel,
  };

  const isEmployee = currentUser && currentUser.role === 'Employee';
  const isAdmin = currentUser && currentUser.isAdmin;

  // Helper to generate account-related links (for users, employees, admins)
  const getAccountLinks = (): DropdownItem[] => [
    {
      label: language.myAccount,
      isActive: pathEquals(pathInfo, ShopPath.MyAccount),
      onClick: () =>
        navigate(currentUser ? `/${ShopPath.MyAccount}` : `/${ShopPath.Login}`),
      icon: <Icon iconName={IconName.Auth} size="2.5em" />,
    },
  ];
  // Auth dropdown item
  const authDropdownItem: DropdownItem = {
    label: currentUser ? language.logout : language.login,
    onClick: currentUser ? handleLogout : () => navigate(`/${ShopPath.Login}`),
    disabled: isLoading,
    icon: <Icon iconName={currentUser ? IconName.Logout : IconName.Login} />,
  };

  const dropdownItems: DropdownItem[] = [
    // Account links visible to everyone
    ...getAccountLinks(),

    // Dashboard only for employees and admins
    ...(isEmployee || isAdmin
      ? [
          {
            label: language.dashboard,
            icon: <Icon iconName={IconName.Admin} />,
            onClick: () => navigate(`/${AdminPath.Admin}`),
          },
        ]
      : []),

    // Auth/logout always
    authDropdownItem,
  ];

  return (
    <div className="main-container">
      {!isMobileSize && <SkipLink />}
      <Header
        dropdownBtnList={dropdownItems}
        primaryActionBtn={primaryActionBtn}
        secondaryActionBtn={secondaryActionBtn}
        isMobileSize={isMobileSize}
        defaultValue={{
          label: exchangeRate,
          value: exchangeRate,
        }}
        onChange={onChange}
        values={values}
        currencyOptions={currencyOptions}
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
