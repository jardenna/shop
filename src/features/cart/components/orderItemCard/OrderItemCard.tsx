import { Order } from '../../../../app/api/apiTypes/cartApiTypes';
import LabelValueGrid from '../../../../components/labelValueGrid/LabelValueGrid';
import { translateKey } from '../../../../utils/utils';
import OrderItemContainer from './OrderItemContainer';

interface OrderItemCardProps {
  language: Record<string, string>;
  order: Order;
}

const OrderItemCard = ({ order, language }: OrderItemCardProps) => (
  <OrderItemContainer product={order}>
    <div className="favorite-item-info">
      <LabelValueGrid text={language.color}>
        {translateKey(order.color, language)}
      </LabelValueGrid>
      <LabelValueGrid text={language.size}>{order.size}</LabelValueGrid>
      <LabelValueGrid text={language.qty}>{order.qty}</LabelValueGrid>
    </div>
  </OrderItemContainer>
);

export default OrderItemCard;
