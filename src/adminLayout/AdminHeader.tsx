import Button from '../components/Button';
import Logo from '../layout/header/Logo';
import LayoutElement from '../layout/LayoutElement';
import { AdminPath } from '../layout/nav/enums';
import MobileNav from '../layout/nav/MobileNav';
import { adminNavList } from '../layout/nav/navLists';

type AdminHeaderProps = {
  btnLabel: string;
  isMobileSize: boolean;
  welcomeMessage: string | null;
  onLogout: () => void;
};
const AdminHeader = ({
  onLogout,
  btnLabel,
  isMobileSize,
  welcomeMessage,
}: AdminHeaderProps) => (
  <LayoutElement className="admin-header">
    <>
      <Logo linkTo={`/${AdminPath.Admin}`} />
      {!isMobileSize ? (
        <>
          <p>{welcomeMessage && welcomeMessage}</p>
          <Button onClick={onLogout}>{btnLabel}</Button>
        </>
      ) : (
        <MobileNav navList={adminNavList} className="admin-nav-container" />
      )}
    </>
  </LayoutElement>
);

export default AdminHeader;
