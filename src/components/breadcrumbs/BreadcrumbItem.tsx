import { IconName } from '../../types/enums';
import Icon from '../icons/Icon';
import LinkButton from '../LinkButton';

type BreadcrumbItemProps = {
  isCurrent: boolean;
  label: string;
  to: string;
};

const BreadcrumbItem = ({ to, label, isCurrent }: BreadcrumbItemProps) => (
  <li className="breadcrumbs-item">
    <LinkButton
      linkTo={to}
      linkText={label}
      ariaCurrent={isCurrent ? 'page' : undefined}
    />

    {!isCurrent && (
      <Icon iconName={IconName.ChevronRight} title="Chevron right" size="16" />
    )}
  </li>
);

export default BreadcrumbItem;
