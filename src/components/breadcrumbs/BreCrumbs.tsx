import { Fragment } from 'react';
import { Link, useLocation, useParams } from 'react-router';
import { ProductMenuResponse } from '../../app/api/apiTypes/shopApiTypes';
import useLanguage from '../../features/language/useLanguage';
import { ShopPath } from '../../layout/nav/enums';
import { IconName } from '../../types/enums';
import Icon from '../icons/Icon';
import './_breadcrumbs.scss';
import { breadcrumbsList, breadcrumbsListProps } from './breadcrumbsLists';

type BreadCrumbsProps = {
  subMenu: ProductMenuResponse[];
  productName?: string;
  routeList?: breadcrumbsListProps[];
};

const BreCrumbs = ({
  productName,
  subMenu,
  routeList = breadcrumbsList,
}: BreadCrumbsProps) => {
  const { pathname } = useLocation();
  const { category, categoryId } = useParams();
  const { language } = useLanguage();
  const pathnames = pathname.split('/').filter(Boolean);

  const generatePaths = () =>
    pathnames.map((_, index) => `/${pathnames.slice(0, index + 1).join('/')}`);

  const splitPath = (path: string) => path.split('/').filter(Boolean);

  const resolveLabel = ({
    path,
    matchedRoute,
  }: {
    path: string;
    matchedRoute?: { label?: string; path?: string };
  }) => {
    const parts = splitPath(path);

    if (!matchedRoute || !matchedRoute.path) {
      return decodeURIComponent(parts.at(-1) || '');
    }

    if (matchedRoute.path.includes(':id')) {
      return productName;
    }

    if (matchedRoute.path.includes(':categoryId')) {
      const found = subMenu.find((menu) => menu.categoryId === categoryId);

      return found?.label || '';
    }

    if (matchedRoute.label) {
      return language[matchedRoute.label];
    }

    if (matchedRoute.path.includes(':category') && category) {
      return language[category] ?? category;
    }

    return decodeURIComponent(parts.at(-1) || '');
  };

  const getBreadcrumbLabel = (path: string) => {
    const pathnames = splitPath(path);

    const matchedRoute = routeList.find((route) => {
      if (!route.path) {
        return false;
      }

      const routeParts = splitPath(route.path);
      if (routeParts.length !== pathnames.length) {
        return false;
      }

      return routeParts.every(
        (part, index) => part.startsWith(':') || part === pathnames[index],
      );
    });

    return resolveLabel({ path, matchedRoute });
  };

  const paths = generatePaths();

  return (
    <nav aria-label="breadcrumbs" className="breadcrumbs-container">
      <ul className="breadcrumbs">
        <li>
          <Link to={ShopPath.Root}>{language.home}</Link>
        </li>
        {paths.map((path) => (
          <Fragment key={path}>
            <Icon iconName={IconName.ChevronRight} title="Chevron right" />
            <li>
              <Link to={path}>{getBreadcrumbLabel(path)}</Link>
            </li>
          </Fragment>
        ))}
      </ul>
    </nav>
  );
};

export default BreCrumbs;
