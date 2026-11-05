import Button from '../components/Button';
import { useLanguage } from '../features/language/useLanguage';
import Logo from '../layout/header/Logo';
import LayoutElement from '../layout/LayoutElement';
import { AdminPath } from '../layout/nav/enums';
import MobileNav from '../layout/nav/MobileNav';
import { adminNavList } from '../layout/nav/navLists';

interface AdminHeaderProps {
  isLargeTabletSize: boolean;
  onLogout: () => void;
}

const AdminHeader = ({ onLogout, isLargeTabletSize }: AdminHeaderProps) => {
  const { language } = useLanguage();

  return (
    <LayoutElement className="admin-header" ariaLabel={language.main}>
      <>
        <Logo linkTo={`/${AdminPath.Admin}`} />
        {!isLargeTabletSize ? (
          <Button onClick={onLogout}>{language.logout}</Button>
        ) : (
          <MobileNav
            navList={adminNavList}
            onLogout={onLogout}
            className="admin-nav"
          />
        )}
      </>
    </LayoutElement>
  );
};
export default AdminHeader;
