import { translateKey } from '../../../../utils/utils';
import { CartResult } from '../../cartUtils';

type SingleProductPanelProps = {
  language: Record<string, string>;
  popupData: CartResult;
};

const SingleProductPanel = ({
  popupData,
  language,
}: SingleProductPanelProps) => {
  const newValue = translateKey(popupData.incomingValue, language);
  const value = translateKey(popupData.existingValue, language);
  const changed = translateKey(popupData.changedAttribute, language);

  return (
    <div>
      {changed} {newValue} {value}
    </div>
  );
};

export default SingleProductPanel;
