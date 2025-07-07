import { Link, useLocation, useParams } from 'react-router';
import { Fragment } from 'react/jsx-runtime';
import useLanguage from '../../features/language/useLanguage';
import { ShopPath } from '../../layout/nav/enums';
import { IconName } from '../../types/enums';
import Icon from '../icons/Icon';
import './_breadcrumbs.scss';
import { RouteListProps } from './breadcrumbsRoutes';

type UnifiedBreadcrumbsProps = {
  routeList: RouteListProps[];
  currentLabel?: string;
  productName?: string;
  subMenu?: { categoryId: string; label: string }[];
};
const UnifiedBreadcrumbs = ({
  routeList,
  subMenu,
  productName,
  currentLabel,
}: UnifiedBreadcrumbsProps) => {
  const { pathname } = useLocation();
  const { category, categoryId } = useParams();
  const { language } = useLanguage();

  const pathnames = pathname.split('/').filter(Boolean);

  const paths = pathnames.map(
    (_, idx) => `/${pathnames.slice(0, idx + 1).join('/')}`,
  );

  const split = (path: string) => path.split('/').filter(Boolean);

  const hiddenPathSegments = ['admin', 'create', 'update', 'view'];

  const shouldHideBreadcrumb = (segment: string) =>
    hiddenPathSegments.includes(segment.toLowerCase());

  const resolveLabel = (path: string) => {
    const parts = split(path);

    const matchedRoute = routeList.find((route) => {
      if (!route.path) {
        return false;
      }

      const routeParts = split(route.path);
      if (routeParts.length !== parts.length) {
        return false;
      }

      return routeParts.every(
        (part, i) => part.startsWith(':') || part === parts[i],
      );
    });

    if (!matchedRoute) {
      return decodeURIComponent(parts.at(-1) ?? '');
    }

    if (matchedRoute.path.includes(':id') && productName) {
      return productName;
    }

    if (matchedRoute.path.includes(':categoryId') && categoryId && subMenu) {
      const found = subMenu.find((m) => m.categoryId === categoryId);
      if (found) {
        return found.label;
      }
    }

    if (matchedRoute.path.includes(':category') && category) {
      return language[category] ?? category;
    }

    if (matchedRoute.label) {
      return language[matchedRoute.label] ?? matchedRoute.label;
    }

    if (paths.at(-1) === path && currentLabel) {
      return currentLabel;
    }

    return decodeURIComponent(parts.at(-1) ?? '');
  };

  return (
    <nav aria-label="breadcrumbs" className="breadcrumbs-container">
      <ul className="breadcrumbs">
        <li>
          <Link to={ShopPath.Root}>{language.home}</Link>
        </li>
        {paths.map((path, index) => {
          const isCurrent = index === pathnames.length - 1;
          const lastPart = path.split('/').filter(Boolean).at(-1);
          if (!lastPart || shouldHideBreadcrumb(lastPart)) {
            return null;
          }

          return (
            <Fragment key={path}>
              <Icon iconName={IconName.ChevronRight} title="Chevron right" />
              <li>
                <Link to={path} aria-current={isCurrent ? 'page' : undefined}>
                  {resolveLabel(path)}
                </Link>
              </li>
            </Fragment>
          );
        })}
      </ul>
    </nav>
  );
};

export default UnifiedBreadcrumbs;
