import Button from '../Button';
import type { PaginationItem } from './createPaginationItems';

type PaginationBtnItemsProps = {
  language: Record<string, string>;
  page: number;
  paginationBtnList: PaginationItem[];
  onPagination: (id: number) => void;
};

const PaginationBtnItems = ({
  paginationBtnList,
  onPagination,
  page,
  language,
}: PaginationBtnItemsProps) =>
  paginationBtnList.map((paginationBtn) => {
    const isCurrentPage = paginationBtn.value === page;

    return (
      <li key={paginationBtn.value}>
        <Button
          onClick={() => {
            onPagination(paginationBtn.value);
          }}
          className={isCurrentPage ? 'current' : ''}
          ariaCurrent={isCurrentPage ? 'page' : undefined}
          ariaLabel={
            isCurrentPage
              ? `${language.currentPage} ${paginationBtn.value}`
              : `${language.gotoPage} ${paginationBtn.value}`
          }
        >
          {paginationBtn.label}
        </Button>
      </li>
    );
  });

export default PaginationBtnItems;
