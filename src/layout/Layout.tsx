import { Outlet, useNavigate } from 'react-router';
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
import { IconName } from '../types/enums';
import type { OptionType } from '../types/types';
import Header from './header/Header';
import { MainPath } from './nav/enums';
import MetaTags from './nav/MetaTags';

const Layout = () => {
  const navigate = useNavigate();
  const { language, switchLanguage, selectedLanguage } = useLanguage();

  // Hooks
  const { currentUser } = useAuth();
  const { currencyOptions, onChangePrice, exchangeRate } = useCurrency();
  const [logout] = useLogoutMutation();
  const { isMobileSize } = useMediaQuery();

  const handleLogout = () => {
    logout();
    navigate(MainPath.Root);
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

  // Button configurations
  const primaryActionBtn = {
    onClick: onSubmit,
    label: language.updatePreferences,
    buttonType: 'submit',
  };

  const secondaryActionBtn: SecondaryActionBtnProps = {
    label: language.cancel,
  };

  const isEmployee = currentUser && currentUser.role === 'Employee';
  const authDropdownItem: DropdownItem = {
    label: currentUser ? language.logout : language.login,
    onClick: currentUser ? handleLogout : () => navigate(`/${MainPath.Login}`),
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
      label: language.admin,
      icon: <Icon iconName={IconName.Admin} title={language.lock} />,
      onClick: () => {
        navigate(`/${MainPath.Admin}`);
      },
    },
    authDropdownItem,
  ];

  // User dropdown list
  const userDropdownList: DropdownItem[] = [
    {
      label: language.myAccount,
      onClick: () => {
        if (currentUser) {
          navigate(`/${MainPath.MyAccount}`);
        } else {
          navigate(`/${MainPath.Login}`);
        }
      },
      icon: (
        <Icon iconName={IconName.Auth} title={language.myAccount} size="25" />
      ),
    },
    {
      label: language.myOrders,
      icon: <Icon iconName={IconName.Orders} title={language.myOrders} />,
      onClick: () => {
        if (currentUser) {
          navigate(`/${MainPath.Orders}`);
        } else {
          navigate(`/${MainPath.Login}`);
        }
      },
    },
    authDropdownItem,
  ];

  return (
    <div className="main-container">
      <MetaTags />
      {!isMobileSize && <SkipLink />}
      <Header
        ariaLabel={language.mainSiteHeader}
        userDropdownList={isEmployee ? employeeDropdownList : userDropdownList}
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
