import { FC, ReactNode } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import Button from '../components/Button';
import SkipLink from '../components/skipLinks/SkipLinks';
import {
  useCheckAuthQuery,
  useLogoutMutation,
} from '../features/auth/authApiSlice';
import useLanguage, { languageOptions } from '../features/language/useLanguage';
import Header from './header/Header';

export interface LayoutElementProps {
  ariaLabel: string;
  children: ReactNode;
  className?: string;
}

const Layout: FC = () => {
  const { language, switchLanguage, selectedLanguage } = useLanguage();
  const navigate = useNavigate();
  const selected = languageOptions.find(
    (option) => option.value === selectedLanguage,
  );
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const [logout] = useLogoutMutation();
  const { data: user } = useCheckAuthQuery();

  console.log(user);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

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
      />

      <main id="main">
        <Button onClick={handleLogout}>Logout</Button>
        <div className={isHomePage ? 'home-page' : 'container page'}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
