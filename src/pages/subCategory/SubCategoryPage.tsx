import { SubCategoryResponse } from '../../app/api/apiTypes';
import PageHeader from '../../components/PageHeader';
import Table from '../../components/sortTable/Table';
import useLanguage from '../../features/language/useLanguage';
import {
  useGetAllSubCategoriesQuery,
  useGetScheduledQuery,
} from '../../features/subCategories/subCategoryApiSlice';
import { MainPath } from '../../layout/nav/enums';
import { oneDay } from '../../utils/utils';
import SubCategoryTableRows from './SubCategoryTableRows';

const tableHeaders: {
  key: keyof SubCategoryResponse;
  label: string;
  name: string;
}[] = [
  {
    key: 'mainCategoryName',
    label: 'parentCategory',
    name: 'mainCategoryName',
  },
  {
    key: 'subCategoryName',
    label: 'name',
    name: 'subCategoryName',
  },
  {
    key: 'productCount',
    label: 'totalProducts',
    name: 'productCount',
  },
  { key: 'categoryStatus', label: 'status', name: 'categoryStatus' },
  { key: 'id', label: '', name: '' },
];

const SubCategoryPage = () => {
  const { language } = useLanguage();

  const { data: hasScheduledData } = useGetScheduledQuery(undefined, {
    pollingInterval: oneDay,
  });

  const shouldPollFullList = hasScheduledData?.hasScheduled ?? false;

  const {
    data: allSubcategories,
    isLoading,
    refetch,
  } = useGetAllSubCategoriesQuery(undefined, {
    pollingInterval: shouldPollFullList ? 15000 : undefined,
    refetchOnMountOrArgChange: true,
  });

  return (
    <article className="page page-medium">
      <PageHeader
        heading={language.subCategories}
        linkText={language.createNewCategory}
        linkTo={`/admin/${MainPath.AdminSubCategoryCreate}`}
      />
      <div className="page-card">
        <Table
          onReset={() => refetch}
          data={allSubcategories?.subCategories || []}
          columns={tableHeaders}
          tableCaption={language.subCategoryList}
          isLoading={isLoading}
          emptyHeaderCellText={language.viewCategory}
        >
          {(data) =>
            data.map(
              ({
                id,
                scheduledDate,
                subCategoryName,
                categoryStatus,
                productCount,
                mainCategoryName,
              }) => (
                <SubCategoryTableRows
                  key={id}
                  id={id}
                  status={categoryStatus}
                  scheduledDate={scheduledDate || null}
                  subCategoryName={subCategoryName}
                  mainCategoryName={mainCategoryName}
                  productCount={productCount}
                />
              ),
            )
          }
        </Table>
      </div>
    </article>
  );
};

export default SubCategoryPage;
