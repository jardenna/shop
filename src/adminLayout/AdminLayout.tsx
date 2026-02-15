import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { useAppDispatch } from '../app/hooks';
import SkipLink from '../components/skipLinks/SkipLinks';
import { useLogoutMutation } from '../features/auth/authApiSlice';
import useAuth from '../features/auth/hooks/useAuth';
import useLanguage from '../features/language/useLanguage';
import { clearMessagePopups } from '../features/messagePopupSlice';
import useLocalStorage, { localStorageKeys } from '../hooks/useLocalStorage';
import useMediaQuery from '../hooks/useMediaQuery';
import { ShopPath } from '../layout/nav/enums';
import AdminHeader from './AdminHeader';
import './adminLayout.styles.scss';
import Aside from './aside/Aside';

const AdminLayout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [logout] = useLogoutMutation();
  const { currentUser, onReset } = useAuth();
  const { isMobileSize } = useMediaQuery();

  const dispatch = useAppDispatch();

  useEffect(() => {
    // Clear all popups whenever the user navigates
    dispatch(clearMessagePopups());
  }, [pathname, dispatch]);

  const [isMenuCollapsed, setIsMenuCollapsed] = useLocalStorage(
    localStorageKeys.menuCollapsed,
    false,
  );

  const handleLogout = () => {
    logout();
    navigate(ShopPath.Root);
  };

  const handleCollapseMenu = () => {
    setIsMenuCollapsed(!isMenuCollapsed);
  };

  return (
    <div className="main-container admin-container">
      {!isMobileSize && <SkipLink />}
      <AdminHeader
        onLogout={handleLogout}
        btnLabel={language.logout}
        onReset={() => onReset()}
        welcomeMessage={`${language.welcome} ${currentUser?.username}`}
        isMobileSize={isMobileSize}
      />
      <div className="main">
        {!isMobileSize && (
          <Aside
            isShown={isMenuCollapsed}
            onTogglePanel={handleCollapseMenu}
            ariaLabel={
              isMenuCollapsed ? language.expandMenu : language.collapseMenu
            }
          />
        )}
        <main id="main" className="admin">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
