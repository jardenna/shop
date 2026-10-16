import { useLanguage } from '../language/useLanguage';
import { useGetPromoCodesQuery } from './promoCodeApiSlice';

const tableHeaderList = [
  { label: 'discountCode' },
  { label: 'discount' },
  { label: 'validFrom' },
  { label: 'expiry' },
  { label: 'status' },
];

const PromoCodeTable = () => {
  const { language } = useLanguage();

  const { data: promoCodes } = useGetPromoCodesQuery();
  console.log(promoCodes);

  return <section>{language.noData}</section>;
};

export default PromoCodeTable;
