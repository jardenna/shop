import { FC, useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import IconBtn from '../../../components/IconBtn';
import SkipLink from '../../../components/skipLinks/SkipLinks';
import useMediaQuery from '../../../hooks/useMediaQuery ';
import Nav from '../../../layout/nav/Nav';
import { adminNavList } from '../../../layout/nav/navList';
import { IconName } from '../../../types/enums';
import useLanguage from '../../language/useLanguage';
import AdminHeader from './AdminHeader';

const AdminLayout: FC = () => {
  const { language } = useLanguage();
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);
  const { isTabletSize } = useMediaQuery();

  useEffect(() => {
    setIsMenuCollapsed(isTabletSize);
  }, [isTabletSize]);

  const handleCollapseMenu = () => {
    setIsMenuCollapsed(!isMenuCollapsed);
  };

  return (
    <div className="main-container admin-page">
      <SkipLink />
      <AdminHeader ariaLabel={language.main} />
      <main id="main" className="main">
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
        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
export default AdminLayout;
