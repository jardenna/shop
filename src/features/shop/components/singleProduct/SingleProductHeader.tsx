import { BaseShopProduct } from '../../../../app/api/apiTypes/sharedApiTypes';
import FavoriteHeart from '../../../../components/favorites/FavoriteHeart';
import LayoutElement from '../../../../layout/LayoutElement';
import { useLanguage } from '../../../language/useLanguage';

interface SingleProductHeaderProps {
  ariaLabel: string;
  product: BaseShopProduct;
}

const SingleProductHeader = ({
  product,
  ariaLabel,
}: SingleProductHeaderProps) => {
  const { language } = useLanguage();
  return (
    <LayoutElement ariaLabel={ariaLabel}>
      <span>
        {language.brand}: {product.brand}
      </span>
      <div className="single-product-heading">
        <h1>{product.productName}</h1>
        <FavoriteHeart id={product.id} />
      </div>
    </LayoutElement>
  );
};

export default SingleProductHeader;
