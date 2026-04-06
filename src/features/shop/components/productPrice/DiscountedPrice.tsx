import VisuallyHidden from '../../../../components/VisuallyHidden';
import { useCurrency } from '../../../currency/useCurrency';
import { useLanguage } from '../../../language/useLanguage';
import './_product-price.scss';

type DiscountedPriceProps = {
  discount: number;
  discountedPrice: number;
  price: number;
  hasError?: string;
};

const DiscountedPrice = ({
  price,
  discountedPrice,
  discount,
  hasError,
}: DiscountedPriceProps) => {
  const { language } = useLanguage();

  const { convertedPrice: displayPrice } = useCurrency(discountedPrice);
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

export default DiscountedPrice;
