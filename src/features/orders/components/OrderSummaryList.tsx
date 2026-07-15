import { CartListResponse } from '../../../app/api/apiTypes/cartApiTypes';
import DeleteItem from '../../../components/deleteItem/DeleteItem';
import Img from '../../../components/Img';
import SkeletonList from '../../../components/skeleton/SkeletonList';
import { translateKey } from '../../../utils/utils';
import './_order.scss';

interface OrderSummaryListProps {
  isLoading: boolean;
  language: Record<string, string>;
  orderItems?: CartListResponse | null;
  deleteCartItem: (cartItemId: string) => void;
}

const OrderSummaryList = ({
  orderItems,
  isLoading,
  language,
  deleteCartItem,
}: OrderSummaryListProps) => {
  if (isLoading) {
    return <SkeletonList />;
  }

  return (
    <section className="order-summary">
      <h2 className="summary-title">Order summary [add reduced qty]</h2>
      {orderItems && (
        <ul className="order-summary-list">
          {orderItems.cartItems.map((order) => (
            <li key={order.id}>
              <article className="order-summary-item">
                <Img src={order.image} alt="" className="summary-img" />
                <div>
                  <h3 className="summary-item-title">{order.productName}</h3>
                  <div className="summery">
                    <span>QTY {order.qty}</span>
                    <span aria-hidden>/</span>
                    <span>{translateKey(order.color, language)}</span>
                    <span>/</span>
                    <span>SIZE {order.size}</span>
                  </div>
                  <DeleteItem
                    ariaLabel={`${language.delete} ${order.productName}`}
                    onDeleteItem={() => {
                      deleteCartItem(order.id);
                    }}
                    itemName={order.productName}
                  />
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
export default OrderSummaryList;
