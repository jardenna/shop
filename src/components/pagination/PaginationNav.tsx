import useLanguage from '../../features/language/useLanguage';
import useMediaQuery from '../../hooks/useMediaQuery';
import LayoutElement from '../../layout/LayoutElement';
import { IconName } from '../../types/enums';
import IconBtn from '../IconBtn';
import './_pagination.scss';
import PaginationBtnItems from './PaginationBtnItems';

export type PaginationNavProps = {
  page: number;
  paginationMobileText: string;
  totalBtns: number;
  onPagination: (id: number) => void;
};

const PaginationNav = ({
  paginationMobileText,
  page,
  totalBtns,
  onPagination,
}: PaginationNavProps) => {
  const { language } = useLanguage();
  const { isMobileSize } = useMediaQuery();
  const paginationBtnList = Array.from({ length: totalBtns }, (_, i) => i + 1);

  const handleGotoPrevPage = () => {
    if (page > 1) {
      onPagination(page - 1);
    }
  };

  const handleGotoNextPage = () => {
    if (page < totalBtns) {
      onPagination(page + 1);
    }
  };

  return (
    <LayoutElement as="nav" ariaLabel={language.pagination}>
      <ul className="pagination-btn-list">
        {!isMobileSize && (
          <li>
            <IconBtn
              iconName={IconName.ChevronsLeft}
              ariaLabel={language.gotoFirstPage}
              onClick={() => {
                onPagination(1);
              }}
              disabled={page === 1}
            />
          </li>
        )}
        <li>
          <IconBtn
            iconName={IconName.ChevronLeft}
            ariaLabel={language.gotoPrevPage}
            onClick={handleGotoPrevPage}
            disabled={page === 1}
          />
        </li>
        {isMobileSize ? (
          <div>{paginationMobileText}</div>
        ) : (
          <PaginationBtnItems
            language={language}
            paginationBtnList={paginationBtnList}
            page={page}
            onPagination={onPagination}
          />
        )}
        <li>
          <IconBtn
            iconName={IconName.ChevronRight}
            ariaLabel={language.gotoNextPage}
            onClick={handleGotoNextPage}
            disabled={page === totalBtns}
          />
        </li>
        {!isMobileSize && (
          <li>
            <IconBtn
              iconName={IconName.ChevronsRight}
              ariaLabel={language.gotoLastPage}
              onClick={() => {
                onPagination(totalBtns);
              }}
              disabled={page === totalBtns}
            />
          </li>
        )}
      </ul>
    </LayoutElement>
  );
};

export default PaginationNav;
