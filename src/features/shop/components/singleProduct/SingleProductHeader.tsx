import { BaseShopProduct } from '../../../../app/api/apiTypes/sharedApiTypes';
import FavoriteHeart from '../../../../components/favorites/FavoriteHeart';
import LayoutElement from '../../../../layout/LayoutElement';
import { useLanguage } from '../../../language/useLanguage';

type SingleProductHeaderProps = {
  product: BaseShopProduct;
};

const SingleProductHeader = ({ product }: SingleProductHeaderProps) => {
  const { language } = useLanguage();
  return (
    <LayoutElement ariaLabel="page">
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
