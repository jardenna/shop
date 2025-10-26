import useLanguage from '../../features/language/useLanguage';
import PaginationNav from './PaginationNav';
import PaginationSelect, { PageCountOptions } from './PaginationSelect';

type PaginationProps = {
  ariaText: string;
  defaultValue: PageCountOptions;
  options: PageCountOptions[];
  page: number;
  selectInfo: string;
  totalBtns: number;
  isOptionDisabled?: (option: { value: string }) => boolean;
  onPagination: (id: number) => void;
  onSelectCount: (option: PageCountOptions) => void;
};

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
}: PaginationProps) => {
  const { language } = useLanguage();

  return (
    <section className="pagination" aria-label={language.productNavigation}>
      <PaginationNav
        totalBtns={totalBtns}
        page={page}
        ariaText={ariaText}
        onPagination={onPagination}
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
