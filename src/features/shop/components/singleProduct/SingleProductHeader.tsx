import { BaseShopProduct } from '../../../../app/api/apiTypes/sharedApiTypes';
import FavoriteHeart from '../../../../components/favorites/FavoriteHeart';
import { useLanguage } from '../../../language/useLanguage';

type SingleProductHeaderProps = {
  product: BaseShopProduct;
};

const SingleProductHeader = ({ product }: SingleProductHeaderProps) => {
  const { language } = useLanguage();
  return (
    <header>
      <span>
        {language.brand}: {product.brand}
      </span>
      <div className="single-product-heading">
        <h1>{product.productName}</h1>
        <FavoriteHeart id={product.id} />
      </div>
    </header>
  );
};

export default SingleProductHeader;
