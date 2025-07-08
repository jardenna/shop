import { Link, matchPath, useLocation } from 'react-router';
import useLanguage from '../../features/language/useLanguage';
import LayoutElement from '../../layout/LayoutElement';
import { ShopPath } from '../../layout/nav/enums';
import BreadcrumbItem from './BreadcrumbItem';
import { breadcrumbsListProps } from './breadcrumbsLists';

type BreadCrumbsProps = {
  routeList: breadcrumbsListProps[];
  currentLabel?: string;
};

const matchRoute = (routePath: string, currentPath: string) =>
  Boolean(matchPath({ path: routePath, end: true }, currentPath));

const Breadcrumbs = ({ routeList, currentLabel }: BreadCrumbsProps) => {
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

    const label = isCurrent && currentLabel ? currentLabel : baseLabel;

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
