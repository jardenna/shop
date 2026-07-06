import { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { UserResponse } from '../../../../app/api/apiTypes/adminApiTypes';
import {
  type BaseProduct,
  type Size,
} from '../../../../app/api/apiTypes/sharedApiTypes';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import ErrorBoundaryFallback from '../../../../components/ErrorBoundaryFallback';
import FieldSet from '../../../../components/fieldset/FieldSet';
import Form from '../../../../components/form/Form';
import ControlGroupList from '../../../../components/formElements/controlGroup/ControlGroupList';
import NumberStep from '../../../../components/formElements/numberStep/NumberStep';
import Panel from '../../../../components/togglePanel/Panel';
import { useTogglePanel } from '../../../../components/togglePanel/useTogglePanel';
import { useFormValidation } from '../../../../hooks/useFormValidation';
import {
  ColorOption,
  sortColorsByTranslation,
} from '../../../../utils/colorUtils';
import { resolveIconName } from '../../../../utils/iconHelpers';
import { oneSize } from '../../../../utils/sizeUtils';
import { translateKey } from '../../../../utils/utils';
import { validateShopProduct } from '../../../../utils/validation/validateShopProduct';
import {
  useAddToCartMutation,
  useGetCartsQuery,
  useReplaceCartMutation,
} from '../../../cart/cartApiSlice';
import {
  addCartItem,
  replaceCartItem,
  selectCartList,
} from '../../../cartSlice';
import { useLanguage } from '../../../language/useLanguage';
import { cartUtils } from '../../cartUtils';
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
  size: string;
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
  const { sizes, categoryName, colors, id } = selectedProduct;
  const [popupData, setPopupData] = useState<PopupData | null>(null);
  const cartList = useAppSelector(selectCartList);
  const { isPanelShown, onTogglePanel, panelRef, onHidePanel } =
    useTogglePanel();

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
    image: selectedProduct.images[0],
  };

  const { data: userCartList } = useGetCartsQuery();
  const [addCartItemApi] = useAddToCartMutation();
  const [replaceCartItemApi] = useReplaceCartMutation();

  const handleAddToCart = () => {
    if (currentUser) {
      addCartItemApi(cartItem);
    } else {
      dispatch(addCartItem(cartItem));
    }
  };

  function handleSubmitCartItem() {
    if (currentUser && !userCartList) {
      return;
    }

    const activeCartList =
      currentUser && userCartList ? userCartList.cartItems : cartList;

    const cartResult = cartUtils({ cartList: activeCartList, cartItem });
    const { existingVariant } = cartResult;

    const updatedCartList = cartList.map((item) =>
      item === existingVariant
        ? {
            ...item,
            qty: item.qty + values.qty,
          }
        : item,
    );

    switch (cartResult.action) {
      case 'addToCartListAction':
        handleAddToCart();

        break;

      case 'addToQtyAction':
        if (currentUser) {
          addCartItemApi(cartItem);
        } else {
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
  const handleKeepBoth = () => {
    handleAddToCart();
    onHidePanel();
  };

  const handleReplaceItem = () => {
    if (currentUser && popupData) {
      const cartItemId = popupData.existingVariant.id ?? '';
      replaceCartItemApi({ cartItemId, cartItem: values });
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
          <NumberStep
            onChange={onChange}
            onNumberStepChange={onNumberStepChange}
            value={values.qty}
            min={1}
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
