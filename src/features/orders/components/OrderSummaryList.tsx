import { CartListResponse } from '../../../app/api/apiTypes/cartApiTypes';
import DeleteItem from '../../../components/deleteItem/DeleteItem';
import Img from '../../../components/Img';
import SkeletonList from '../../../components/skeleton/SkeletonList';
import './_order.scss';
import SummaryInfo from './SummaryInfo';

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
      <h2 className="summary-title">
        {language.orderSummary}[add reduced qty]
      </h2>
      {orderItems && (
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
      )}
    </section>
  );
};
export default OrderSummaryList;
