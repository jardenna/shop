import { NavLink, matchPath, useLocation } from 'react-router';
import useLanguage from '../../features/language/useLanguage';
import { MainPath } from '../../layout/nav/enums';
import { routeList } from '../../routes/routeConfig';

const matchRoute = (routePath: string, currentPath: string) =>
  Boolean(matchPath({ path: routePath, end: true }, currentPath));

const Breadcrumbs = () => {
  const location = useLocation();
  const { language } = useLanguage();
  const pathnames: string[] = location.pathname.split('/').filter(Boolean);

  const breadcrumbItems = pathnames.map((_, index) => {
    const to = `/${pathnames.slice(0, index + 1).join('/')}`;

    const matchedRoute = routeList.find(
      (route) => route.path && matchRoute(route.path, to),
    );
    if (!matchedRoute) {
      return null;
    }

    return (
      <span key={to}>
        <NavLink to={to}>{language[matchedRoute.label]} / </NavLink>
      </span>
    );
  });

  return (
    <nav>
      <NavLink to={MainPath.Root}>Home</NavLink>
      {breadcrumbItems.length > 0 && ' / '}
      {breadcrumbItems}
    </nav>
  );
};

export default Breadcrumbs;
