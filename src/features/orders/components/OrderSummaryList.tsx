import { CartListResponse } from '../../../app/api/apiTypes/cartApiTypes';
import DeleteItem from '../../../components/deleteItem/DeleteItem';
import Img from '../../../components/Img';
import SkeletonList from '../../../components/skeleton/SkeletonList';
import { translateKey } from '../../../utils/utils';

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
    <section>
      <h2>Order summary [add reduced qty]</h2>
      {orderItems &&
        orderItems.cartItems.map((order) => (
          <article key={order.id}>
            <h3>{order.productName}</h3>
            <div>
              <Img src={order.image} alt="" />
              <span>QTY {order.qty}</span>
              <span>/</span>
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
          </article>
        ))}
    </section>
  );
};
export default OrderSummaryList;
