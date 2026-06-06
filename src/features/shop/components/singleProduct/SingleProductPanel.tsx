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
  const { incomingValue, existingValue, changedAttribute, existingVariant } =
    popupData;

  const newValue = translateKey(incomingValue, language);
  const value = translateKey(existingValue, language);

  const changedValue =
    changedAttribute === 'size'
      ? language.sizeLowercase
      : language.colorLowercase;

  return (
    <section className="single-product-panel">
      <h2>
        {language.singleProductPanelHeading} {changedValue}
      </h2>
      <p>{language.singleProductPanelText}</p>
      <div>
        <Img className="product-panel-img" alt="" src={existingVariant.image} />
      </div>

      <Button>
        Erstat {changedValue} {value} med {changedValue} {newValue}
      </Button>
      <Button>
        Behold {changedValue} {value}
      </Button>
      <Button>Behold begge {changedValue}r</Button>
    </section>
  );
};

export default SingleProductPanel;
