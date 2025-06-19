import { ErrorBoundary } from 'react-error-boundary';
import { Link, matchPath, useLocation } from 'react-router';
import useLanguage from '../../features/language/useLanguage';
import LayoutElement from '../../layout/LayoutElement';
import { MainPath } from '../../layout/nav/enums';
import { Routes } from '../../routes/routeConfig';
import ErrorBoundaryFallback from '../ErrorBoundaryFallback';
import BreadcrumbItem from './BreadcrumbItem';
import './_breadcrumbs.scss';

type BreadCrumbsProps = {
  routeList: Routes[];
  currentLabel?: string;
  onReset?: () => void;
};

const matchRoute = (routePath: string, currentPath: string) =>
  Boolean(matchPath({ path: routePath, end: true }, currentPath));

const Breadcrumbs = ({
  routeList,
  currentLabel,
  onReset,
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
    const baseLabel = language[matchedRoute.label] ?? '';
    const needsLabelSuffix = [':id', ':category'].some((param) =>
      matchedRoute.path?.includes(param),
    );

    const label =
      needsLabelSuffix && currentLabel
        ? `${baseLabel} ${currentLabel}`
        : baseLabel;

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
      <ErrorBoundary
        FallbackComponent={ErrorBoundaryFallback}
        onReset={onReset}
      >
        <ul className="breadcrumbs">
          <li>
            <Link to={MainPath.Root}>{language.home}</Link>
          </li>
          {breadcrumbItems}
        </ul>
      </ErrorBoundary>
    </LayoutElement>
  );
};

export default Breadcrumbs;
