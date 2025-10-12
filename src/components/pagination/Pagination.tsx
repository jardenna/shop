import { useSearchParams } from 'react-router';
import LayoutElement from '../../layout/LayoutElement';
import { IconName } from '../../types/enums';
import { pageParamKey } from '../../utils/utils';
import Button from '../Button';
import IconBtn from '../IconBtn';
import './_pagination.scss';

type PaginationProps = {
  headingRef: React.RefObject<HTMLElement | null>;
  productsCount: number;
  productsPerPage: number;
};

const Pagination = ({
  productsPerPage,
  productsCount,
  headingRef,
}: PaginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = searchParams.get(pageParamKey);
  const page = Number(pageParam) || 1;
  const totalBtns = Math.ceil(productsCount / productsPerPage);
  const paginationBtnList = Array.from({ length: totalBtns }, (_, i) => i + 1);

  const handlePagination = (id: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(pageParamKey, id.toString());
    setSearchParams(Object.fromEntries(newParams.entries()));

    headingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
      Page 3 of 10 loaded, showing 41–60 of 200.
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
