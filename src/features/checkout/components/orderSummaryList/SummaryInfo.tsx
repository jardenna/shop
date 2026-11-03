import { BaseOrder } from '../../../../app/api/apiTypes/cartApiTypes';
import LabelValue from '../../../../components/LabelValue';
import { Language } from '../../../../types/types';
import { translateKey } from '../../../../utils/utils';

interface SummaryInfoProps {
  cartItem: BaseOrder;
  language: Language;
}

const SummaryInfo = ({ cartItem, language }: SummaryInfoProps) => (
  <div className="order-info-meta">
    <LabelValue
      label={language.color}
      text={translateKey(cartItem.color, language)}
    />
    <LabelValue label={language.size} text={cartItem.size} />
    <LabelValue label={language.qty} text={cartItem.qty} />
  </div>
);

export default SummaryInfo;
