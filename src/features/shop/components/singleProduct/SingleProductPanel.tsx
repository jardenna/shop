import { CartItem } from '../../../../app/api/apiTypes/sharedApiTypes';
import Button from '../../../../components/Button';
import Img from '../../../../components/Img';
import { BtnVariant } from '../../../../types/enums';
import { translateKey } from '../../../../utils/utils';
import { SelectedLanguage } from '../../../language/languageSlice';
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
  selectedLanguage: SelectedLanguage;
}

const SingleProductPanel = ({
  popupData,
  language,
  selectedLanguage,
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
      <div className="panel-content">
        <h2>
          {language.singleProductPanelHeading} {changedValue}
        </h2>
        <p>{language.singleProductPanelText}</p>
        <div className="product-panel-img">
          <Img alt="" src={existingVariant.image} />
        </div>
      </div>
      <div className="panel-action-btns">
        <Button>
          {language.replace} {changedValue} {value} {language.with}{' '}
          {changedValue} {newValue}
        </Button>
        <Button variant={BtnVariant.Secondary}>
          {language.keep} {changedValue} {value}
        </Button>
        <Button variant={BtnVariant.Secondary}>
          {language.keepBoth} {changedValue}
          {selectedLanguage === 'da' ? 'r' : undefined}
        </Button>
      </div>
    </section>
  );
};

export default SingleProductPanel;
