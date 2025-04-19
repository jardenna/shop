import Logo from '../../../layout/header/Logo';
import LayoutElement from '../../../layout/LayoutElement';
import { MainPath } from '../../../layout/nav/enums';

const AdminHeader = ({ ariaLabel }: { ariaLabel: string }) => (
  <LayoutElement as="header" className="main-header" ariaLabel={ariaLabel}>
    <div className="container main-header-container">
      <Logo link={`/${MainPath.Admin}`} />
    </div>
  </LayoutElement>
);

export default AdminHeader;
