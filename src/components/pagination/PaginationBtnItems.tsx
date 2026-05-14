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
}: PaginationBtnItemsProps) =>
  paginationBtnList.map((paginationBtn) => {
    const isCurrentPage =
      paginationBtn.type === 'page' && paginationBtn.value === page;

    return (
      <li key={`${paginationBtn.type}-${paginationBtn.value}`}>
        <Button
          onClick={() => {
            onPagination(paginationBtn.value);
          }}
          variant={paginationBtn.btnVariant}
          disabled={paginationBtn.disabled}
          className={isCurrentPage ? 'current' : ''}
          ariaCurrent={isCurrentPage ? 'page' : undefined}
          ariaLabel={paginationBtn.ariaLabel}
        >
          {paginationBtn.label}
        </Button>
      </li>
    );
  });

export default PaginationBtnItems;
