import { Outlet, useNavigate } from 'react-router';
import SkipLink from '../components/skipLinks/SkipLinks';
import { useLogoutMutation } from '../features/auth/authApiSlice';
import useAuth from '../features/auth/hooks/useAuth';
import useLanguage from '../features/language/useLanguage';
import useLocalStorage, { localStorageKeys } from '../hooks/useLocalStorage';
import useMediaQuery from '../hooks/useMediaQuery ';
import { AdminPath } from '../layout/nav/enums';
import MetaTags from '../layout/nav/MetaTags';
import './_admin-layout.scss';
import AdminHeader from './AdminHeader';
import Aside from './aside/Aside';
import MobileNav from './MobileNav';

const AdminLayout = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [logout] = useLogoutMutation();
  const { currentUser } = useAuth();
  const { isMobileSize } = useMediaQuery();

  const [isMenuCollapsed, setIsMenuCollapsed] = useLocalStorage(
    localStorageKeys.menuCollapsed,
    false,
  );

  const handleLogout = () => {
    logout();
    navigate(AdminPath.Root);
  };

  const handleCollapseMenu = () => {
    setIsMenuCollapsed(!isMenuCollapsed);
  };

  return (
    <div className="main-container admin-container">
      <MetaTags metaTitle={language.admin} />
      {!isMobileSize && <SkipLink />}
      <AdminHeader
        ariaLabel={language.mainSiteHeader}
        onLogout={handleLogout}
        btnLabel={language.logout}
        welcomeMessage={
          currentUser ? `${language.welcome} ${currentUser.username}` : null
        }
        isMobileSize={isMobileSize}
      />
      <main className="main">
        {isMobileSize ? (
          <MobileNav
            currentUser={currentUser || null}
            ariaControls="admin-nav"
          />
        ) : (
          <Aside
            isShown={isMenuCollapsed}
            onTogglePanel={handleCollapseMenu}
            ariaLabel={
              isMenuCollapsed ? language.expandMenu : language.collapseMenu
            }
            currentUser={currentUser || null}
          />
        )}

        <div id="main" className="admin container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
export default AdminLayout;
