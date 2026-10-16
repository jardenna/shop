import Cart from '../../../components/carts/Cart';
import DateDisplay from '../../../components/datePicker/DateDisplay';
import SimpleTable from '../../../components/simpleTable/SimpleTable';
import { useLanguage } from '../../language/useLanguage';
import OrderHeading from '../../orders/components/orderHeading/OrderHeading';
import { useGetPromoCodesQuery } from '../promoCodeApiSlice';
import { tableHeaderList } from '../tableHeaderList';

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
          getRowKey={({ label, expiresAt }) => `${label}-${expiresAt}`}
          renderCells={({ expiresAt, label, code, percent, startsAt }) => (
            <>
              <td>{code}</td>
              <td>{label}</td>
              <td>{percent} %</td>

              <td>
                <DateDisplay date={startsAt} hour="2-digit" minute="2-digit" />
              </td>
              <td>
                <DateDisplay date={expiresAt} hour="2-digit" minute="2-digit" />
              </td>
            </>
          )}
        />
      )}
    </Cart>
  );
};

export default PromoCodeTable;
