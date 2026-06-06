import Img from '../../../../components/Img';
import { translateKey } from '../../../../utils/utils';
import { CartResult } from '../../cartUtils';

// interface PopupData extends CartResult {
//   existingVariant: CartItem;
// }

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
      <h2>FLERE STØRRELSER</h2>
      <p>
        Returneringer har en påvirkning på miljøet. Se, om vores størrelsesguide
        og produktoplysninger kan hjælpe dig med at finde den rigtige størrelse.
      </p>
      <div>
        {popupData.existingVariant && (
          <Img alt="" src={popupData.existingVariant.image} />
        )}
      </div>
      {changed} {newValue} {value}
    </div>
  );
};

export default SingleProductPanel;
