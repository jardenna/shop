import { Outlet, useNavigate } from 'react-router';
import Button from '../components/Button';
import SkipLink from '../components/skipLinks/SkipLinks';
import { useLogoutMutation } from '../features/auth/authApiSlice';
import useAuth from '../features/auth/hooks/useAuth';
import useLanguage from '../features/language/useLanguage';
import useAdaptivePanel from '../hooks/useAdaptivePanel';
import useLocalStorage, { localStorageKeys } from '../hooks/useLocalStorage';
import useMediaQuery from '../hooks/useMediaQuery ';
import { MainPath } from '../layout/nav/enums';
import Nav from '../layout/nav/Nav';
import { adminNavList } from '../layout/nav/navList';
import { BtnVariant } from '../types/enums';
import AdminHeader from './AdminHeader';

const AdminLayout = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [logout] = useLogoutMutation();
  const { currentUser } = useAuth();
  const { isMobileSize } = useMediaQuery();

  const handleLogout = () => {
    logout();
    navigate(MainPath.Root);
  };

  const [isMenuCollapsed, setIsMenuCollapsed] = useLocalStorage(
    localStorageKeys.menuCollapsed,
    false,
  );

  const handleCollapseMenu = () => {
    setIsMenuCollapsed(!isMenuCollapsed);
  };

  const { isPanelHidden, onTogglePanel } = useAdaptivePanel();

  return (
    <div className="main-container admin-container">
      {!isMobileSize && <SkipLink />}
      <AdminHeader
        ariaLabel={language.main}
        onLogout={handleLogout}
        btnLabel={language.logout}
        welcomeMessage={
          currentUser ? `${language.welcome} ${currentUser.username}` : null
        }
        isMobileSize={isMobileSize}
      />
      <main className="main">
        {isMobileSize ? (
          <div className="test">
            <Button
              className="menu-burger"
              variant={BtnVariant.Ghost}
              ariaExpanded={isPanelHidden}
              onClick={onTogglePanel}
              ariaLabel={
                !isPanelHidden ? language.expandMenu : language.collapseMenu
              }
            >
              <span className="menu-burger-item" aria-hidden={true} />
            </Button>
            <Nav
              navList={adminNavList}
              className={`admin-nav ${isPanelHidden ? 'test1' : ''}`}
            />
          </div>
        ) : (
          <aside className={`aside ${isMenuCollapsed ? 'collapsed' : ''}`}>
            <Nav
              navList={adminNavList}
              className="admin-nav"
              isMenuCollapsed={isMenuCollapsed}
              onCollapseMenu={handleCollapseMenu}
            />
            link to shop
          </aside>
        )}

        <div id="main" className="admin container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
export default AdminLayout;
