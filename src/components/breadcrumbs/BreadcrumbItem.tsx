import { IconName } from '../../types/enums';
import Icon from '../icons/Icon';
import LinkButton from '../LinkButton';

interface BreadcrumbItemProps {
  isCurrent: boolean;
  label: string;
  path: string;
}

const BreadcrumbItem = ({ path, label, isCurrent }: BreadcrumbItemProps) => (
  <li className="breadcrumbs-item">
    <LinkButton
      linkTo={path}
      linkText={label}
      ariaCurrent={isCurrent ? 'page' : undefined}
    />

    {!isCurrent && <Icon iconName={IconName.ChevronRight} size="1em" />}
  </li>
);

export default BreadcrumbItem;
