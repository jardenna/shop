import VisuallyHidden from '../../../../components/VisuallyHidden';
import { discountCalculation } from '../../../../utils/utils';
import { useCurrency } from '../../../currency/useCurrency';
import { useLanguage } from '../../../language/useLanguage';
import './_product-price.scss';

type ProductPriceProps = {
  price: number;
  discountPrice?: number;
  hasError?: string;
};

const ProductPrice = ({
  price,
  discountPrice,
  hasError,
}: ProductPriceProps) => {
  const { language } = useLanguage();
  const discountedValue = discountPrice
    ? discountCalculation(price, discountPrice)
    : price;

  const { convertedPrice: regularPrice } = useCurrency(price);
  const { convertedPrice: discountedPrice } = useCurrency(discountedValue);

  if (hasError) {
    return <span role="alert">{language.invalidDiscount}</span>;
  }

  return (
    <div className="product-price">
      {discountPrice ? (
        <>
          <span className="discount-price">{discountedPrice}</span>
          <span aria-hidden className="price-seperator">
            /
          </span>
          <VisuallyHidden>{language.originaPrice}</VisuallyHidden>
          <span className="orginal-price">{regularPrice}</span>
        </>
      ) : (
        <span>{regularPrice}</span>
      )}
    </div>
  );
};

export default ProductPrice;
