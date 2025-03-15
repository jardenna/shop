import { FC, ReactNode } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import Icon, { IconName } from '../components/icons/Icon';
import { SecondaryActionBtnProps } from '../components/modal/Modal';
import { OptionType } from '../components/selectBox/SelectBox';
import SkipLink from '../components/skipLinks/SkipLinks';
import { useLogoutMutation } from '../features/auth/authApiSlice';
import useAuth from '../features/auth/hooks/useAuth';
import useCurrency from '../features/currency/useCurrency';
import useLanguage from '../features/language/useLanguage';
import useFormValidation from '../hooks/useFormValidation';
import Header from './header/Header';
import { MainPath } from './nav/enums';

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
  const { currencyOptions, onChangePrice, lang } = useCurrency();

  const initialState = {
    languageOption: selectedLanguage,
    currencyOption: lang,
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
      id: 1,
      onClick: () => {
        navigate(`/${MainPath.MyAccount}`);
      },
      icon: (
        <Icon iconName={IconName.Auth} title={language.myAccount} size="30" />
      ),
    },
    {
      label: language.myOrders,
      id: 2,
      icon: (
        <Icon iconName={IconName.Account} title={language.myOrders} size="30" />
      ),
      onClick: () => {
        navigate(`/${MainPath.Orders}`);
      },
    },
    {
      label: currentUser ? language.logout : language.login,
      id: 3,
      onClick: currentUser
        ? handleLogout
        : () => {
            navigate(`/${MainPath.Login}`);
          },
      icon: <Icon iconName={IconName.Logout} title={language.logout} />,
    },
  ];

  return (
    <div className="main-container">
      <SkipLink />
      <Header
        ariaLabel={language.main}
        userDropdownList={userDropdownList}
        primaryActionBtn={primaryActionBtn}
        secondaryActionBtn={secondaryActionBtn}
        defaultValue={{
          label: lang,
          value: lang,
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
