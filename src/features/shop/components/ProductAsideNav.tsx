import { ErrorBoundary } from 'react-error-boundary';
import { NavLink } from 'react-router';
import type { ProductMenuResponse } from '../../../app/api/apiTypes/shopApiTypes';
import ErrorBoundaryFallback from '../../../components/ErrorBoundaryFallback';
import { translateKey } from '../../../utils/utils';
import { useLanguage } from '../../language/useLanguage';

export interface ProductAsideNavProps {
  basePath: string;
  subMenu: ProductMenuResponse[];
  linkTo?: string;
  onReset: () => void;
}

const ProductAsideNav = ({
  subMenu,
  onReset,
  linkTo,
  basePath,
}: ProductAsideNavProps) => {
  const { language } = useLanguage();

  return (
    <ul className="product-nav-list">
      {linkTo && (
        <li className="product-nav-item">
          <NavLink to={linkTo} end>
            {language.showAll}
          </NavLink>
        </li>
      )}

      <ErrorBoundary
        FallbackComponent={ErrorBoundaryFallback}
        onReset={onReset}
      >
        {subMenu.map(({ label, categoryId }) => (
          <li className="product-nav-item" key={categoryId}>
            <NavLink to={`${basePath}/${categoryId}`}>
              {translateKey(label, language)}
            </NavLink>
          </li>
        ))}
      </ErrorBoundary>
    </ul>
  );
};

export default ProductAsideNav;
