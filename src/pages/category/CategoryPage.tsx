import { Category } from '../../app/api/apiTypes/adminApiTypes';
import Table, { Column } from '../../components/sortTable/Table';
import {
  useGetAllCategoriesQuery,
  useGetHasCategoriesScheduledQuery,
} from '../../features/categories/categoriyApiSlice';
import CategoryTableRow from '../../features/categories/components/CategoryTableRow';
import { useLanguage } from '../../features/language/useLanguage';
import { AdminPath } from '../../layout/nav/enums';
import { oneDay, translateKey } from '../../utils/utils';
import AdminPageContainer from '../pageContainer/AdminPageContainer';

const tableHeaders: Column<Category>[] = [
  {
    key: 'categoryName',
    label: 'name',
    name: 'categoryName',
    tableFilterType: 'text',
  },
  {
    key: 'categoryStatus',
    label: 'status',
    name: 'categoryStatus',
    tableFilterType: 'text',
  },
  {
    key: 'createdAt',
    label: 'createdAt',
    name: 'createdAt',
    tableFilterType: 'date',
  },
  { key: 'id', label: '', name: '' },
];

const CategoryPage = () => {
  const { language } = useLanguage();

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
  } = useGetAllCategoriesQuery(undefined, {
    pollingInterval: shouldPollFullList ? 15000 : undefined,
    refetchOnMountOrArgChange: true,
  });

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
