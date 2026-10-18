import { ErrorBoundary } from 'react-error-boundary';
import SectionHeading from '../../../adminLayout/sectionHeading/SectionHeading';
import Badge from '../../../components/badge/Badge';
import Cart from '../../../components/carts/Cart';
import ErrorBoundaryFallback from '../../../components/ErrorBoundaryFallback';
import MoreLink from '../../../components/MoreLink';
import SimpleTable from '../../../components/simpleTable/SimpleTable';
import Skeleton from '../../../components/skeleton/Skeleton';
import { AdminPath } from '../../../layout/nav/enums';
import { useLanguage } from '../../language/useLanguage';
import { useGetPromoCodesQuery } from '../promoCodeApiSlice';
import { tableHeaderList } from '../tableHeaderList';
import PromoCodeDate from './PromoCodeDate';

const PromoCodeTable = () => {
  const { language } = useLanguage();

  const { data: promoCodes, isLoading, refetch } = useGetPromoCodesQuery();

  return (
    <Cart>
      <SectionHeading heading={language.discountCodes} />

      {isLoading && <Skeleton />}
      <ErrorBoundary
        FallbackComponent={ErrorBoundaryFallback}
        onReset={() => {
          refetch();
        }}
      >
        {promoCodes && (
          <SimpleTable
            tableCaption={language.discountCodeList}
            tableHeaderList={tableHeaderList}
            tableDataList={promoCodes}
            rowKey={({ code }) => code}
            emptyHeaderCellText={language.updatePromoCode}
            renderCells={({
              expiresAt,
              code,
              percent,
              startsAt,
              status,
              id,
            }) => (
              <>
                <td>
                  {code} <div>{percent} %</div>
                </td>

                <td>
                  <PromoCodeDate date={startsAt} />
                </td>
                <td>
                  <PromoCodeDate date={expiresAt} />
                </td>
                <td>
                  <Badge badgeText={language[status]} className={status} />
                </td>
                <td>
                  <MoreLink
                    linkText={language.update}
                    linkTo={`${AdminPath.AdminPromoCodeUpdate}/${id}`}
                  />
                </td>
              </>
            )}
          />
        )}
      </ErrorBoundary>
    </Cart>
  );
};

export default PromoCodeTable;
