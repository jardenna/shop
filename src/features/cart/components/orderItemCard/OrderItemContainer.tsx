import { ReactNode } from 'react';
import Img from '../../../../components/Img';
import ProductPrice from '../../../shop/components/productPrice/ProductPrice';
import './_order-item-card.scss';

interface OrderItemContainerData {
  discount: number;
  image: string;
  price: number;
  productName: string;
}

interface OrderItemContainerProps {
  product: OrderItemContainerData;
  children?: ReactNode;
}

const OrderItemContainer = ({ product, children }: OrderItemContainerProps) => (
  <article className="order-item">
    <Img src={product.image} alt="" className="order-item-img" />
    <div>
      <h2 className="order-item-title">{product.productName}</h2>
      <ProductPrice price={product.price} discount={product.discount} />
      {children}
    </div>
  </article>
);

export default OrderItemContainer;
