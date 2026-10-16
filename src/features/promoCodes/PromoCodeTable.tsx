import { useLanguage } from '../language/useLanguage';
import { useGetPromoCodesQuery } from './promoCodeApiSlice';

// discountCode discount validFrom expiry status

const PromoCodeTable = () => {
  const { language } = useLanguage();

  const { data: promoCodes } = useGetPromoCodesQuery();
  console.log(promoCodes);

  return <section>{language.noData}</section>;
};

export default PromoCodeTable;
