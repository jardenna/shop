import { ErrorBoundary } from 'react-error-boundary';
import ErrorBoundaryFallback from '../ErrorBoundaryFallback';
import PaginationNav, { type BasePaginationNav } from './PaginationNav';
import PaginationSelect, {
  type PaginationSelectProps,
} from './PaginationSelect';

interface PaginationProps extends BasePaginationNav {
  isError: boolean;
  itemsPerPage: number;
  pageLimit?: number;
  refetch: () => void;
}

const Pagination = ({
  page,
  totalBtns,
  onPagination,
  onSelectCount,
  totalCount,
  paginationMobileText,
  isError,
  refetch,
  itemsPerPage,
  pageLimit = 5,
}: PaginationProps & PaginationSelectProps) => (
  <ErrorBoundary
    FallbackComponent={ErrorBoundaryFallback}
    onReset={() => {
      refetch();
    }}
  >
    {!isError && (
      <section className="pagination">
        <PaginationNav
          totalBtns={totalBtns}
          page={page}
          onPagination={onPagination}
          paginationMobileText={paginationMobileText}
          pageLimit={pageLimit}
        />
        <PaginationSelect
          itemsPerPage={itemsPerPage}
          onSelectCount={onSelectCount}
          totalCount={totalCount}
        />
      </section>
    )}
  </ErrorBoundary>
);

export default Pagination;
