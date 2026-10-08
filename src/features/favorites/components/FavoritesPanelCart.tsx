import Img from '../../../components/Img';
import ProductPrice from '../../shop/components/productPrice/ProductPrice';
import './_favorites-panel-cart.scss';

interface OrderItemContainerData {
  discount: number;
  image: string;
  price: number;
  productName: string;
}

interface FavoritesPanelCartProps {
  product: OrderItemContainerData;
}

const FavoritesPanelCart = ({ product }: FavoritesPanelCartProps) => (
  <article className="favorite-item-cart">
    <Img src={product.image} alt="" className="favorite-item-img" />
    <ProductPrice price={product.price} discount={product.discount} />
  </article>
);

export default FavoritesPanelCart;
