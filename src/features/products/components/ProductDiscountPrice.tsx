import useCurrency from '../../currency/useCurrency';

type ProductDiscountPriceProps = {
  discount: number | null;
  price: number;
};

const ProductDiscountPrice = ({
  price,
  discount,
}: ProductDiscountPriceProps) => {
  const { convertedPrice } = useCurrency(price);

  return (
    <span className="product-discont-price">
      {!!discount && (
        <>
          <span>{convertedPrice}</span>
          <span> / </span>
        </>
      )}
      <span className={discount ? 'text-line-through' : 'product-price'}>
        {convertedPrice}
      </span>
    </span>
  );
};

export default ProductDiscountPrice;
