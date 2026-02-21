import VisuallyHidden from '../../../components/VisuallyHidden';
import { discountCalculation } from '../../../utils/utils';
import useLanguage from '../../language/useLanguage';
import useCurrency from '../useCurrency';
import './_product-price.scss';

type ProductPriceProps = {
  price: number;
  discountPrice?: number;
};

const Price = ({ price, discountPrice }: ProductPriceProps) => {
  const { language } = useLanguage();
  const discountedValue = discountPrice
    ? discountCalculation(price, discountPrice)
    : price;

  const hasDiscount =
    typeof discountPrice === 'number' &&
    discountPrice > 0 &&
    discountPrice < 100;

  const { convertedPrice: regularPrice } = useCurrency(price);
  const { convertedPrice: discountedPrice } = useCurrency(discountedValue);

  return (
    <div className="price">
      {hasDiscount ? (
        <>
          <span className="discount-price">{discountedPrice}</span>
          <span aria-hidden="true" className="price-seperator">
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

export default Price;
