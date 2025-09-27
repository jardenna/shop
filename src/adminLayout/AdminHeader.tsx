import Button from '../components/Button';
import Logo from '../layout/header/Logo';
import LayoutElement from '../layout/LayoutElement';
import { AdminPath } from '../layout/nav/enums';
import MobileNav from '../layout/nav/MobileNav';
import { adminNavList } from '../layout/nav/navLists';

type AdminHeaderProps = {
  ariaLabel: string;
  btnLabel: string;
  isMobileSize: boolean;
  welcomeMessage: string | null;
  onLogout: () => void;
};
const AdminHeader = ({
  ariaLabel,
  onLogout,
  btnLabel,
  isMobileSize,
  welcomeMessage,
}: AdminHeaderProps) => (
  <LayoutElement ariaLabel={ariaLabel} className="admin-header">
    <>
      <Logo linkTo={`/${AdminPath.Admin}`} />
      {!isMobileSize ? (
        <>
          <span>{welcomeMessage && welcomeMessage}</span>
          <Button onClick={onLogout}>{btnLabel}</Button>
        </>
      ) : (
        <MobileNav navList={adminNavList} className="admin-nav-container" />
      )}
    </>
  </LayoutElement>
);

export default AdminHeader;
