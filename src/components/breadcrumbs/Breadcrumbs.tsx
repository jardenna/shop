import LayoutElement from '../../layout/LayoutElement';
import './_breadcrumbs.scss';
import BreadcrumbItem from './BreadcrumbItem';
import { useBreadcrumbs } from './useBreadcrumbs';

export interface BreadcrumbsListProps {
  path: string;
}

export interface BreadcrumbsProps {
  currentLabel?: string;
  productName?: string;
  routeList?: BreadcrumbsListProps[];
  subMenu?: { categoryId: string; label: string }[];
}

const Breadcrumbs = ({
  routeList,
  subMenu,
  productName,
  currentLabel,
}: BreadcrumbsProps) => {
  const { breadcrumbList, ariaLabel } = useBreadcrumbs({
    routeList,
    subMenu,
    productName,
    currentLabel,
  });

  return (
    <LayoutElement
      as="nav"
      ariaLabel={ariaLabel}
      className="breadcrumbs-container"
    >
      <ul className="breadcrumbs">
        {breadcrumbList.map(({ path, isCurrent, label }) => (
          <BreadcrumbItem
            key={path}
            label={label}
            isCurrent={isCurrent}
            path={path}
          />
        ))}
      </ul>
    </LayoutElement>
  );
};

export default Breadcrumbs;
