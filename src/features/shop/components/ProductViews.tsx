import IconBtn from '../../../components/IconBtn';
import { IconName } from '../../../types/enums';
import useLanguage from '../../language/useLanguage';

type ProductViews = 'grid' | 'list';

type ProductViewsProps = {
  productCount: number | null;
  onSelectProductView: (id: ProductViews) => void;
};

const ProductViews = ({
  productCount,
  onSelectProductView,
}: ProductViewsProps) => {
  const { language } = useLanguage();

  return (
    <div className="product-views-container">
      <IconBtn
        iconName={IconName.LayoutList}
        title={language.list}
        ariaLabel={language.viewAsList}
        size="18"
        onClick={() => {
          onSelectProductView('list');
        }}
      />
      <IconBtn
        iconName={IconName.LayoutGrid}
        title={language.grid}
        ariaLabel={language.viewAsGrid}
        size="16"
        onClick={() => {
          onSelectProductView('grid');
        }}
      />
      <span>
        {productCount} {language.products}
      </span>
    </div>
  );
};

export default ProductViews;
