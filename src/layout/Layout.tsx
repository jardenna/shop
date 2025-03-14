import { FC, ReactNode } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import Icon, { IconName } from '../components/icons/Icon';
import { OptionType } from '../components/selectBox/SelectBox';
import SkipLink from '../components/skipLinks/SkipLinks';
import { useLogoutMutation } from '../features/auth/authApiSlice';
import {
  selectCurrency,
  setCurrency,
} from '../features/currency/currencySlice';
import useLanguage from '../features/language/useLanguage';
import useFormValidation from '../hooks/useFormValidation';
import useLocalStorage from '../hooks/useLocalStorage';
import Header from './header/Header';
import { MainPath } from './nav/enums';

export interface LayoutElementProps {
  ariaLabel: string;
  children: ReactNode;
  className?: string;
}

const Layout: FC = () => {
  const location = useLocation();
  const { rates, selectedCurrency } = useAppSelector(selectCurrency);
  const { language, switchLanguage, selectedLanguage } = useLanguage();
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();

  const handleLogout = () => {
    logout();
    navigate(`/${MainPath.Login}`);
  };

  const [lang, setLang] = useLocalStorage('cur', selectedCurrency);

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

  const dispatch = useAppDispatch();

  function handleSubmit() {
    switchLanguage(values.languageOption);
    dispatch(setCurrency(values.currencyOption));
    setLang(values.currencyOption);
  }

  const primaryActionBtn = {
    onClick: onSubmit,
    label: 'ok',
    buttonType: 'submit',
  };

  const isHomePage = location.pathname === '/';
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
      label: language.logout,
      id: 3,
      onClick: handleLogout,
      className: 'logout',
      icon: <Icon iconName={IconName.Logout} title={language.logout} />,
    },
  ];

  // Convert rates into SelectBox options
  const currencyOptions = Object.keys(rates).map((currency) => ({
    label: currency,
    value: currency,
  }));

  return (
    <div className="main-container">
      <SkipLink />
      <Header
        ariaLabel={language.main}
        userDropdownList={userDropdownList}
        primaryActionBtn={primaryActionBtn}
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
