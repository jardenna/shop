import {
  CartItem,
  CartListResponse,
} from '../../../../app/api/apiTypes/cartApiTypes';
import LayoutElement from '../../../../layout/LayoutElement';
import './_order-summary-list.scss';
import OrderSummaryItem from './OrderSummaryItem';

interface OrderSummaryListProps {
  isLoading: boolean;
  language: Record<string, string>;
  orderItems?: CartListResponse;
  deleteCartItem: (cartItemId: string) => void;
}

const OrderSummaryList = ({
  orderItems,
  language,
  deleteCartItem,
  isLoading,
}: OrderSummaryListProps) => {
  const getCartQuantity = (cartItems: CartItem[]): number =>
    cartItems.reduce((totalQty, cartItem) => totalQty + cartItem.qty, 0);

  return (
    orderItems && (
      <div>
        <LayoutElement ariaLabel="order">
          <h2 className="order-flow-title">
            {language.orderSummary} [ {getCartQuantity(orderItems.cartItems)} ]
          </h2>
        </LayoutElement>
        <ul className="order-list">
          {orderItems.cartItems.map((cartItem) => (
            <li key={cartItem.id} className="order-list-item">
              <OrderSummaryItem
                cartItem={cartItem}
                language={language}
                ariaLabel={`${language.delete} ${cartItem.productName}`}
                onDeleteItem={() => {
                  deleteCartItem(cartItem.id);
                }}
                isLoading={isLoading}
              />
            </li>
          ))}
        </ul>
      </div>
    )
  );
};

export default OrderSummaryList;
