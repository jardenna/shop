import { Outlet, useLocation, useNavigate } from 'react-router';
import { DropdownItem } from '../components/dropdownBtn/DropdownBtn';
import Icon from '../components/icons/Icon';
import type { SecondaryActionBtnProps } from '../components/modal/Modal';
import SkipLink from '../components/skipLinks/SkipLinks';
import { useLogoutMutation } from '../features/auth/authApiSlice';
import useAuth from '../features/auth/hooks/useAuth';
import useCurrency from '../features/currency/useCurrency';
import useLanguage from '../features/language/useLanguage';
import useFormValidation from '../hooks/useFormValidation';
import useMediaQuery from '../hooks/useMediaQuery ';
import { BtnType, IconName } from '../types/enums';
import type { OptionType } from '../types/types';
import { getPathInfo, pathEquals } from '../utils/utils';
import Header from './header/Header';
import { AdminPath, ShopPath } from './nav/enums';

const Layout = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { language, switchLanguage, selectedLanguage } = useLanguage();

  // Hooks
  const { currentUser } = useAuth();
  const { currencyOptions, onChangePrice, exchangeRate } = useCurrency();
  const [logout, { isLoading }] = useLogoutMutation();
  const { isMobileSize } = useMediaQuery();

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
  const authDropdownItem: DropdownItem = {
    label: currentUser ? language.logout : language.login,
    onClick: currentUser ? handleLogout : () => navigate(`/${ShopPath.Login}`),
    disabled: isLoading,
    icon: (
      <Icon
        iconName={currentUser ? IconName.Logout : IconName.Login}
        title={currentUser ? language.logout : language.login}
      />
    ),
  };

  // Employee dropdown list
  const employeeDropdownList: DropdownItem[] = [
    {
      label: language.dashboard,

      icon: <Icon iconName={IconName.Admin} title={language.lock} />,
      onClick: () => {
        navigate(`/${AdminPath.Admin}`);
      },
    },
    authDropdownItem,
  ];

  const pathInfo = getPathInfo(pathname);

  // User dropdown list
  const userDropdownBtnList: DropdownItem[] = [
    {
      label: language.myAccount,
      isActive: pathEquals(pathInfo, ShopPath.MyAccount),
      onClick: () => {
        if (currentUser) {
          navigate(`/${ShopPath.MyAccount}`);
        } else {
          navigate(`/${ShopPath.Login}`);
        }
      },
      icon: (
        <Icon
          iconName={IconName.Auth}
          title={language.myAccount}
          size="2.5em"
        />
      ),
    },
    {
      label: language.myOrders,
      isActive: pathEquals(pathInfo, ShopPath.MyOrders),
      icon: <Icon iconName={IconName.Orders} title={language.myOrders} />,
      onClick: () => {
        if (currentUser) {
          navigate(`/${ShopPath.MyAccount}/${ShopPath.MyOrders}`);
        } else {
          navigate(`/${ShopPath.Login}`);
        }
      },
    },
    authDropdownItem,
  ];

  return (
    <div className="main-container">
      {!isMobileSize && <SkipLink />}
      <Header
        ariaLabel={language.main}
        dropdownBtnList={
          isEmployee ? employeeDropdownList : userDropdownBtnList
        }
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
