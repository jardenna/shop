import type { ProductMenuResponse } from '../../../app/api/apiTypes/shopApiTypes';
import ErrorBoundaryFallback from '../../../components/ErrorBoundaryFallback';
import Skeleton from '../../../components/skeleton/Skeleton';
import LayoutElement from '../../../layout/LayoutElement';
import './CollectionAside.styles.scss';
import CollectionNav from './CollectionNav';

type CollectionAsideProps = {
  category: string;
  isError: boolean;
  isLoading: boolean;
  language: Record<string, string>;
  subMenu: ProductMenuResponse[] | null;
  onReset: () => void;
};

const CollectionAside = ({
  subMenu,
  category,
  isLoading,
  onReset,
  language,
  isError,
}: CollectionAsideProps) => (
  <section className="collection-aside">
    {isError && (
      <ErrorBoundaryFallback
        resetErrorBoundary={() => {
          onReset();
        }}
      />
    )}

    {isLoading && (
      <span className="flex flex-column">
        <Skeleton count={4} />
      </span>
    )}
    {subMenu && (
      <LayoutElement as="nav" ariaLabel={language.categoryNavigation}>
        <CollectionNav
          subMenu={subMenu}
          category={category}
          onReset={() => {
            onReset();
          }}
        />
      </LayoutElement>
    )}
  </section>
);
export default CollectionAside;
