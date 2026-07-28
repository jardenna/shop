import { BaseOrder } from '../../../app/api/apiTypes/cartApiTypes';
import { translateKey } from '../../../utils/utils';

interface SummaryInfoProps {
  cartItem: BaseOrder;
  language: Record<string, string>;
}

const SummaryInfo = ({ cartItem, language }: SummaryInfoProps) => (
  <div className="summary">
    <span>
      {language.qty} {cartItem.qty}
    </span>
    <span aria-hidden>/</span>
    <span>{translateKey(cartItem.color, language)}</span>
    <span aria-hidden>/</span>
    <span>
      {language.size} {cartItem.size}
    </span>
  </div>
);

export default SummaryInfo;
