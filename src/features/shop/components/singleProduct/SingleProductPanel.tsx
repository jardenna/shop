import { CartItem } from '../../../../app/api/apiTypes/cartApiTypes';
import Button from '../../../../components/Button';
import Img from '../../../../components/Img';
import { BtnVariant } from '../../../../types/enums';
import { translateKey } from '../../../../utils/utils';
import { SelectedLanguage } from '../../../language/languageSlice';
import type { ChangedAttribute } from '../../cartUtils';
import './_single-product-panel.scss';

export interface PopupData {
  cartItem: CartItem;
  changedAttribute: ChangedAttribute;
  existingValue: string;
  existingVariant: CartItem;
  incomingValue: string;
}

interface SingleProductPanelProps {
  changedValue: string;
  isAddCartItemLoading: boolean;
  isReplaceCartItemLoading: boolean;
  language: Record<string, string>;
  popupData: PopupData;
  selectedLanguage: SelectedLanguage;
  src: string;
  onHidePanel: () => void;
  onKeepBoth: (cartItem: CartItem) => void;
  onReplaceItem: () => void;
}

const SingleProductPanel = ({
  popupData,
  language,
  selectedLanguage,
  onHidePanel,
  onKeepBoth,
  onReplaceItem,
  isAddCartItemLoading,
  isReplaceCartItemLoading,
  changedValue,
  src,
}: SingleProductPanelProps) => {
  const { incomingValue, existingValue } = popupData;

  const newValue = translateKey(incomingValue, language);
  const value = translateKey(existingValue, language);

  return (
    <section className="single-product-panel">
      <div className="panel-content">
        <p className="panel-content-info">{language.singleProductPanelText}</p>
        <div className="panel-img">
          <Img alt="" src={src} />
        </div>
      </div>
      <div className="panel-action-btns">
        <Button
          onClick={onReplaceItem}
          showBtnLoader={isReplaceCartItemLoading}
        >
          {language.replace} {changedValue} {value} {language.with}{' '}
          {changedValue} {newValue}
        </Button>
        <Button variant={BtnVariant.Secondary} onClick={onHidePanel}>
          {language.keep} {changedValue} {value}
        </Button>
        <Button
          variant={BtnVariant.Secondary}
          onClick={() => {
            onKeepBoth(popupData.cartItem);
          }}
          showBtnLoader={isAddCartItemLoading}
        >
          {language.keepBoth} {changedValue}
          {selectedLanguage === 'da' ? 'r' : undefined}
        </Button>
      </div>
    </section>
  );
};

export default SingleProductPanel;
