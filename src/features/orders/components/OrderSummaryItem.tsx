import { BaseOrder } from '../../../app/api/apiTypes/cartApiTypes';
import DeleteItem from '../../../components/deleteItem/DeleteItem';
import Img from '../../../components/Img';
import SummaryInfo from './SummaryInfo';

interface OrderSummaryItemProps {
  ariaLabel: string;
  cartItem: BaseOrder;
  language: Record<string, string>;
  productName: string;
  src: string;
  onDeleteItem?: () => void;
}

const OrderSummaryItem = ({
  src,
  ariaLabel,
  productName,
  onDeleteItem,
  language,
  cartItem,
}: OrderSummaryItemProps) => (
  <article className="order-summary-item">
    <Img src={src} alt="" className="summary-img" />
    <div>
      <div className="flex">
        <h3 className="summary-item-title">{productName}</h3>
        {onDeleteItem && (
          <DeleteItem
            ariaLabel={ariaLabel}
            onDeleteItem={onDeleteItem}
            itemName={productName}
          />
        )}
      </div>
      <SummaryInfo cartItem={cartItem} language={language} />
    </div>
  </article>
);

export default OrderSummaryItem;
