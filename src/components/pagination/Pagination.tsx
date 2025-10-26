import useLanguage from '../../features/language/useLanguage';
import PaginationNav from './PaginationNav';
import PaginationSelect, { PageCountOptions } from './PaginationSelect';

export type PaginationNavProps = {
  ariaText: string;
  page: number;
  paginationMobileText: string;
  totalBtns: number;
  onPagination: (id: number) => void;
};

export type BasePaginationSelectProps = {
  defaultValue: PageCountOptions;
  options: PageCountOptions[];
  selectInfo: string;
  isOptionDisabled?: (option: { value: string }) => boolean;
  onSelectCount: (option: PageCountOptions) => void;
};

type PaginationProps = PaginationNavProps & BasePaginationSelectProps;

const Pagination = ({
  ariaText,
  page,
  totalBtns,
  onPagination,
  options,
  defaultValue,
  onSelectCount,
  isOptionDisabled,
  selectInfo,
  paginationMobileText,
}: PaginationProps) => {
  const { language } = useLanguage();

  return (
    <section className="pagination" aria-label={language.productNavigation}>
      <PaginationNav
        totalBtns={totalBtns}
        page={page}
        ariaText={ariaText}
        onPagination={onPagination}
        paginationMobileText={paginationMobileText}
      />
      <PaginationSelect
        labelText={language.selectNumber}
        legendText={language.displayOptions}
        onSelectCount={onSelectCount}
        isOptionDisabled={isOptionDisabled}
        defaultValue={defaultValue}
        options={options}
        selectInfo={selectInfo}
        ariaText={ariaText}
      />
    </section>
  );
};

export default Pagination;
