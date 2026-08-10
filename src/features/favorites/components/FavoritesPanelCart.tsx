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
  <article className="order-item-cart">
    <Img src={product.image} alt="" className="order-item-img" />
    <div>
      <h2 className="order-item-title">{product.productName}</h2>
      <ProductPrice price={product.price} discount={product.discount} />
    </div>
  </article>
);

export default FavoritesPanelCart;
