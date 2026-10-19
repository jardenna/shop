import { ErrorBoundary } from 'react-error-boundary';
import SectionHeading from '../../../adminLayout/sectionHeading/SectionHeading';
import Cart from '../../../components/carts/Cart';
import Chip from '../../../components/chips/Chip';
import { chipVariants } from '../../../components/chips/chipsUtils';
import ErrorBoundaryFallback from '../../../components/ErrorBoundaryFallback';
import LinkButton from '../../../components/LinkButton';
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
      <header className="promo-code-header">
        <SectionHeading heading={language.discountCodes} />
        <LinkButton
          linkTo={AdminPath.AdminPromoCodeCreate}
          linkText={language.createNewDiscountCode}
          className="page-header-link"
        />
      </header>

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
                  <Chip
                    chipText={language[status]}
                    variant={chipVariants[status]}
                  />
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
