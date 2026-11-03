import { Order } from '../../../../app/api/apiTypes/cartApiTypes';
import DeleteItem from '../../../../components/deleteItem/DeleteItem';
import Img from '../../../../components/Img';
import { Language } from '../../../../types/types';
import SummaryInfo from './SummaryInfo';

interface OrderSummaryItemProps {
  ariaLabel: string;
  cartItem: Order;
  isLoading: boolean;
  language: Language;
  onDeleteItem: () => void;
}

const OrderSummaryItem = ({
  ariaLabel,
  onDeleteItem,
  language,
  cartItem,
  isLoading,
}: OrderSummaryItemProps) => (
  <article className="order-list-content">
    <Img src={cartItem.image} alt="" className="order-img" />
    <div>
      <div className="order-list-content-action">
        <h3 className="payment-summary-item">{cartItem.productName}</h3>
        <DeleteItem
          isLoading={isLoading}
          ariaLabel={ariaLabel}
          onDeleteItem={onDeleteItem}
          itemName={cartItem.productName}
        />
      </div>
      <SummaryInfo cartItem={cartItem} language={language} />
    </div>
  </article>
);

export default OrderSummaryItem;
