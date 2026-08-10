import { BaseOrder } from '../../../../app/api/apiTypes/cartApiTypes';
import LabelValue from '../../../../components/LabelValue';
import { translateKey } from '../../../../utils/utils';

interface SummaryInfoProps {
  cartItem: BaseOrder;
  language: Record<string, string>;
}

const SummaryInfo = ({ cartItem, language }: SummaryInfoProps) => (
  <div className="new-order-meta">
    <LabelValue
      label={language.color}
      text={translateKey(cartItem.color, language)}
    />
    <LabelValue label={language.size} text={cartItem.size} />
    <LabelValue label={language.qty} text={cartItem.qty} />
  </div>
);

export default SummaryInfo;
