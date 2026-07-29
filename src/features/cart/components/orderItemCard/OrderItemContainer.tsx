import { ReactNode } from 'react';
import Img from '../../../../components/Img';
import ProductPrice from '../../../shop/components/productPrice/ProductPrice';

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
  <article className="favorite-item">
    <Img src={product.image} alt="" className="favorite-item-img" />
    <div>
      <h2 className="favorite-item-title">{product.productName}</h2>
      <ProductPrice price={product.price} discount={product.discount} />
      {children}
    </div>
  </article>
);

export default OrderItemContainer;
