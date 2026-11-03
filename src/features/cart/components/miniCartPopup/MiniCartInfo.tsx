import { Language } from '../../../../types/types';
import ProductPrice from '../../../shop/components/productPrice/ProductPrice';

interface MiniCartInfoProps {
  language: Language;
  remainingForFreeShipping: number;
}

const MiniCartInfo = ({
  remainingForFreeShipping,
  language,
}: MiniCartInfoProps) =>
  remainingForFreeShipping > 0 && (
    <div className="mini-cart-info">
      <span>{language.buyForFreeShipping}</span>
      <ProductPrice price={remainingForFreeShipping} />
      <span>{language.freeShippingSuffix}</span>
    </div>
  );

export default MiniCartInfo;
