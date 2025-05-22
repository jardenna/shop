import { Outlet, useNavigate } from 'react-router';
import SkipLink from '../../../components/skipLinks/SkipLinks';
import useLocalStorage, {
  localStorageKeys,
} from '../../../hooks/useLocalStorage';
import useMediaQuery from '../../../hooks/useMediaQuery ';
import { MainPath } from '../../../layout/nav/enums';
import Nav from '../../../layout/nav/Nav';
import { adminNavList } from '../../../layout/nav/navList';
import { useLogoutMutation } from '../../auth/authApiSlice';
import useAuth from '../../auth/hooks/useAuth';
import useLanguage from '../../language/useLanguage';
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
        <aside className={`aside ${isMenuCollapsed ? 'collapsed' : ''}`}>
          <Nav
            navList={adminNavList}
            className="admin-nav"
            isMenuCollapsed={isMenuCollapsed}
            onCollapseMenu={handleCollapseMenu}
          />
          link to shop
        </aside>
        <div id="main" className="admin container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
export default AdminLayout;
