import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { useAppDispatch } from '../app/hooks';
import SkipLink from '../components/skipLinks/SkipLinks';
import { useLogoutMutation } from '../features/auth/authApiSlice';
import { useLanguage } from '../features/language/useLanguage';
import { clearMessagePopups } from '../features/messagePopupSlice';
import { localStorageKeys, useLocalStorage } from '../hooks/useLocalStorage';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { ShopPath } from '../layout/nav/enums';
import PageErrorBoundary from '../pages/PageErrorBoundary';
import AdminHeader from './AdminHeader';
import './adminLayout.styles.scss';
import Aside from './aside/Aside';

const AdminLayout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [logout] = useLogoutMutation();
  const { isMobileSize, isLargeTabletSize } = useMediaQuery();

  const dispatch = useAppDispatch();

  // Clear all popups whenever the user navigates
  useEffect(() => {
    dispatch(clearMessagePopups());
  }, [pathname, dispatch]);

  const [isMenuCollapsed, setIsMenuCollapsed] = useLocalStorage(
    localStorageKeys.menuCollapsed,
    false,
  );

  const handleLogout = () => {
    logout();
    navigate(`/${ShopPath.Login}`);
  };

  const handleCollapseMenu = () => {
    setIsMenuCollapsed(!isMenuCollapsed);
  };

  return (
    <div className="main-container admin-container">
      {!isMobileSize && <SkipLink />}
      <AdminHeader
        navHeading={language.menu}
        onLogout={handleLogout}
        isLargeTabletSize={isLargeTabletSize}
      />
      <div className="main">
        {!isLargeTabletSize && (
          <Aside
            isShown={isMenuCollapsed}
            onTogglePanel={handleCollapseMenu}
            ariaLabel={
              isMenuCollapsed ? language.expandMenu : language.collapseMenu
            }
          />
        )}
        <PageErrorBoundary>
          <main id="main" className="admin">
            <Outlet />
          </main>
        </PageErrorBoundary>
      </div>
    </div>
  );
};

export default AdminLayout;
