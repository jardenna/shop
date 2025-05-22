import IconBtn from '../../../components/IconBtn';
import Logo from '../../../layout/header/Logo';
import LayoutElement from '../../../layout/LayoutElement';
import { MainPath } from '../../../layout/nav/enums';
import { IconName } from '../../../types/enums';

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
      <div className="menu-burger">
        <span className="menu-burger-item" />
      </div>
      <Logo linkTo={`/${MainPath.Admin}`} />
      <div className="welcome-message-container">
        <span>{welcomeMessage && welcomeMessage}</span>
        <IconBtn
          onClick={onLogout}
          iconName={IconName.Logout}
          title={btnLabel}
          ariaLabel={btnLabel}
        />
      </div>
    </div>
  </LayoutElement>
);

export default AdminHeader;
