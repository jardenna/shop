import SectionHeading from '../../../adminLayout/sectionHeading/SectionHeading';
import Badge from '../../../components/badge/Badge';
import Cart from '../../../components/carts/Cart';
import SimpleTable from '../../../components/simpleTable/SimpleTable';
import { useLanguage } from '../../language/useLanguage';
import { useGetPromoCodesQuery } from '../promoCodeApiSlice';
import { tableHeaderList } from '../tableHeaderList';
import PromoCodeDate from './PromoCodeDate';

const PromoCodeTable = () => {
  const { language } = useLanguage();

  const { data: promoCodes } = useGetPromoCodesQuery();
  console.log(promoCodes);

  return (
    <Cart>
      <SectionHeading heading={language.discountCodes} />
      {promoCodes && (
        <SimpleTable
          tableCaption={language.discountCodeList}
          tableHeaderList={tableHeaderList}
          tableDataList={promoCodes}
          rowKey={({ code }) => code}
          renderCells={({
            expiresAt,
            label,
            code,
            percent,
            startsAt,
            status,
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
                <Badge badgeText={language[status]} className={status} />
              </td>
            </>
          )}
        />
      )}
    </Cart>
  );
};

export default PromoCodeTable;
