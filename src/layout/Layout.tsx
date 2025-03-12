import { FC, ReactNode } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import Icon, { IconName } from '../components/icons/Icon';
import SkipLink from '../components/skipLinks/SkipLinks';
import { useLogoutMutation } from '../features/auth/authApiSlice';
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
  const { language, switchLanguage, selectedLanguage } = useLanguage();
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();

  const handleLogout = () => {
    logout();
    navigate(`/${MainPath.Login}`);
  };

  const initialState = {
    languageOption: selectedLanguage,
  };

  const { onChange, onSubmit, values } = useFormValidation({
    callback: (values) => {
      switchLanguage(values.languageOption);
    },
    initialState,
  });

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

  return (
    <div className="main-container">
      <SkipLink />
      <Header
        ariaLabel={language.main}
        userDropdownList={userDropdownList}
        primaryActionBtn={primaryActionBtn}
        onChange={onChange}
        values={values}
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
