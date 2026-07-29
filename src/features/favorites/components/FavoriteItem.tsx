import { BaseProduct } from '../../../app/api/apiTypes/sharedApiTypes';
import Img from '../../../components/Img';
import ProductPrice from '../../shop/components/productPrice/ProductPrice';
import './_favorite-list.scss';

interface FavoriteItemProps {
  selectedProduct: BaseProduct;
}

const FavoriteItem = ({ selectedProduct }: FavoriteItemProps) => (
  <article className="favorite-item">
    <Img src={selectedProduct.image} alt="" className="favorite-item-img" />
    <div>
      <h2 className="favorite-item-title">{selectedProduct.productName}</h2>
      <ProductPrice
        price={selectedProduct.price}
        discount={selectedProduct.discount}
      />
    </div>
  </article>
);

export default FavoriteItem;
