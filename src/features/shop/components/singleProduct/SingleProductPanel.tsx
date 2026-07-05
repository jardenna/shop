import { CartItem } from '../../../../app/api/apiTypes/cartApiTypes';
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
  onHidePanel: () => void;
  onKeepBoth: () => void;
  onReplaceItem: () => void;
}

const SingleProductPanel = ({
  popupData,
  language,
  selectedLanguage,
  onHidePanel,
  onKeepBoth,
  onReplaceItem,
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
        <div className="panel-img">
          {existingVariant.image && <Img alt="" src={existingVariant.image} />}
        </div>
      </div>
      <div className="panel-action-btns">
        <Button onClick={onReplaceItem}>
          {language.replace} {changedValue} {value} {language.with}{' '}
          {changedValue} {newValue}
        </Button>
        <Button variant={BtnVariant.Secondary} onClick={onHidePanel}>
          {language.keep} {changedValue} {value}
        </Button>
        <Button variant={BtnVariant.Secondary} onClick={onKeepBoth}>
          {language.keepBoth} {changedValue}
          {selectedLanguage === 'da' ? 'r' : undefined}
        </Button>
      </div>
    </section>
  );
};

export default SingleProductPanel;
