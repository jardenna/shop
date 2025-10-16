import { IconName } from '../../types/enums';
import Icon from '../icons/Icon';
import LinkButton from '../LinkButton';

type BreadcrumbItemProps = {
  isCurrent: boolean;
  label: string;
  linkTo: string;
};

const BreadcrumbItem = ({ linkTo, label, isCurrent }: BreadcrumbItemProps) => (
  <li className="breadcrumbs-item">
    <LinkButton
      linkTo={linkTo}
      linkText={label}
      ariaCurrent={isCurrent ? 'page' : undefined}
    />

    {!isCurrent && <Icon iconName={IconName.ChevronRight} size="1em" />}
  </li>
);

export default BreadcrumbItem;
