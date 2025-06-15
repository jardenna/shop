import { Link, matchPath, useLocation } from 'react-router';
import useLanguage from '../../features/language/useLanguage';
import LayoutElement from '../../layout/LayoutElement';
import { MainPath } from '../../layout/nav/enums';
import { Routes } from '../../routes/routeConfig';
import BreadcrumbItem from './BreadcrumbItem';
import './_breadcrumbs.scss';

const matchRoute = (routePath: string, currentPath: string) =>
  Boolean(matchPath({ path: routePath, end: true }, currentPath));

const Breadcrumbs = ({
  routeList,
  currentLabel,
}: {
  routeList: Routes[];
  currentLabel?: string;
}) => {
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

    const label =
      matchedRoute.path?.includes(':id') && currentLabel
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
      <ul className="breadcrumbs">
        <li>
          <Link to={MainPath.Root}>{language.home}</Link>
        </li>
        {breadcrumbItems}
      </ul>
    </LayoutElement>
  );
};

export default Breadcrumbs;
