import { CartListResponse } from '../../../app/api/apiTypes/cartApiTypes';
import { Summary } from '../../../app/api/apiTypes/sharedApiTypes';
import DeleteItem from '../../../components/deleteItem/DeleteItem';
import Img from '../../../components/Img';
import SkeletonList from '../../../components/skeleton/SkeletonList';
import { getCartQuantity } from '../../../utils/reduceQty';
import CartSummary from '../../cart/components/CartSummary';
import './_order.scss';
import SummaryInfo from './SummaryInfo';

interface OrderSummaryListProps {
  isLoading: boolean;
  language: Record<string, string>;
  summary: Summary;
  orderItems?: CartListResponse;
  deleteCartItem: (cartItemId: string) => void;
}

const OrderSummaryList = ({
  orderItems,
  isLoading,
  language,
  deleteCartItem,
  summary,
}: OrderSummaryListProps) => {
  if (isLoading) {
    return <SkeletonList />;
  }

  return (
    <aside className="order-summary">
      {orderItems && (
        <>
          <h2 className="summary-title">
            {language.orderSummary} [ {getCartQuantity(orderItems.cartItems)} ]
          </h2>
          <ul className="order-summary-list">
            {orderItems.cartItems.map(
              ({ id, image, productName, color, size, qty }) => (
                <li key={id}>
                  <article className="order-summary-item">
                    <Img src={image} alt="" className="summary-img" />
                    <div>
                      <h3 className="summary-item-title">{productName}</h3>
                      <SummaryInfo
                        qty={qty}
                        color={color}
                        size={size}
                        language={language}
                      />

                      <DeleteItem
                        ariaLabel={`${language.delete} ${productName}`}
                        onDeleteItem={() => {
                          deleteCartItem(id);
                        }}
                        itemName={productName}
                      />
                    </div>
                  </article>
                </li>
              ),
            )}
          </ul>
        </>
      )}
      <CartSummary summary={summary} language={language} />
    </aside>
  );
};
export default OrderSummaryList;
