import { useSearchParams } from 'react-router';
import LayoutElement from '../../layout/LayoutElement';
import { IconName } from '../../types/enums';
import { pageParamKey } from '../../utils/utils';
import Button from '../Button';
import IconBtn from '../IconBtn';
import './_pagination.scss';

type PaginationProps = {
  currentPage: number;
  productsPerPage: number;
  totalCount: number;
  maxPaginationBtns?: number;
};

// Creates an array of pagination button numbers
function calculateBtnsRange(
  currentPage: number,
  totalBtns: number,
  maxPaginationBtns: number,
) {
  // Determine which "button group" the current page belongs to
  const startBtn =
    Math.floor((currentPage - 1) / maxPaginationBtns) * maxPaginationBtns + 1;

  // Find the last button number in the current visible group
  const endBtn = Math.min(startBtn + maxPaginationBtns - 1, totalBtns);

  const range = Array.from(
    { length: endBtn - startBtn + 1 },
    (_, i) => startBtn + i,
  );

  return range;
}

const Pagination = ({
  currentPage,
  maxPaginationBtns = 5,
  productsPerPage,
  totalCount,
}: PaginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = searchParams.get(pageParamKey);
  const page = pageParam ? Number(pageParam) : currentPage;

  const totalBtns = Math.ceil(totalCount / productsPerPage);
  const paginationBtnList = calculateBtnsRange(
    page,
    totalBtns,
    maxPaginationBtns,
  );

  const handlePagination = (id: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(pageParamKey, id.toString());
    setSearchParams(Object.fromEntries(newParams.entries()));
  };

  const handleGotoPrevPage = () => {
    if (page > 1) {
      handlePagination(page - 1);
    }
  };

  const handleGotoNextPage = () => {
    if (page < totalBtns) {
      handlePagination(page + 1);
    }
  };

  const handleFirstPage = () => {
    handlePagination(1);
  };
  const handleGotoLastPage = () => {
    handlePagination(totalBtns);
  };

  return (
    <LayoutElement as="nav" ariaLabel="pagination">
      <ul className="pagination-btn-list">
        <li>
          <IconBtn
            iconName={IconName.ChevronsLeft}
            title=""
            ariaLabel="first"
            onClick={handleFirstPage}
            disabled={page === 1}
          />
        </li>
        <li>
          <IconBtn
            iconName={IconName.ChevronLeft}
            title=""
            ariaLabel="prev"
            onClick={handleGotoPrevPage}
            disabled={page === 1}
          />
        </li>
        {paginationBtnList.map((paginationBtn) => (
          <li key={paginationBtn}>
            <Button
              onClick={() => {
                handlePagination(paginationBtn);
              }}
              className={paginationBtn === page ? 'current' : ''}
              ariaCurrent={paginationBtn === page ? 'page' : undefined}
            >
              {paginationBtn}
            </Button>
          </li>
        ))}

        <li>
          <IconBtn
            iconName={IconName.ChevronRight}
            title=""
            ariaLabel="next"
            onClick={handleGotoNextPage}
            disabled={page === totalBtns}
          />
        </li>
        <li>
          <IconBtn
            iconName={IconName.ChevronsRight}
            title=""
            ariaLabel="last"
            onClick={handleGotoLastPage}
            disabled={page === totalBtns}
          />
        </li>
      </ul>
    </LayoutElement>
  );
};

export default Pagination;
