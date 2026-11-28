import { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import Card from '../../../components/carts/Card';
import Chip from '../../../components/chips/Chip';
import { chipVariants } from '../../../components/chips/chipsUtils';
import ErrorBoundaryFallback from '../../../components/ErrorBoundaryFallback';
import LinkButton from '../../../components/LinkButton';
import MoreLink from '../../../components/MoreLink';
import Selectbox from '../../../components/selectbox/Selectbox';
import SimpleTable from '../../../components/simpleTable/SimpleTable';
import SkeletonPromoCodeTable from '../../../components/skeleton/SkeletonPromoCodeTable';
import { AdminPath } from '../../../layout/nav/navConstants';
import { useLanguage } from '../../language/useLanguage';
import {
  useGetPromoCodesQuery,
  useGetpromoCodeYearsQuery,
} from '../promoCodeApiSlice';
import PromoCodeDate from './PromoCodeDate';

interface YearOption {
  label: string;
  value: string;
}

const PromoCodeTable = () => {
  const { language } = useLanguage();

  const tableHeaderList = [
    { label: 'discountCode', id: 'discountCode' },
    { label: 'validFrom', id: 'validFrom' },
    { label: 'expiry', id: 'expiry' },
    { label: 'status', id: 'status' },
  ];

  const { data: promoCodes, isLoading, refetch } = useGetPromoCodesQuery();

  const { data: promoCodeYears } = useGetpromoCodeYearsQuery();

  const yearOptions = [
    { label: language.allYears, value: '' },
    ...(promoCodeYears ?? []).map((year) => ({
      label: year,
      value: year,
    })),
  ];

  const [selectedYear, setSelectedYear] = useState('');

  const handleSelectYear = (option: YearOption | null) => {
    setSelectedYear(option?.value ?? '');
  };

  const filteredPromoCodes = selectedYear
    ? promoCodes?.filter(
        (promoCode) =>
          new Date(promoCode.startsAt).getFullYear() === Number(selectedYear),
      )
    : promoCodes;

  return (
    <Card>
      {isLoading && <SkeletonPromoCodeTable />}
      <ErrorBoundary
        FallbackComponent={ErrorBoundaryFallback}
        onReset={() => {
          refetch();
        }}
      >
        <div className="promo-code-header">
          <div className="promo-code-select">
            <Selectbox
              id="year"
              variant="secondary"
              value={selectedYear}
              options={yearOptions}
              onChange={handleSelectYear}
              inputHasNoLabel
              name="year"
              labelText={language.filterByYear}
            />
          </div>
          <LinkButton
            linkTo={AdminPath.AdminPromoCodeCreate}
            linkText={language.createNewDiscountCode}
            className="page-header-link"
          />
        </div>
        {filteredPromoCodes && (
          <SimpleTable
            tableCaption={language.discountCodeList}
            tableHeaderList={tableHeaderList}
            tableDataList={filteredPromoCodes}
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
                  {code} <div>({percent} %)</div>
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
    </Card>
  );
};

export default PromoCodeTable;
