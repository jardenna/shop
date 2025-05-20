import Button from '../../../components/Button';
import Logo from '../../../layout/header/Logo';
import LayoutElement from '../../../layout/LayoutElement';
import { MainPath } from '../../../layout/nav/enums';

type AdminHeaderProps = {
  ariaLabel: string;
  btnLabel: string;
  currentUser: string;
  onLogout: () => void;
};
const AdminHeader = ({
  ariaLabel,
  onLogout,
  btnLabel,
  currentUser,
}: AdminHeaderProps) => (
  <LayoutElement as="header" className="main-header" ariaLabel={ariaLabel}>
    <div className="container main-header-container">
      <Logo linkTo={`/${MainPath.Admin}`} />
      Welcome {currentUser}
      <Button onClick={onLogout}>{btnLabel}</Button>
    </div>
  </LayoutElement>
);

export default AdminHeader;
