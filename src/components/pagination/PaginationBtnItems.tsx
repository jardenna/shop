import Button from '../Button';

type PaginationBtnItemsProps = {
  language: Record<string, string>;
  page: number;
  paginationBtnList: number[];
  onPagination: (id: number) => void;
};

const PaginationBtnItems = ({
  paginationBtnList,
  onPagination,
  page,
  language,
}: PaginationBtnItemsProps) =>
  paginationBtnList.map((paginationBtn) => (
    <li key={paginationBtn}>
      <Button
        onClick={() => {
          onPagination(paginationBtn);
        }}
        className={paginationBtn === page ? 'current' : ''}
        ariaCurrent={paginationBtn === page ? 'page' : undefined}
        ariaLabel={
          paginationBtn === page
            ? `${language.currentPage} ${paginationBtn}`
            : `${language.gotoPage} ${paginationBtn}`
        }
      >
        {paginationBtn}
      </Button>
    </li>
  ));

export default PaginationBtnItems;
