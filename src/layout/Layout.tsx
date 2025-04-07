import { FC, ReactNode } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import Icon from '../components/icons/Icon';
import { SecondaryActionBtnProps } from '../components/modal/Modal';
import { OptionType } from '../components/selectBox/Selectbox';
import SkipLink from '../components/skipLinks/SkipLinks';
import { useLogoutMutation } from '../features/auth/authApiSlice';
import useAuth from '../features/auth/hooks/useAuth';
import useCurrency from '../features/currency/useCurrency';
import useLanguage from '../features/language/useLanguage';
import useFormValidation from '../hooks/useFormValidation';
import { IconName } from '../types/enums';
import Header from './header/Header';
import { MainPath } from './nav/enums';
import MetaTags from './nav/MetaTags';

export interface LayoutElementProps {
  ariaLabel: string;
  children: ReactNode;
  className?: string;
}

const Layout: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { language, switchLanguage, selectedLanguage } = useLanguage();
  const [logout] = useLogoutMutation();
  const { currentUser } = useAuth();
  const isHomePage = location.pathname === '/';
  const { currencyOptions, onChangePrice, exchangeRate } = useCurrency();

  const initialState = {
    languageOption: selectedLanguage,
    currencyOption: exchangeRate,
  };

  const { onChange, onSubmit, values, onCustomChange } = useFormValidation({
    callback: handleSubmit,
    initialState,
  });

  const handleSelectCurrency = (name: string, selectedOptions: OptionType) => {
    onCustomChange(name, selectedOptions.value);
  };

  function handleSubmit() {
    switchLanguage(values.languageOption);
    onChangePrice(values.currencyOption);
  }

  const handleLogout = () => {
    logout();
    navigate(MainPath.Root);
  };

  const primaryActionBtn = {
    onClick: onSubmit,
    label: language.updatePreferences,
    buttonType: 'submit',
  };

  const secondaryActionBtn: SecondaryActionBtnProps = {
    label: language.cancel,
  };

  const userDropdownList = [
    {
      label: language.myAccount,
      id: 10,
      onClick: () => {
        if (currentUser) {
          navigate(`/${MainPath.MyAccount}`);
        } else {
          navigate(`/${MainPath.Login}`);
        }
      },
      icon: (
        <Icon iconName={IconName.Auth} title={language.myAccount} size="30" />
      ),
      hide: currentUser?.isAdmin,
    },
    {
      label: language.myOrders,
      id: 20,
      icon: (
        <Icon iconName={IconName.Account} title={language.myOrders} size="30" />
      ),
      onClick: () => {
        navigate(`/${MainPath.Orders}`);
      },
      hide: currentUser?.isAdmin,
    },
    {
      label: language.admin,
      id: 30,
      icon: <Icon iconName={IconName.Admin} title={language.lock} />,
      onClick: () => {
        navigate(`/${MainPath.Admin}`);
      },
      hide: !currentUser?.isAdmin,
    },
    {
      label: currentUser ? language.logout : language.login,
      id: 40,
      onClick: currentUser
        ? handleLogout
        : () => navigate(`/${MainPath.Login}`),
      icon: (
        <Icon
          iconName={currentUser ? IconName.Logout : IconName.Login}
          title={currentUser ? language.logout : language.login}
        />
      ),
    },
  ];

  return (
    <div className="main-container">
      <MetaTags />
      <SkipLink />
      <Header
        ariaLabel={language.main}
        userDropdownList={userDropdownList}
        primaryActionBtn={primaryActionBtn}
        secondaryActionBtn={secondaryActionBtn}
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
        <div className={isHomePage ? 'home-page' : 'container page'}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
