import { useCallback, useMemo } from 'react';
import { Link, useLocation, useParams } from 'react-router';
import useLanguage from '../../features/language/useLanguage';
import { ShopPath } from '../../layout/nav/enums';
import './_breadcrumbs.scss';
import BreadcrumbItem from './BreadcrumbItem';
import { breadcrumbsListProps } from './breadcrumbsLists';

type UnifiedBreadcrumbsProps = {
  routeList: breadcrumbsListProps[];
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

  const pathnames = useMemo(
    () => pathname.split('/').filter(Boolean),
    [pathname],
  );
  const paths = useMemo(
    () =>
      pathnames.map((_, idx) => `/${pathnames.slice(0, idx + 1).join('/')}`),
    [pathnames],
  );

  const split = useCallback(
    (path: string) => path.split('/').filter(Boolean),
    [],
  );
  const getLastSegment = (path: string) => split(path).at(-1);

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
      return (
        routeParts.length === parts.length &&
        routeParts.every((part, i) => part.startsWith(':') || part === parts[i])
      );
    });

    if (matchedRoute) {
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
    }

    if (paths.at(-1) === path && currentLabel) {
      return currentLabel;
    }

    return decodeURIComponent(getLastSegment(path) ?? '');
  };
  const breadcrumbItems = paths
    .map((path, index) => {
      const lastPart = getLastSegment(path);
      if (!lastPart || shouldHideBreadcrumb(lastPart)) {
        return null;
      }

      return {
        path,
        isCurrent: index === pathnames.length - 1,
      };
    })
    .filter(
      (item): item is { isCurrent: boolean; path: string } => item !== null,
    );

  return (
    <nav aria-label="breadcrumbs" className="breadcrumbs-container">
      <ul className="breadcrumbs">
        <li>
          <Link to={ShopPath.Root}>{language.home}</Link>
        </li>
        {breadcrumbItems.map(({ path, isCurrent }) => (
          <BreadcrumbItem
            key={path}
            label={resolveLabel(path)}
            isCurrent={isCurrent}
            to={path}
          />
        ))}
      </ul>
    </nav>
  );
};

export default UnifiedBreadcrumbs;
