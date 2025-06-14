import { NavLink, matchPath, useLocation } from 'react-router';
import useLanguage from '../../features/language/useLanguage';
import LayoutElement from '../../layout/LayoutElement';
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
        <span>{'\u203A'}</span>
        <NavLink to={to}>{language[matchedRoute.label]}</NavLink>
      </span>
    );
  });

  return (
    <LayoutElement as="nav" ariaLabel="breadcrumbs" className="breadcrumb">
      <NavLink to={MainPath.Root}>{language.home}</NavLink>
      {breadcrumbItems}
    </LayoutElement>
  );
};

export default Breadcrumbs;
