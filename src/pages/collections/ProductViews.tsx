import IconContent from '../../components/IconContent';
import useLanguage from '../../features/language/useLanguage';
import { IconName } from '../../types/enums';

type ProductViewsProps = {
  productCount: number | null;
};

const ProductViews = ({ productCount }: ProductViewsProps) => {
  const { language } = useLanguage();
  return (
    <div className="product-views-container">
      <IconContent
        iconName={IconName.LayoutList}
        title={language.list}
        ariaLabel={language.viewAsList}
        size="18"
      />
      <IconContent
        iconName={IconName.LayoutGrid}
        title={language.grid}
        ariaLabel={language.viewAsGrid}
        size="16"
      />
      <span>
        {productCount} {language.products}
      </span>
    </div>
  );
};

export default ProductViews;
