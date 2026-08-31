import Logo from '../layout/header/Logo';
import LayoutElement from '../layout/LayoutElement';
import { AdminPath } from '../layout/nav/enums';
import MobileNav from '../layout/nav/MobileNav';
import { adminNavList } from '../layout/nav/navLists';
import Logout from './Logout';

type AdminHeaderProps = {
  isLargeTabletSize: boolean;
  onLogout: () => void;
};

const AdminHeader = ({ onLogout, isLargeTabletSize }: AdminHeaderProps) => (
  <LayoutElement className="admin-header">
    <>
      <Logo linkTo={`/${AdminPath.Admin}`} />
      {!isLargeTabletSize ? (
        <Logout onLogout={onLogout} />
      ) : (
        <MobileNav navList={adminNavList} className="admin-nav-container" />
      )}
    </>
  </LayoutElement>
);

export default AdminHeader;
