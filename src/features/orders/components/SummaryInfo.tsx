import { Size } from '../../../app/api/apiTypes/sharedApiTypes';
import { translateKey } from '../../../utils/utils';

interface SummaryInfoProps {
  color: string;
  language: Record<string, string>;
  qty: number;
  size: Size | '';
}

const SummaryInfo = ({ qty, size, color, language }: SummaryInfoProps) => (
  <div className="summary">
    <span>
      {language.qty} {qty}
    </span>
    <span aria-hidden>/</span>
    <span>{translateKey(color, language)}</span>
    <span aria-hidden>/</span>
    <span>
      {language.size} {size}
    </span>
  </div>
);

export default SummaryInfo;
