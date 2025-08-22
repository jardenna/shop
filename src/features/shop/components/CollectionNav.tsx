import { ErrorBoundary } from 'react-error-boundary';
import { NavLink } from 'react-router';
import type { ProductMenuResponse } from '../../../app/api/apiTypes/shopApiTypes';
import ErrorBoundaryFallback from '../../../components/ErrorBoundaryFallback';
import Skeleton from '../../../components/skeleton/Skeleton';
import LayoutElement from '../../../layout/LayoutElement';
import { ShopPath } from '../../../layout/nav/enums';
import { getlowerCaseFirstLetter } from '../../../utils/utils';
import useLanguage from '../../language/useLanguage';

type CollectionNavProps = {
  ariaLabel: string;
  category: string;
  isLoading: boolean;
  showAllText: string;
  subMenu: ProductMenuResponse[];
  onReset: () => void;
};

const CollectionNav = ({
  subMenu,
  ariaLabel,
  category,
  showAllText,
  isLoading,
  onReset,
}: CollectionNavProps) => {
  const { language } = useLanguage();

  return (
    <LayoutElement as="nav" ariaLabel={ariaLabel}>
      <ul className="collection-nav-list">
        <li className="collection-nav-item">
          <NavLink to={`/${ShopPath.Collection}/${category}`}>
            {showAllText}
          </NavLink>
        </li>

        {isLoading ? (
          <Skeleton />
        ) : (
          <ErrorBoundary
            FallbackComponent={ErrorBoundaryFallback}
            onReset={onReset}
          >
            <>
              {subMenu.map(({ label, categoryId }) => (
                <li className="collection-nav-item" key={categoryId}>
                  <NavLink
                    to={`/${ShopPath.Collection}/${category}/${categoryId}`}
                  >
                    {getlowerCaseFirstLetter(label, language)}
                  </NavLink>
                </li>
              ))}
            </>
          </ErrorBoundary>
        )}
      </ul>
    </LayoutElement>
  );
};
export default CollectionNav;
