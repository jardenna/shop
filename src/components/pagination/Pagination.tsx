import { useState } from 'react';
import { useSearchParams } from 'react-router';
import LayoutElement from '../../layout/LayoutElement';
import { IconName } from '../../types/enums';
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
  const page = searchParams.get('page') ?? currentPage;

  const totalBtns = Math.ceil(totalCount / productsPerPage);

  const paginationBtnList = calculateBtnsRange(
    Number(page),
    totalBtns,
    maxPaginationBtns,
  );
  const [pageNumber, setPageNumber] = useState(Number(page));

  const handleGotoPrevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const handleGotoNextPage = () => {
    if (pageNumber < totalBtns) {
      setPageNumber(pageNumber + 1);
    }
  };

  const handleFirstPage = () => {
    setPageNumber(1);
  };

  const handleGotoLastPage = () => {
    setPageNumber(totalBtns);
  };

  const handlePagination = (id: number) => {
    setPageNumber(id);
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('page', id.toString());
    setSearchParams(Object.fromEntries(newParams.entries()));
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
            disabled={pageNumber === 1}
          />
        </li>
        <li>
          <IconBtn
            iconName={IconName.ChevronLeft}
            title=""
            ariaLabel="prev"
            onClick={handleGotoPrevPage}
            disabled={pageNumber === 1}
          />
        </li>
        {paginationBtnList.map((paginationBtn) => (
          <li key={paginationBtn}>
            <Button
              onClick={() => {
                handlePagination(paginationBtn);
              }}
              className={paginationBtn === pageNumber ? 'current' : ''}
              ariaCurrent={paginationBtn === pageNumber ? 'page' : undefined}
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
            disabled={pageNumber === totalBtns}
          />
        </li>
        <li>
          <IconBtn
            iconName={IconName.ChevronsRight}
            title=""
            ariaLabel="last"
            onClick={handleGotoLastPage}
            disabled={pageNumber === totalBtns}
          />
        </li>
      </ul>
    </LayoutElement>
  );
};

export default Pagination;
