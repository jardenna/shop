import type { Language } from '../../../../shared/types';
import ProductPrice from '../../../shop/components/productPrice/ProductPrice';

interface MiniCardInfoProps {
  language: Language;
  remainingForFreeShipping: number;
}

const MiniCardInfo = ({
  remainingForFreeShipping,
  language,
}: MiniCardInfoProps) =>
  remainingForFreeShipping > 0 && (
    <div className="mini-card-info">
      <span>{language.buyForFreeShipping}</span>
      <ProductPrice price={remainingForFreeShipping} />
      <span>{language.freeShippingSuffix}</span>
    </div>
  );

export default MiniCardInfo;
