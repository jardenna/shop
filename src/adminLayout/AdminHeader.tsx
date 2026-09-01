import Logo from '../layout/header/Logo';
import LayoutElement from '../layout/LayoutElement';
import { AdminPath } from '../layout/nav/enums';
import MobileNav from '../layout/nav/MobileNav';
import { adminNavList } from '../layout/nav/navLists';
import Logout from './Logout';

type AdminHeaderProps = {
  isLargeTabletSize: boolean;
  navHeader: string;
  onLogout: () => void;
};

const AdminHeader = ({
  onLogout,
  isLargeTabletSize,
  navHeader,
}: AdminHeaderProps) => (
  <LayoutElement className="admin-header">
    <>
      <Logo linkTo={`/${AdminPath.Admin}`} />
      {!isLargeTabletSize ? (
        <Logout onLogout={onLogout} />
      ) : (
        <MobileNav
          navList={adminNavList}
          className="admin-nav-container"
          onLogout={onLogout}
          navHeader={navHeader}
        />
      )}
    </>
  </LayoutElement>
);

export default AdminHeader;
