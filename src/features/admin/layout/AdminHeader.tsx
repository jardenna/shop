import { FC } from 'react';
import Logo from '../../../layout/header/Logo';
import LayoutElement from '../../../layout/LayoutElement';
import { MainPath } from '../../../layout/nav/enums';

interface AdminHeaderProps {
  ariaLabel: string;
}

const AdminHeader: FC<AdminHeaderProps> = ({ ariaLabel }) => (
  <LayoutElement as="header" className="main-header" ariaLabel={ariaLabel}>
    <div className="container main-header-container">
      <Logo link={`/${MainPath.Dashboard}`} />
    </div>
  </LayoutElement>
);

export default AdminHeader;
