import { CartListResponse } from '../../../app/api/apiTypes/cartApiTypes';
import { getCartQuantity } from '../../../utils/reduceQty';
import './_order.scss';
import OrderSummaryItem from './OrderSummaryItem';

interface OrderSummaryListProps {
  language: Record<string, string>;
  orderItems?: CartListResponse;
  deleteCartItem: (cartItemId: string) => void;
}

const OrderSummaryList = ({
  orderItems,
  language,
  deleteCartItem,
}: OrderSummaryListProps) =>
  orderItems && (
    <>
      <h2 className="order-flow-title">
        {language.orderSummary} [ {getCartQuantity(orderItems.cartItems)} ]
      </h2>
      <ul className="order-summary-list">
        {orderItems.cartItems.map((cartItem) => (
          <li key={cartItem.id}>
            <OrderSummaryItem
              cartItem={cartItem}
              language={language}
              ariaLabel={`${language.delete} ${cartItem.productName}`}
              onDeleteItem={() => {
                deleteCartItem(cartItem.id);
              }}
            />
          </li>
        ))}
      </ul>
    </>
  );

export default OrderSummaryList;
