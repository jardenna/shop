import Logo from '../layout/header/Logo';
import LayoutElement from '../layout/LayoutElement';
import { AdminPath } from '../layout/nav/enums';
import MobileNav from '../layout/nav/MobileNav';
import { adminNavList } from '../layout/nav/navLists';
import Logout from './Logout';

interface AdminHeaderProps {
  isLargeTabletSize: boolean;
  navHeading: string;
  onLogout: () => void;
}

const AdminHeader = ({
  onLogout,
  isLargeTabletSize,
  navHeading,
}: AdminHeaderProps) => (
  <LayoutElement className="admin-header" ariaLabel="page-header">
    <>
      <Logo linkTo={`/${AdminPath.Admin}`} />
      {!isLargeTabletSize ? (
        <Logout onLogout={onLogout} />
      ) : (
        <MobileNav
          navList={adminNavList}
          onLogout={onLogout}
          navHeading={navHeading}
          className="admin-nav"
        />
      )}
    </>
  </LayoutElement>
);

export default AdminHeader;
