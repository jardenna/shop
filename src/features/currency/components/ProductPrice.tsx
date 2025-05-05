import useCurrency from '../useCurrency';

const ProductPrice = ({ price }: { price: number }) => {
  const { convertedPrice } = useCurrency(price);

  return <span>{convertedPrice}</span>;
};

export default ProductPrice;
