import { FC, ReactNode } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import Icon, { IconName } from '../components/icons/Icon';
import SkipLink from '../components/skipLinks/SkipLinks';
import { useLogoutMutation } from '../features/auth/authApiSlice';
import useLanguage, { languageOptions } from '../features/language/useLanguage';
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

  const selected = languageOptions.find(
    (option) => option.value === selectedLanguage,
  );

  const isHomePage = location.pathname === '/';
  const userDropdownList = [
    {
      label: language.myAccount,
      id: 1,
      onClick: () => {
        navigate(`/${MainPath.MyAccount}`);
      },
      icon: <Icon iconName={IconName.Auth} title="aa" size="50" />,
    },
    {
      label: language.myOrders,
      id: 2,
      icon: <Icon iconName={IconName.Account} title="aa" size="50" />,
      onClick: () => {
        navigate(`/${MainPath.Orders}`);
      },
    },
    {
      label: language.logout,
      id: 3,
      onClick: handleLogout,
      className: 'logout',
      icon: <Icon iconName={IconName.Logout} title="aa" />,
    },
  ];

  return (
    <div className="main-container">
      <SkipLink />
      <Header
        labelText={language.selectLanguage}
        ariaLabel={language.main}
        onLanguageChange={switchLanguage}
        defaultValue={{
          value: selectedLanguage,
          label: selected ? selected.label : 'DK',
        }}
        options={languageOptions}
        userDropdownList={userDropdownList}
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
