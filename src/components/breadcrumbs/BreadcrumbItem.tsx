import { NavLink } from 'react-router';
import { IconName } from '../../types/enums';
import Icon from '../icons/Icon';

const BreadcrumbItem = ({ to, label }: { label: string; to: string }) => (
  <li>
    <NavLink to={to}>
      <Icon iconName={IconName.ChevronRight} title="tt" ariaHidden /> {label}
    </NavLink>
  </li>
);

export default BreadcrumbItem;
