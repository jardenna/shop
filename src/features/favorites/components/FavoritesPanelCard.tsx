import Img from '../../../components/Img';
import ProductPrice from '../../shop/components/productPrice/ProductPrice';
import './_favorites-panel-cart.scss';

interface OrderItemContainerData {
  discount: number;
  image: string;
  price: number;
  productName: string;
}

interface FavoritesPanelCardProps {
  product: OrderItemContainerData;
}

const FavoritesPanelCard = ({ product }: FavoritesPanelCardProps) => (
  <article className="favorites-item-card">
    <Img src={product.image} alt="" className="favorite-item-img" />
    <ProductPrice price={product.price} discount={product.discount} />
  </article>
);

export default FavoritesPanelCard;
