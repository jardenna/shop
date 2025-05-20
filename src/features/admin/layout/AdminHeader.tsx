import Button from '../../../components/Button';
import Logo from '../../../layout/header/Logo';
import LayoutElement from '../../../layout/LayoutElement';
import { MainPath } from '../../../layout/nav/enums';

type AdminHeaderProps = {
  ariaLabel: string;
  btnLabel: string;
  welcomeMessage: string | null;
  onLogout: () => void;
};
const AdminHeader = ({
  ariaLabel,
  onLogout,
  btnLabel,
  welcomeMessage,
}: AdminHeaderProps) => (
  <LayoutElement as="header" className="main-header" ariaLabel={ariaLabel}>
    <div className="container main-header-container">
      <Logo linkTo={`/${MainPath.Admin}`} />
      {welcomeMessage && welcomeMessage}
      <Button onClick={onLogout}>{btnLabel}</Button>
    </div>
  </LayoutElement>
);

export default AdminHeader;
