import type { ProductMenuResponse } from '../../../app/api/apiTypes/shopApiTypes';
import Skeleton from '../../../components/skeleton/Skeleton';
import LayoutElement from '../../../layout/LayoutElement';
import useLanguage from '../../language/useLanguage';
import './CollectionAside.styles.scss';
import CollectionNav from './CollectionNav';

type CollectionAsideProps = {
  asideHeading: string;
  category: string;
  isLoading: boolean;
  subMenu: ProductMenuResponse[] | null;
  onReset: () => void;
};

const CollectionAside = ({
  asideHeading,
  subMenu,
  category,
  isLoading,
  onReset,
}: CollectionAsideProps) => {
  const { language } = useLanguage();

  return (
    <aside className="collection-aside">
      <LayoutElement
        ariaLabel={language.page}
        className="collection-aside-header"
      >
        <h1>{asideHeading}</h1>
      </LayoutElement>
      {isLoading && (
        <div className="flex column">
          <Skeleton count={4} />
        </div>
      )}
      {subMenu && (
        <CollectionNav
          subMenu={subMenu}
          category={category}
          showAllText={language.showAll}
          ariaLabel={language.page}
          onReset={() => {
            onReset();
          }}
        />
      )}
    </aside>
  );
};

export default CollectionAside;
