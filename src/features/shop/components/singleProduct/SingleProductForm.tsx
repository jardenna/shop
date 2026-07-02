import { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import {
  type BaseProduct,
  CartItem,
  type Size,
} from '../../../../app/api/apiTypes/sharedApiTypes';
import ErrorBoundaryFallback from '../../../../components/ErrorBoundaryFallback';
import FieldSet from '../../../../components/fieldset/FieldSet';
import Form from '../../../../components/form/Form';
import ControlGroupList from '../../../../components/formElements/controlGroup/ControlGroupList';
import Panel from '../../../../components/togglePanel/Panel';
import { useTogglePanel } from '../../../../components/togglePanel/useTogglePanel';
import { useFormValidation } from '../../../../hooks/useFormValidation';
import {
  localStorageKeys,
  useLocalStorage,
} from '../../../../hooks/useLocalStorage';
import {
  ColorOption,
  sortColorsByTranslation,
} from '../../../../utils/colorUtils';
import { resolveIconName } from '../../../../utils/iconHelpers';
import { oneSize } from '../../../../utils/sizeUtils';
import { translateKey } from '../../../../utils/utils';
import { validateShopProduct } from '../../../../utils/validation/validateShopProduct';
import { useAuth } from '../../../auth/hooks/useAuth';
import { useLanguage } from '../../../language/useLanguage';
import { cartUtils } from '../../cartUtils';
import SingleProductPanel, { PopupData } from './SingleProductPanel';

type SingleProductFormProps = {
  colorList: ColorOption[];
  displaySizeList: Size[];
  selectedProduct: BaseProduct;
  onReset: () => void;
};

export type InitialShopValues = {
  color: string;
  size: string;
};

const SingleProductForm = ({
  selectedProduct,
  colorList,
  displaySizeList,
  onReset,
}: SingleProductFormProps) => {
  const { language, selectedLanguage } = useLanguage();
  const { currentUser } = useAuth();

  const { sizes, categoryName, colors, id } = selectedProduct;

  const initialState: InitialShopValues = {
    color: colorList[0].value,
    size: sizes.length === 1 ? oneSize : '',
  };

  const { onChange, values, onSubmit, errors } = useFormValidation({
    initialState,
    callback: handleAddToCart,
    validate: validateShopProduct,
  });

  const cartItem = {
    productId: id,
    qty: 1,
    size: values.size,
    color: values.color,
    image: selectedProduct.images[0],
  };

  const [cartList, setCartList] = useLocalStorage(
    localStorageKeys.cartList,
    [] as CartItem[],
  );
  const { isPanelShown, onTogglePanel, panelRef, onHidePanel } =
    useTogglePanel();

  const cartResult = cartUtils({ cartList, cartItem });
  const { existingVariant } = cartResult;

  const [popupData, setPopupData] = useState<PopupData | null>(null);

  const handleShowPanel = () => {
    setPopupData(cartResult as PopupData);

    onTogglePanel();
  };

  function handleAddToCart() {
    if (currentUser) {
      return;
    }

    switch (cartResult.action) {
      case 'addToCartList':
        setCartList([...cartList, cartItem]);
        break;
      case 'addToQty':
        if (existingVariant) {
          const updatedCartList = cartList.map((item) =>
            item === existingVariant
              ? {
                  ...item,
                  qty: item.qty + 1,
                }
              : item,
          );

          setCartList(updatedCartList);
        }
        break;

      case 'showPopup':
        handleShowPanel();
        break;
      default:
        break;
    }
  }

  const titleSize =
    values.size === ''
      ? language.selectSize
      : `${language.selectedSize}: ${values.size}`;

  const titleColor =
    values.color === ''
      ? language.selectedColor
      : `${language.selectedColor}: ${translateKey(values.color, language)}`;

  const sortedTranslatedColors = sortColorsByTranslation(colors, language);

  const handleKeepBoth = () => {
    setCartList([...cartList, cartItem]);
    onHidePanel();
  };

  const handleReplaceItem = () => {
    const updatedCartList = cartList.map((item) =>
      item === popupData?.existingVariant ? cartItem : item,
    );

    setCartList(updatedCartList);
    onHidePanel();
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorBoundaryFallback} onReset={onReset}>
      <Panel
        isPanelShown={isPanelShown}
        panelRef={panelRef}
        onHidePanel={onHidePanel}
      >
        {popupData && (
          <SingleProductPanel
            popupData={popupData}
            language={language}
            selectedLanguage={selectedLanguage}
            onHidePanel={onHidePanel}
            onReplaceItem={handleReplaceItem}
            onKeepBoth={handleKeepBoth}
          />
        )}
      </Panel>
      <Form onSubmit={onSubmit} submitBtnLabel={language.addToBag}>
        <FieldSet legendText={language.productVariants}>
          <ControlGroupList
            initialChecked={values.color}
            type="radio"
            className="color-list"
            required={values.color === ''}
            onChange={onChange}
            options={sortedTranslatedColors}
            name="color"
            variant="large"
            iconSize="5em"
            iconName={resolveIconName(categoryName)}
            groupTitle={{
              title: titleColor,
              id: 'choose-product-color',
              errorText: language[errors.color],
            }}
          />

          <ControlGroupList
            type="radio"
            initialChecked={values.size}
            required={values.size === ''}
            disabledList={sizes}
            onChange={onChange}
            options={displaySizeList}
            name="size"
            groupTitle={{
              title: titleSize,
              id: 'choose-product-size',
              errorText: language[errors.size],
            }}
          />
        </FieldSet>
      </Form>
    </ErrorBoundary>
  );
};

export default SingleProductForm;
