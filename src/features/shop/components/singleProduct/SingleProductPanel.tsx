import { CartItem } from '../../../../app/api/apiTypes/sharedApiTypes';
import Img from '../../../../components/Img';
import { translateKey } from '../../../../utils/utils';
import type { ChangedAttribute } from '../../cartUtils';

export interface PopupData {
  changedAttribute: ChangedAttribute;
  existingValue: string;
  existingVariant: CartItem;
  incomingValue: string;
}

interface SingleProductPanelProps {
  language: Record<string, string>;
  popupData: PopupData;
}

const SingleProductPanel = ({
  popupData,
  language,
}: SingleProductPanelProps) => {
  const newValue = translateKey(popupData.incomingValue, language);
  const value = translateKey(popupData.existingValue, language);
  const changed = translateKey(popupData.changedAttribute, language);

  return (
    <div>
      <h2>FLERE STØRRELSER</h2>
      <p>
        Returneringer har en påvirkning på miljøet. Se, om vores størrelsesguide
        og produktoplysninger kan hjælpe dig med at finde den rigtige størrelse.
      </p>
      <div>
        <Img alt="" src={popupData.existingVariant.image} />
      </div>
      {changed} {newValue} {value}
    </div>
  );
};

export default SingleProductPanel;
