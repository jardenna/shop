import { Fragment } from 'react';
import { Link, useLocation, useParams } from 'react-router';
import { useGetShopMenuQuery } from '../../features/shop/shopApiSlice';
import { IconName } from '../../types/enums';
import Icon from '../icons/Icon';
import './_breadcrumbs.scss';
import { routeBreadcrumbs } from './breadcrumbsRoutes';

const BreCrumbs = ({ productName }: { productName?: string }) => {
  const { pathname } = useLocation();
  const { category, categoryId } = useParams();
  const pathParts = pathname.split('/').filter(Boolean);

  const generatePaths = () =>
    pathParts.map((_, i) => `/${pathParts.slice(0, i + 1).join('/')}`);

  const { data: subMenu } = useGetShopMenuQuery(category || 'women');

  const getBreadcrumbLabel = (path: string) => {
    const parts = path.split('/').filter(Boolean);

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

    // Fallback if no route matched
    if (!match || !match.path) {
      return decodeURIComponent(
        parts.length > 0 ? parts[parts.length - 1] : '',
      );
    }
    // Special case: productId (RTK query match)
    if (match.path.includes(':id')) {
      return productName;
    }

    // Special case: categoryId (subMenu match)
    if (match.path.includes(':categoryId')) {
      const found = subMenu?.find((s) => s.categoryId === categoryId);
      return found?.label || categoryId;
    }

    // Default: static label or fallback
    return (
      match.label ||
      decodeURIComponent(parts.length > 0 ? parts[parts.length - 1] : '')
    );
  };

  const paths = generatePaths();

  return (
    <nav aria-label="breadcrumbs" className="breadcrumbs-container">
      <ul className="breadcrumbs">
        <li>
          <Link to="/">Home</Link>
        </li>
        {paths.map((path) => (
          <Fragment key={path}>
            <Icon iconName={IconName.ChevronRight} title="Chevron right" />
            <li>
              <Link to={path}>{getBreadcrumbLabel(path)}</Link>
            </li>
          </Fragment>
        ))}
      </ul>
    </nav>
  );
};
export default BreCrumbs;
