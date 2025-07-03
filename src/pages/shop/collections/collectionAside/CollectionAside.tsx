import { ProductMenuResponse } from '../../../../app/api/apiTypes/shopApiTypes';
import useLanguage from '../../../../features/language/useLanguage';
import LayoutElement from '../../../../layout/LayoutElement';
import CollectionNav from './CollectionNav';
import './_collection-aside.scss';

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
        as="header"
        className="collection-aside-header"
      >
        <h1>{asideHeading}</h1>
      </LayoutElement>
      {subMenu && (
        <CollectionNav
          subMenu={subMenu}
          category={category || 'women'}
          showAllText={language.showAll}
          ariaLabel={language.page}
          isLoading={isLoading}
          onReset={() => {
            onReset();
          }}
        />
      )}
    </aside>
  );
};

export default CollectionAside;
