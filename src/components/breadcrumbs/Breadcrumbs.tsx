import { useLanguage } from '../../features/language/useLanguage';
import LayoutElement from '../../layout/LayoutElement';
import './_breadcrumbs.scss';
import BreadcrumbItem from './BreadcrumbItem';
import { useBreadcrumbs } from './useBreadcrumbs';

export interface BreadcrumbsListProps {
  path: string;
}

export interface BaseBreadcrumbProps {
  currentLabel?: string;
  productName?: string;
}

export interface BreadcrumbsProps extends BaseBreadcrumbProps {
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
  const { language } = useLanguage();
  const { breadcrumbList } = useBreadcrumbs({
    routeList,
    subMenu,
    productName,
    currentLabel,
  });

  return (
    <LayoutElement
      as="nav"
      ariaLabel={language.breadcrumbs}
      className="breadcrumbs-container"
    >
      <ul className="breadcrumbs">
        {breadcrumbList.map(({ path, isCurrent, label }) => (
          <BreadcrumbItem
            key={path}
            label={label}
            isCurrent={isCurrent}
            linkTo={path}
          />
        ))}
      </ul>
    </LayoutElement>
  );
};

export default Breadcrumbs;
