import { Fragment } from 'react';
import { Link, useLocation, useParams } from 'react-router';
import useLanguage from '../../features/language/useLanguage';
import { useGetShopMenuQuery } from '../../features/shop/shopApiSlice';
import { ShopPath } from '../../layout/nav/enums';
import { IconName } from '../../types/enums';
import Icon from '../icons/Icon';
import './_breadcrumbs.scss';
import { routeBreadcrumbs } from './breadcrumbsRoutes';

const BreCrumbs = ({ productName }: { productName?: string }) => {
  const { pathname } = useLocation();
  const { category, categoryId } = useParams();
  const { language } = useLanguage();
  const pathParts = pathname.split('/').filter(Boolean);

  const generatePaths = () =>
    pathParts.map((_, i) => `/${pathParts.slice(0, i + 1).join('/')}`);

  const { data: subMenu } = useGetShopMenuQuery(category || 'women');

  const resolveLabel = ({
    path,
    match,
  }: {
    path: string;
    match?: { label?: string; path?: string };
  }) => {
    if (!match || !match.path) {
      const parts = path.split('/').filter(Boolean);
      return decodeURIComponent(
        parts.length > 0 ? parts[parts.length - 1] : '',
      );
    }

    if (match.path.includes(':id')) {
      return productName;
    }
    if (match.path.includes(':categoryId')) {
      const found = subMenu?.find((s) => s.categoryId === categoryId);

      return found?.label || '';
    }

    if (match.label) {
      return language[match.label];
    }

    const parts = path.split('/').filter(Boolean);
    return decodeURIComponent(parts.at(-1) || '');
  };

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

    return resolveLabel({ path, match });
  };

  const paths = generatePaths();

  return (
    <nav aria-label="breadcrumbs" className="breadcrumbs-container">
      <ul className="breadcrumbs">
        <li>
          <Link to={ShopPath.Root}>{language.home}</Link>
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
