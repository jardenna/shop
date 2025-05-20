import { Outlet, useNavigate } from 'react-router';
import IconBtn from '../../../components/IconBtn';
import SkipLink from '../../../components/skipLinks/SkipLinks';
import useLocalStorage, {
  localStorageKeys,
} from '../../../hooks/useLocalStorage';
import { MainPath } from '../../../layout/nav/enums';
import Nav from '../../../layout/nav/Nav';
import { adminNavList } from '../../../layout/nav/navList';
import { IconName } from '../../../types/enums';
import { useLogoutMutation } from '../../auth/authApiSlice';
import useAuth from '../../auth/hooks/useAuth';
import useLanguage from '../../language/useLanguage';
import AdminHeader from './AdminHeader';

const AdminLayout = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [logout] = useLogoutMutation();
  const { currentUser } = useAuth();

  const handleLogout = () => {
    logout();
    navigate(MainPath.Root);
  };

  const [isMenuCollapsed, setIsMenuCollapsed] = useLocalStorage(
    localStorageKeys.menuCollapsed,
    false,
  );
  // const { isTabletSize } = useMediaQuery();

  // useEffect(() => {
  //   setIsMenuCollapsed(isTabletSize);
  // }, [isTabletSize]);
  const handleCollapseMenu = () => {
    setIsMenuCollapsed(!isMenuCollapsed);
  };

  return (
    <div className="main-container admin-container">
      <SkipLink />
      <AdminHeader
        ariaLabel={language.main}
        onLogout={handleLogout}
        btnLabel={language.logout}
        currentUser={currentUser?.username || ''}
      />
      <main className="main">
        <aside className={`aside ${isMenuCollapsed ? 'collapsed' : ''}`}>
          <Nav
            navList={adminNavList}
            className="admin-nav"
            iconBtn={
              <IconBtn
                onClick={handleCollapseMenu}
                ariaLabel={
                  isMenuCollapsed ? language.expandMenu : language.collapseMenu
                }
                iconName={IconName.ChevronLeft}
                title="chevron"
                ariaExpanded={!isMenuCollapsed}
              />
            }
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
