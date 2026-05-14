import PaginationNav, { BasePaginationNav } from './PaginationNav';
import PaginationSelect, {
  type PaginationSelectProps,
} from './PaginationSelect';

type PaginationProps = BasePaginationNav & { pageLimit?: number };

const Pagination = ({
  page,
  totalBtns,
  onPagination,
  defaultValue,
  onSelectCount,
  selectInfo,
  optionList,
  totalCount,
  paginationMobileText,
  pageLimit = 5,
}: PaginationProps & PaginationSelectProps) => (
  <section className="pagination">
    <PaginationNav
      totalBtns={totalBtns}
      page={page}
      onPagination={onPagination}
      paginationMobileText={paginationMobileText}
      pageLimit={pageLimit}
    />
    <PaginationSelect
      optionList={optionList}
      onSelectCount={onSelectCount}
      defaultValue={defaultValue}
      selectInfo={selectInfo}
      totalCount={totalCount}
    />
  </section>
);

export default Pagination;
