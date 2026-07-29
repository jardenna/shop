import { BaseProduct } from '../../../app/api/apiTypes/sharedApiTypes';
import Img from '../../../components/Img';
import ProductPrice from '../../shop/components/productPrice/ProductPrice';

interface FavoriteItemProps {
  product: BaseProduct;
}

const FavoriteItem = ({ product }: FavoriteItemProps) => (
  <article className="favorite-item">
    <Img src={product.image} alt="" className="favorite-item-img" />
    <div>
      <h2 className="favorite-item-title">{product.productName}</h2>
      <ProductPrice price={product.price} discount={product.discount} />
    </div>
  </article>
);

export default FavoriteItem;
