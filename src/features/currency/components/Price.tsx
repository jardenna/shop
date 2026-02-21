import VisuallyHidden from '../../../components/VisuallyHidden';
import { discountCalculation } from '../../../utils/utils';
import useCurrency from '../useCurrency';

type ProductPriceProps = {
  price: number;
  className?: string;
  discountPrice?: number;
};

const Price = ({ price, discountPrice, className }: ProductPriceProps) => {
  const discountedValue = discountPrice
    ? discountCalculation(price, discountPrice)
    : price;

  const hasDiscount =
    typeof discountPrice === 'number' &&
    discountPrice > 0 &&
    discountPrice < 100;

  const { convertedPrice: regularPrice } = useCurrency(price);
  const { convertedPrice: discountedPrice } = useCurrency(discountedValue);

  if (hasDiscount) {
    return (
      <span className={className}>
        <span>{discountedPrice}</span>
        <span aria-hidden="true"> / </span>
        <VisuallyHidden>Original price</VisuallyHidden>
        <span className="text-line-through">{regularPrice}</span>
      </span>
    );
  }

  return <span className={className}>{regularPrice}</span>;
};

export default Price;
