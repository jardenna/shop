import useCurrency from '../useCurrency';

const ProductPrice = ({ price }: { price: number }) => {
  const { convertedPrice } = useCurrency(price);

  return <p>{convertedPrice}</p>;
};

export default ProductPrice;
