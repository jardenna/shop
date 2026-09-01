import { useLanguage } from '../../language/useLanguage';
import ProductPrice from '../../shop/components/productPrice/ProductPrice';

interface TotalPriceProps {
  price: number;
}

const TotalPrice = ({ price }: TotalPriceProps) => {
  const { language } = useLanguage();
  return (
    <div className="total-price">
      <span>{language.orderTotalInclVat}: </span>
      <ProductPrice price={price} />
    </div>
  );
};
export default TotalPrice;
