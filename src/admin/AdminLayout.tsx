import { FC } from 'react';
import { Outlet } from 'react-router';
import SkipLink from '../components/skipLinks/SkipLinks';
import useLanguage from '../features/language/useLanguage';
import Nav from '../layout/nav/Nav';
import { adminNavList } from '../layout/nav/navList';
import AdminHeader from './AdminHeader';

const AdminLayout: FC = () => {
  const { language } = useLanguage();
  return (
    <div className="main-container admin-page">
      <SkipLink />
      <AdminHeader ariaLabel={language.main} />
      <main id="main" className="main">
        <aside className="aside">
          <Nav navList={adminNavList} className="admin-nav" />
        </aside>
        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
export default AdminLayout;
