import { Link, matchPath, useLocation } from 'react-router';
import { ProductMenuResponse } from '../../app/api/apiTypes/shopApiTypes';
import useLanguage from '../../features/language/useLanguage';
import LayoutElement from '../../layout/LayoutElement';
import { ShopPath } from '../../layout/nav/enums';
import BreadcrumbItem from './BreadcrumbItem';

export type RouteListProps = {
  label?: string; // Static label key (fx fra LinkText enum)
  path?: string; // Route path fx "/collection/:category"
};
type BreadCrumbsProps = {
  routeList: RouteListProps[];
  currentLabel?: string; // typisk produktnavn
  params?: {
    category?: string;
    categoryId?: string;
    id?: string;
  };
  subMenu?: ProductMenuResponse[]; // dine underkategorier
};

const matchRoute = (routePath: string, currentPath: string) =>
  Boolean(matchPath({ path: routePath, end: true }, currentPath));

const getLabelFromSubMenu = (
  subMenu: ProductMenuResponse[],
  categoryId?: string,
) => subMenu.find((item) => item.categoryId === categoryId)?.label;

const getDynamicLabel = (
  path?: string,
  params?: BreadCrumbsProps['params'],
  subMenu?: ProductMenuResponse[],
): string => {
  if (!path || !params) {
    return '';
  }
  // Check for :categoryId before :category to avoid substring collision
  if (path.includes(':categoryId') && params.categoryId && subMenu) {
    return getLabelFromSubMenu(subMenu, params.categoryId) ?? params.categoryId;
  }

  if (path.includes(':category') && params.category) {
    return params.category;
  }

  if (path.includes(':id') && params.id) {
    return params.id; // fallback – brug hellere `currentLabel`
  }

  return '';
};

const Breadcrumbs = ({
  routeList,
  currentLabel,
  subMenu,
  params,
}: BreadCrumbsProps) => {
  const location = useLocation();
  const { language } = useLanguage();
  const pathnames = location.pathname.split('/').filter(Boolean);

  const breadcrumbItems = pathnames.map((_, index) => {
    const to = `/${pathnames.slice(0, index + 1).join('/')}`;

    const matchedRoute = routeList.find(
      (route) => route.path && matchRoute(route.path, to),
    );

    if (!matchedRoute) {
      return null;
    }

    const isCurrent = index === pathnames.length - 1;

    const baseLabel = matchedRoute.label
      ? (language[matchedRoute.label] ?? matchedRoute.label)
      : '';

    const label =
      isCurrent && currentLabel
        ? currentLabel
        : baseLabel ||
          getDynamicLabel('collection/:category/:categoryId', params, subMenu);

    return (
      <BreadcrumbItem key={to} to={to} label={label} isCurrent={isCurrent} />
    );
  });

  return (
    <LayoutElement
      as="nav"
      ariaLabel="breadcrumbs"
      className="breadcrumbs-container"
    >
      <ul className="breadcrumbs">
        <li>
          <Link to={ShopPath.Root}>{language.home}</Link>
        </li>
        {breadcrumbItems}
      </ul>
    </LayoutElement>
  );
};

export default Breadcrumbs;
