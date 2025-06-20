import { Link } from 'react-router';
import { IconName } from '../../types/enums';
import Icon from '../icons/Icon';

type BreadcrumbItemProps = {
  isCurrent: boolean;
  label: string;
  to: string;
};

const BreadcrumbItem = ({ to, label, isCurrent }: BreadcrumbItemProps) => (
  <li>
    <Link to={to} aria-current={isCurrent ? 'page' : undefined}>
      <Icon iconName={IconName.ChevronRight} title="Chevron right" />
      {label}
    </Link>
  </li>
);

export default BreadcrumbItem;
