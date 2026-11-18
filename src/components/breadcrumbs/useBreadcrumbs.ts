import { useLocation, useParams } from 'react-router';
import { useLanguage } from '../../features/language/useLanguage';
import { isAdminPath, toCamelCase } from '../../utils/utils';
import { BaseBreadcrumbProps, BreadcrumbsProps } from './Breadcrumbs';

const splitPath = (path: string) => path.split('/').filter(Boolean);

const getLastPathSegment = (path: string) => splitPath(path).at(-1);

const getBreadcrumbPaths = (pathname: string) => {
  const pathnames = splitPath(pathname);

  return pathnames.map(
    (_, index) => `/${pathnames.slice(0, index + 1).join('/')}`,
  );
};

const hiddenPathSegments = ['update', 'view', 'promo-code'];

const isHiddenBreadcrumb = (segment: string) =>
  hiddenPathSegments.includes(segment.toLowerCase());

const matchesRoute = (routePath: string, currentPath: string) => {
  const routeParts = splitPath(routePath);
  const currentParts = splitPath(currentPath);

  return (
    routeParts.length === currentParts.length &&
    routeParts.every(
      (part, index) => part.startsWith(':') || part === currentParts[index],
    )
  );
};

interface UseBreadcrumbsProps extends BaseBreadcrumbProps {
  routeList: BreadcrumbsProps['routeList'];
  subMenu: BreadcrumbsProps['subMenu'];
}

export const useBreadcrumbs = ({
  routeList,
  subMenu,
  productName,
  currentLabel,
}: UseBreadcrumbsProps) => {
  const { pathname } = useLocation();
  const { category, categoryId } = useParams();
  const { language } = useLanguage();

  const paths = getBreadcrumbPaths(pathname);
  const fullPaths = isAdminPath(pathname) ? paths : ['/', ...paths];

  const resolveLabel = (path: string) => {
    if (path === '/') {
      return language.home;
    }

    if (paths.at(-1) === path && currentLabel) {
      return currentLabel;
    }

    const lastSegment = getLastPathSegment(path);
    const translationKey = lastSegment ? toCamelCase(lastSegment) : '';

    if (translationKey && language[translationKey]) {
      return language[translationKey];
    }

    const selectedCategory = subMenu?.find(
      ({ categoryId }) => categoryId === lastSegment,
    );

    const categoryLabel = selectedCategory
      ? language[selectedCategory.label]
      : undefined;

    const matchedRoute = routeList?.find(
      ({ path: routePath }) => routePath && matchesRoute(routePath, path),
    );

    if (matchedRoute) {
      if (matchedRoute.path.includes(':id') && productName) {
        return productName;
      }

      if (matchedRoute.path.includes(':categoryId') && categoryId && subMenu) {
        if (categoryLabel) {
          return categoryLabel;
        }

        const found = subMenu.find(
          (menuItem) => menuItem.categoryId === categoryId,
        );

        if (found) {
          return language[found.label] ?? found.label;
        }
      }

      if (matchedRoute.path.includes(':category') && category) {
        return language[category] ?? category;
      }
    }

    return decodeURIComponent(lastSegment ?? '');
  };

  const breadcrumbItems = fullPaths
    .map((path, index) => {
      const lastSegment = getLastPathSegment(path);

      if (path !== '/' && (!lastSegment || isHiddenBreadcrumb(lastSegment))) {
        return null;
      }

      return {
        path,
        isCurrent: index === fullPaths.length - 1,
        label: resolveLabel(path),
      };
    })
    .filter((item) => item !== null);

  return {
    breadcrumbItems,
    ariaLabel: language.breadcrumbs,
  };
};
