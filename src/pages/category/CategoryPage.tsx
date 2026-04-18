import Table from '../../components/sortTable/Table';
import {
  useGetAllCategoriesWithParamsQuery,
  useGetHasCategoriesScheduledQuery,
} from '../../features/categories/categoriyApiSlice';
import CategoryTableRow from '../../features/categories/components/CategoryTableRow';
import { useLanguage } from '../../features/language/useLanguage';
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

  const {
    data: allCategories,
    isLoading,
    refetch,
  } = useGetAllCategoriesWithParamsQuery(
    { sortOrder, sortField },
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
