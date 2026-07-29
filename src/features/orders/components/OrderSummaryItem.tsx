import { Order } from '../../../app/api/apiTypes/cartApiTypes';
import DeleteItem from '../../../components/deleteItem/DeleteItem';
import Img from '../../../components/Img';
import SummaryInfo from './SummaryInfo';

interface OrderSummaryItemProps {
  ariaLabel: string;
  cartItem: Order;
  language: Record<string, string>;
  onDeleteItem: () => void;
}

const OrderSummaryItem = ({
  ariaLabel,
  onDeleteItem,
  language,
  cartItem,
}: OrderSummaryItemProps) => (
  <article className="order-summary-item">
    <Img src={cartItem.image} alt="" className="summary-img" />
    <div>
      <div className="flex">
        <h3 className="summary-item-title">{cartItem.productName}</h3>
        <DeleteItem
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
