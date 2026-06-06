import { CartItem } from '../../../../app/api/apiTypes/sharedApiTypes';
import Button from '../../../../components/Button';
import Img from '../../../../components/Img';
import { translateKey } from '../../../../utils/utils';
import type { ChangedAttribute } from '../../cartUtils';
import './_single-product-panel.scss';

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
    <section className="single-product-panel">
      <h2>FLERE STØRRELSER</h2>
      <p>
        Returneringer har en påvirkning på miljøet. Se, om vores størrelsesguide
        og produktoplysninger kan hjælpe dig med at finde den rigtige størrelse.
      </p>
      <div>
        <Img
          className="product-panel-img"
          alt=""
          src={popupData.existingVariant.image}
        />
      </div>

      <Button>
        Erstat {changed.toLowerCase()} {value.toLowerCase()} med{' '}
        {changed.toLowerCase()} {newValue.toLowerCase()}
      </Button>
      <Button>
        Behold {changed.toLowerCase()} {value.toLowerCase()}
      </Button>
      <Button>Behold begge størrelser</Button>
    </section>
  );
};

export default SingleProductPanel;
