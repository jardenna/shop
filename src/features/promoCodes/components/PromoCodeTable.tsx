import Badge from '../../../components/badge/Badge';
import Cart from '../../../components/carts/Cart';
import SimpleTable from '../../../components/simpleTable/SimpleTable';
import { useLanguage } from '../../language/useLanguage';
import OrderHeading from '../../orders/components/orderHeading/OrderHeading';
import { useGetPromoCodesQuery } from '../promoCodeApiSlice';
import { tableHeaderList } from '../tableHeaderList';
import PromoCodeDate from './PromoCodeDate';

const PromoCodeTable = () => {
  const { language } = useLanguage();

  const { data: promoCodes } = useGetPromoCodesQuery();
  console.log(promoCodes);

  return (
    <Cart>
      <OrderHeading heading={language.orderHistory} />
      {promoCodes && (
        <SimpleTable
          tableCaption={language.orderSummaryList}
          tableHeaderList={tableHeaderList}
          tableDataList={promoCodes}
          rowKey={({ code }) => code}
          renderCells={({
            expiresAt,
            label,
            code,
            percent,
            startsAt,
            active,
          }) => (
            <>
              <td>{code}</td>
              <td>{label}</td>
              <td>{percent} %</td>

              <td>
                <PromoCodeDate date={startsAt} />
              </td>
              <td>
                <PromoCodeDate date={expiresAt} />
              </td>
              <td>
                <Badge badgeText={active ? 'Active' : 'scheduled'} />
              </td>
            </>
          )}
        />
      )}
    </Cart>
  );
};

export default PromoCodeTable;
