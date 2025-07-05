import { Link, useLocation } from 'react-router';

import { Fragment } from 'react';
import { routeBreadcrumbs } from './breadcrumbsRoutes';

const BreCrumbs = () => {
  const { pathname } = useLocation();
  const pathParts = pathname.split('/').filter(Boolean);

  const generatePaths = () =>
    pathParts.map((_, i) => `/${pathParts.slice(0, i + 1).join('/')}`);

  const getBreadcrumbLabel = (path: string) => {
    const match = routeBreadcrumbs.find((r) => {
      if (!r.path) {
        return false;
      }
      const routeParts = r.path.split('/').filter(Boolean);
      const pathParts = path.split('/').filter(Boolean);
      if (routeParts.length !== pathParts.length) {
        return false;
      }

      return routeParts.every(
        (part, i) => part.startsWith(':') || part === pathParts[i],
      );
    });

    if (!match || !match.label) {
      return decodeURIComponent(path.split('/').pop() || '');
    }

    return match.label;
  };

  const paths = generatePaths();

  return (
    <nav aria-label="Breadcrumb" className="text-sm text-gray-600">
      <ol className="flex space-x-1">
        <li>
          <Link to="/" className="hover:underline">
            Home
          </Link>
        </li>
        {paths.map((path, i) => (
          <Fragment key={path}>
            <span className="mx-1">/</span>
            <li>
              {i === paths.length - 1 ? (
                <span>{getBreadcrumbLabel(path)}</span>
              ) : (
                <Link to={path} className="hover:underline">
                  {getBreadcrumbLabel(path)}
                </Link>
              )}
            </li>
          </Fragment>
        ))}
      </ol>
    </nav>
  );
};

export default BreCrumbs;
