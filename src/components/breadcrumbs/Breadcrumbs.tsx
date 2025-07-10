import { useCallback, useMemo } from 'react';
import { useLocation, useParams } from 'react-router';
import useLanguage from '../../features/language/useLanguage';
import { AdminPath } from '../../layout/nav/enums';
import './_breadcrumbs.scss';
import BreadcrumbItem from './BreadcrumbItem';
import { breadcrumbsListProps } from './breadcrumbsLists';

type BreadcrumbsProps = {
  routeList: breadcrumbsListProps[];
  currentLabel?: string;
  productName?: string;
  subMenu?: { categoryId: string; label: string }[];
};

const Breadcrumbs = ({
  routeList,
  subMenu,
  productName,
  currentLabel,
}: BreadcrumbsProps) => {
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

  const isAdmin = useMemo(
    () => pathname.startsWith(`/${AdminPath.Admin}`),
    [pathname],
  );

  const fullPaths = useMemo(
    () => (isAdmin ? paths : ['/', ...paths]),
    [isAdmin, paths],
  );

  const split = useCallback(
    (path: string) => path.split('/').filter(Boolean),
    [],
  );
  const getLastSegment = (path: string) => split(path).at(-1);

  const hiddenPathSegments = ['update', 'view'];
  const shouldHideBreadcrumb = (segment: string) =>
    hiddenPathSegments.includes(segment.toLowerCase());

  const resolveLabel = (path: string) => {
    if (path === '/') {
      return language.home;
    }

    const parts = split(path);
    const lastSegment = getLastSegment(path);

    if (lastSegment && language[lastSegment]) {
      return language[lastSegment];
    }

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
    }

    if (paths.at(-1) === path && currentLabel) {
      return currentLabel;
    }

    return decodeURIComponent(getLastSegment(path) ?? '');
  };

  const breadcrumbItems = fullPaths
    .map((path, index) => {
      const lastPart = getLastSegment(path);
      if (path !== '/' && (!lastPart || shouldHideBreadcrumb(lastPart))) {
        return null;
      }

      return {
        path,
        isCurrent: index === fullPaths.length - 1,
      };
    })
    .filter(
      (item): item is { isCurrent: boolean; path: string } => item !== null,
    );

  return (
    <nav aria-label="breadcrumbs" className="breadcrumbs-container">
      <ul className="breadcrumbs">
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

export default Breadcrumbs;
