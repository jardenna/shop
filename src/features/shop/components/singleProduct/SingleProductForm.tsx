import { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { UserResponse } from '../../../../app/api/apiTypes/adminApiTypes';
import {
  type BaseProduct,
  type Size,
} from '../../../../app/api/apiTypes/sharedApiTypes';
import { useAppDispatch } from '../../../../app/hooks';
import ErrorBoundaryFallback from '../../../../components/ErrorBoundaryFallback';
import FieldSet from '../../../../components/fieldset/FieldSet';
import Form from '../../../../components/form/Form';
import ControlGroupList from '../../../../components/formElements/controlGroup/ControlGroupList';
import NumberStep from '../../../../components/formElements/numberStep/NumberStep';
import { useMessagePopup } from '../../../../components/messagePopup/useMessagePopup';
import Panel from '../../../../components/togglePanel/Panel';
import { useTogglePanel } from '../../../../components/togglePanel/useTogglePanel';
import { useFormValidation } from '../../../../hooks/useFormValidation';
import {
  ColorOption,
  sortColorsByTranslation,
} from '../../../../utils/colorUtils';
import { handleApiError } from '../../../../utils/handleApiError';
import { resolveIconName } from '../../../../utils/iconHelpers';
import { oneSize } from '../../../../utils/sizeUtils';
import { translateKey } from '../../../../utils/utils';
import { validateShopProduct } from '../../../../utils/validation/validateShopProduct';
import {
  useAddToCartMutation,
  useReplaceCartMutation,
} from '../../../cart/cartApiSlice';
import { useActiveCart } from '../../../cart/useActiveCart';
import { addCartItem, replaceCartItem } from '../../../cartSlice';
import { useLanguage } from '../../../language/useLanguage';
import { cartUtils, getTotalCartQuantity } from '../../cartUtils';
import SingleProductPanel, { PopupData } from './SingleProductPanel';

interface SingleProductFormProps {
  colorList: ColorOption[];
  currentUser: UserResponse | null;
  displaySizeList: Size[];
  selectedProduct: BaseProduct;
  onReset: () => void;
}

export type InitialShopValues = {
  color: string;
  qty: number;
  size: Size | '';
};

const SingleProductForm = ({
  selectedProduct,
  colorList,
  displaySizeList,
  onReset,
  currentUser,
}: SingleProductFormProps) => {
  const dispatch = useAppDispatch();
  const { language, selectedLanguage } = useLanguage();
  const { activeCartList, apiCartList, cartList } = useActiveCart();
  const { sizes, categoryName, colors, id, countInStock } = selectedProduct;
  const [popupData, setPopupData] = useState<PopupData | null>(null);
  const { onAddMessagePopup } = useMessagePopup();
  const { isPanelShown, onTogglePanel, panelRef, onHidePanel } =
    useTogglePanel();

  const [addCartItemApi, { isLoading: isAddCartItemLoading }] =
    useAddToCartMutation();

  const [replaceCartItemApi, { isLoading: isReplaceCartItemLoading }] =
    useReplaceCartMutation();

  const initialState: InitialShopValues = {
    color: colorList[0].value,
    size: sizes.length === 1 ? oneSize : '',
    qty: 1,
  };

  const { onChange, onNumberStepChange, values, onSubmit, errors } =
    useFormValidation({
      initialState,
      callback: handleSubmitCartItem,
      validate: validateShopProduct,
    });

  const cartItem = {
    productId: id,
    qty: values.qty,
    size: values.size,
    color: values.color,
  };

  const handleAddCartItem = async () => {
    try {
      await addCartItemApi(cartItem).unwrap();
    } catch (error) {
      handleApiError(error, onAddMessagePopup);
    }
  };

  const addToCart = async () => {
    if (currentUser) {
      await handleAddCartItem();
    } else {
      const totalCount = getTotalCartQuantity(
        cartList,
        cartItem.productId,
        cartItem.qty,
      );

      if (countInStock < totalCount) {
        handleApiError(language.temporarilyOutOfStock, onAddMessagePopup);
        return;
      }

      dispatch(addCartItem(cartItem));
    }
    onHidePanel();
  };

  async function handleSubmitCartItem() {
    if (currentUser && !apiCartList) {
      return;
    }

    const cartResult = cartUtils({ cartList: activeCartList, cartItem });
    const { existingVariant } = cartResult;

    switch (cartResult.action) {
      case 'addToCartListAction':
        await addToCart();

        break;

      case 'addToQtyAction':
        if (currentUser) {
          await handleAddCartItem();
        } else {
          const updatedCartList = cartList.map((item) =>
            item === existingVariant
              ? {
                  ...item,
                  qty: item.qty + values.qty,
                }
              : item,
          );
          const totalCount = getTotalCartQuantity(
            cartList,
            cartItem.productId,
            cartItem.qty,
          );

          if (countInStock < totalCount) {
            handleApiError(language.temporarilyOutOfStock, onAddMessagePopup);
            return;
          }

          dispatch(replaceCartItem(updatedCartList));
        }

        break;

      case 'showPopupAction':
        setPopupData(cartResult as PopupData);
        onTogglePanel();
        break;

      default:
        break;
    }
  }

  // SingleProductPanel handlers
  const handleReplaceItem = async () => {
    if (currentUser) {
      if (!popupData?.existingVariant.id) {
        return;
      }
      const cartItemId = popupData.existingVariant.id;

      try {
        await replaceCartItemApi({
          cartItemId,
          cartItem,
        }).unwrap();
      } catch (error) {
        handleApiError(error, onAddMessagePopup);
      }
    } else {
      const updatedCartList = cartList.map((item) =>
        item === popupData?.existingVariant ? cartItem : item,
      );
      dispatch(replaceCartItem(updatedCartList));
    }

    onHidePanel();
  };

  const sortedTranslatedColors = sortColorsByTranslation(colors, language);

  const titleSize =
    values.size === ''
      ? language.selectSize
      : `${language.selectedSize}: ${values.size}`;

  const titleColor =
    values.color === ''
      ? language.selectedColor
      : `${language.selectedColor}: ${translateKey(values.color, language)}`;

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
            src={selectedProduct.images[0]}
            onHidePanel={onHidePanel}
            onReplaceItem={handleReplaceItem}
            onKeepBoth={addToCart}
            isAddCartItemLoading={isAddCartItemLoading}
            isReplaceCartItemLoading={isReplaceCartItemLoading}
          />
        )}
      </Panel>

      <Form
        onSubmit={onSubmit}
        submitBtnLabel={language.addToBag}
        isLoading={isAddCartItemLoading}
      >
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
          <NumberStep
            onChange={onChange}
            onNumberStepChange={onNumberStepChange}
            value={values.qty}
            min={1}
            max={countInStock}
            labelText={language.quantity}
            id="qty"
            name="qty"
          />
        </FieldSet>
      </Form>
    </ErrorBoundary>
  );
};

export default SingleProductForm;
