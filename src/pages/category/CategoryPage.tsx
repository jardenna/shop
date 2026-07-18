import { Status } from '../../app/api/apiTypes/adminApiTypes';
import Table from '../../components/sortTable/Table';
import { createInitialFilters } from '../../components/sortTable/tableFilters/tableFiltersUtils';
import {
  useGetAllCategoriesWithParamsQuery,
  useGetHasCategoriesScheduledQuery,
} from '../../features/categories/categoriyApiSlice';
import CategoryTableRow from '../../features/categories/components/CategoryTableRow';
import { useLanguage } from '../../features/language/useLanguage';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';
import { useSearchParamsState } from '../../hooks/useSearchParamsState';
import { useSortParamsState } from '../../hooks/useSortParamsState';
import { AdminPath } from '../../layout/nav/enums';
import { oneDay, translateKey } from '../../utils/utils';
import AdminPageContainer from '../pageContainer/AdminPageContainer';
import { tableHeaders } from './categoryTableHeaders';

const CategoryPage = () => {
  const { language } = useLanguage();
  const { sortOrder, onSort, sortField } = useSortParamsState({
    columns: tableHeaders,
  });

  const { data: hasScheduledData } = useGetHasCategoriesScheduledQuery(
    undefined,
    {
      pollingInterval: oneDay,
    },
  );

  const shouldPollFullList = hasScheduledData?.hasScheduled ?? false;

  const initialFilters = createInitialFilters(tableHeaders);

  const { filterParams, setFilterParams, onRemoveFilterTag } =
    useSearchParamsState(initialFilters);

  const debouncedcreatedAt = useDebouncedValue(filterParams.createdAt);

  const {
    data: allCategories,
    isLoading,
    refetch,
  } = useGetAllCategoriesWithParamsQuery(
    {
      sortOrder,
      sortField,
      categoryName: filterParams.categoryName,
      categoryStatus: filterParams.categoryStatus as Status,
      createdAt: debouncedcreatedAt,
    },
    {
      pollingInterval: shouldPollFullList ? 15000 : undefined,
      refetchOnMountOrArgChange: true,
    },
  );

  return (
    <AdminPageContainer
      heading={language.categories}
      linkText={language.createNewCategory}
      linkTo={AdminPath.AdminCategoryCreate}
      variant="medium"
      ariaLabelledby="categories-list"
    >
      <Table
        onRemoveFilterTag={onRemoveFilterTag}
        values={filterParams}
        onFilter={setFilterParams}
        initialFilters={initialFilters}
        onReset={() => refetch()}
        data={allCategories?.categories || []}
        columns={tableHeaders}
        tableCaption={language.categoryList}
        isLoading={isLoading}
        emptyHeaderCellText={language.updateCategory}
        onSort={onSort}
        sortField={sortField}
        sortOrder={sortOrder}
      >
        {(data) =>
          data.map(
            ({
              id,
              scheduledDate,
              categoryName,
              createdAt,
              categoryStatus,
            }) => (
              <CategoryTableRow
                key={id}
                id={id}
                status={categoryStatus}
                scheduledDate={scheduledDate || null}
                categoryName={translateKey(categoryName, language)}
                createdAt={createdAt}
                linkText={language.update}
              />
            ),
          )
        }
      </Table>
    </AdminPageContainer>
  );
};

export default CategoryPage;
