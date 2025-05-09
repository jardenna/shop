import { Category } from '../../app/api/apiTypes';
import PageHeader from '../../components/PageHeader';
import Table from '../../components/sortTable/Table';
import {
  useGetAllCategoriesQuery,
  useGetHasCategoriesScheduledQuery,
} from '../../features/categories/categoriyApiSlice';
import useLanguage from '../../features/language/useLanguage';
import { MainPath } from '../../layout/nav/enums';
import { oneDay } from '../../utils/utils';
import CategoryTableRow from './CategoryTableRow';

const tableHeaders: { key: keyof Category; label: string; name: string }[] = [
  { key: 'categoryName', label: 'name', name: 'categoryName' },
  { key: 'categoryStatus', label: 'status', name: 'categoryStatus' },
  { key: 'createdAt', label: 'created', name: 'createdAt' },
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
    <article className="page page-medium">
      <PageHeader
        heading={language.categories}
        linkText={language.createNewCategory}
        linkTo={`/admin/${MainPath.AdminCategoryCreate}`}
      />

      <div className="page-card">
        <Table
          onReset={() => refetch}
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
                  categoryName={categoryName}
                  createdAt={createdAt}
                />
              ),
            )
          }
        </Table>
      </div>
    </article>
  );
};

export default CategoryPage;
