import { FC } from 'react';
import { Outlet } from 'react-router';
import SkipLink from '../components/skipLinks/SkipLinks';
import useLanguage from '../features/language/useLanguage';
import AdminHeader from './header/AdminHeader';

const AdminLayout: FC = () => {
  const { language } = useLanguage();
  return (
    <div className="main-container admin-page">
      <SkipLink />
      <AdminHeader ariaLabel={language.main} />
      <main id="main" className="main">
        <aside className="aside">
          <nav className="main-nav">
            <div className="container">nav</div>
          </nav>
        </aside>
        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
export default AdminLayout;
