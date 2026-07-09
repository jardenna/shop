import VisuallyHidden from '../../../../components/VisuallyHidden';
import { discountCalculation } from '../../../../utils/utils';
import { useCurrency } from '../../../currency/useCurrency';
import { useLanguage } from '../../../language/useLanguage';
import './_product-price.scss';

interface ProductPriceProps {
  discount: number;
  price: number;
  discountedPrice?: number;
  hasError?: string;
}

const ProductPrice = ({
  price,
  discount,
  hasError,
  discountedPrice,
}: ProductPriceProps) => {
  const { language } = useLanguage();

  const calDiscountedPrice = discountCalculation(price, discount);

  const { convertedPrice: displayPrice } = useCurrency(
    discountedPrice ?? calDiscountedPrice,
  );
  const { convertedPrice: regularPrice } = useCurrency(price);

  if (hasError) {
    return <span role="alert">{language.invalidDiscount}</span>;
  }

  return (
    <div className="product-price">
      {discount ? (
        <>
          <span className="discount-price">{displayPrice}</span>
          <span aria-hidden className="price-seperator">
            /
          </span>
          <VisuallyHidden>{language.originaPrice}: </VisuallyHidden>
          <span className="orginal-price">{regularPrice}</span>
        </>
      ) : (
        <span>{regularPrice}</span>
      )}
    </div>
  );
};

export default ProductPrice;
