import { Order } from '../../../app/api/apiTypes/cartApiTypes';
import LabelValueGrid from '../../../components/labelValueGrid/LabelValueGrid';
import { translateKey } from '../../../utils/utils';
import FavoriteItem from './FavoriteItem';

interface FavoriteCartItemProps {
  language: Record<string, string>;
  order: Order;
}

const FavoriteCartItem = ({ order, language }: FavoriteCartItemProps) => (
  <FavoriteItem product={order}>
    <div>
      <LabelValueGrid text={language.color}>
        {translateKey(order.color, language)}
      </LabelValueGrid>
      <LabelValueGrid text={language.size}>{order.size}</LabelValueGrid>
      <LabelValueGrid text={language.qty}>{order.qty}</LabelValueGrid>
    </div>
  </FavoriteItem>
);

export default FavoriteCartItem;
