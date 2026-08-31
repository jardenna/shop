import Logo from '../layout/header/Logo';
import LayoutElement from '../layout/LayoutElement';
import { AdminPath } from '../layout/nav/enums';
import MobileNav from '../layout/nav/MobileNav';
import { adminNavList } from '../layout/nav/navLists';
import Logout from './Logout';

type AdminHeaderProps = {
  isMobileSize: boolean;
  onLogout: () => void;
  onReset: () => void;
};
const AdminHeader = ({ onLogout, isMobileSize, onReset }: AdminHeaderProps) => (
  <LayoutElement className="admin-header">
    <>
      <Logo linkTo={`/${AdminPath.Admin}`} />
      {!isMobileSize ? (
        <Logout onReset={onReset} onLogout={onLogout} />
      ) : (
        // <ErrorBoundary
        //   FallbackComponent={ErrorBoundaryFallback}
        //   onReset={onReset}
        // >
        //   <p>{welcomeMessage && welcomeMessage}</p>
        //   <Button onClick={onLogout}>{btnLabel}</Button>
        // </ErrorBoundary>
        <MobileNav navList={adminNavList} className="admin-nav-container" />
      )}
    </>
  </LayoutElement>
);

export default AdminHeader;
