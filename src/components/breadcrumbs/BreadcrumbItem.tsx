import { Link } from 'react-router';
import { IconName } from '../../types/enums';
import Icon from '../icons/Icon';

type BreadcrumbItemProps = {
  isCurrent: boolean;
  label: string;
  to: string;
};

const BreadcrumbItem = ({ to, label, isCurrent }: BreadcrumbItemProps) => (
  <li className="breadcrumbs-item">
    <Link
      to={to}
      aria-current={isCurrent ? 'page' : undefined}
      className="btn btn-ghost"
    >
      {label}
    </Link>
    {!isCurrent && (
      <Icon iconName={IconName.ChevronRight} title="Chevron right" size="16" />
    )}
  </li>
);

export default BreadcrumbItem;
