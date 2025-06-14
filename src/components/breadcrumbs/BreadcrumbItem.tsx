import { NavLink } from 'react-router';
import { Unicode } from '../../types/enums';

const BreadcrumbItem = ({ to, label }: { label: string; to: string }) => (
  <span>
    <span>{Unicode.ChevronRight}</span>
    <NavLink to={to}>{label}</NavLink>
  </span>
);

export default BreadcrumbItem;
