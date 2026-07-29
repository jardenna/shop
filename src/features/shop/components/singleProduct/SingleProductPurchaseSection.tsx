import { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { UserResponse } from '../../../../app/api/apiTypes/adminApiTypes';
import { CartItem } from '../../../../app/api/apiTypes/cartApiTypes';
import { type Size } from '../../../../app/api/apiTypes/sharedApiTypes';
import { ProductFormData } from '../../../../app/api/apiTypes/shopApiTypes';
import { useAppDispatch } from '../../../../app/hooks';
import ErrorBoundaryFallback from '../../../../components/ErrorBoundaryFallback';
import { useMessagePopup } from '../../../../components/messagePopup/useMessagePopup';
import Panel from '../../../../components/togglePanel/Panel';
import { useTogglePanel } from '../../../../components/togglePanel/useTogglePanel';
import { handleApiError } from '../../../../utils/handleApiError';
import {
  useAddToCartMutation,
  useReplaceCartMutation,
} from '../../../cart/cartApiSlice';
import { ProductQuantityMap } from '../../../cart/components/CartList';
import { useActiveCart } from '../../../cart/useActiveCart';
import { addCartItem, replaceCartItem } from '../../../cartSlice';
import { useLanguage } from '../../../language/useLanguage';
import { openMiniCart } from '../../../miniCartPopupSlice.ts';
import { cartUtils, getTotalCartQuantity } from '../../cartUtils';
import CartForm, { InitialShopValues } from './CartForm.tsx';
import SingleProductPanel, { PopupData } from './SingleProductPanel';

interface SingleProductPurchaseSectionProps {
  currentUser: UserResponse | null;
  displaySizeList: Size[];
  productData: ProductFormData;
  src: string;
  onReset: () => void;
}

const SingleProductPurchaseSection = ({
  src,
  displaySizeList,
  onReset,
  productData,
  currentUser,
}: SingleProductPurchaseSectionProps) => {
  const dispatch = useAppDispatch();
  const { language, selectedLanguage } = useLanguage();
  const { activeCartList, apiCartList, cartList } = useActiveCart({
    currentUser,
  });
  const { id, countInStock } = productData;
  const [popupData, setPopupData] = useState<PopupData | null>(null);
  const { onAddMessagePopup } = useMessagePopup();
  const { isPanelShown, onTogglePanel, panelRef, onHidePanel } =
    useTogglePanel();

  const [addCartItemApi, { isLoading: isAddCartItemLoading }] =
    useAddToCartMutation();

  const [replaceCartItemApi, { isLoading: isReplaceCartItemLoading }] =
    useReplaceCartMutation();

  const handleAddCartItem = async (cartItem: CartItem) => {
    try {
      await addCartItemApi(cartItem).unwrap();
    } catch (error) {
      handleApiError(error, onAddMessagePopup);
    }
  };

  const addToCart = async (cartItem: CartItem) => {
    if (currentUser) {
      await handleAddCartItem(cartItem);
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

  async function handleSubmitCartItem(values: InitialShopValues) {
    if (currentUser && !apiCartList) {
      return;
    }

    const cartItem = {
      id: crypto.randomUUID(),
      productId: id,
      qty: values.qty,
      size: values.size,
      color: values.color,
    };
    const cartResult = cartUtils({ cartList: activeCartList, cartItem });

    switch (cartResult.action) {
      case 'addToCartListAction':
        await addToCart(cartItem);

        break;

      case 'addToQtyAction': {
        const { existingVariant } = cartResult;

        if (currentUser) {
          await handleAddCartItem(cartItem);
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
      }

      case 'showPopupAction':
        setPopupData(cartResult);
        onTogglePanel();
        break;

      default:
        break;
    }

    dispatch(openMiniCart());
  }

  // SingleProductPanel handlers
  const handleReplaceItem = async () => {
    if (!popupData) {
      return;
    }

    const { existingVariant, cartItem } = popupData;

    if (currentUser) {
      if (!existingVariant.id) {
        return;
      }

      try {
        await replaceCartItemApi({
          cartItemId: existingVariant.id,
          cartItem,
        }).unwrap();
      } catch (error) {
        handleApiError(error, onAddMessagePopup);
      }
    } else {
      const updatedCartList = cartList.map((item) =>
        item === existingVariant ? cartItem : item,
      );

      dispatch(replaceCartItem(updatedCartList));
    }

    onHidePanel();
  };

  const quantityByProductId = activeCartList.reduce<ProductQuantityMap>(
    (result, cartItem) => {
      // eslint-disable-next-line no-param-reassign
      result[cartItem.productId] =
        (result[cartItem.productId] ?? 0) + cartItem.qty;

      return result;
    },
    {},
  );

  const currentProductQuantity = quantityByProductId[id];

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
            src={src}
            onHidePanel={onHidePanel}
            onReplaceItem={handleReplaceItem}
            onKeepBoth={addToCart}
            isAddCartItemLoading={isAddCartItemLoading}
            isReplaceCartItemLoading={isReplaceCartItemLoading}
          />
        )}
      </Panel>
      <CartForm
        handleSubmit={handleSubmitCartItem}
        currentProductQuantity={currentProductQuantity}
        productData={productData}
        displaySizeList={displaySizeList}
        isLoading={isAddCartItemLoading}
        showQuantity
      />
    </ErrorBoundary>
  );
};

export default SingleProductPurchaseSection;
