import { SubCategoryResponse } from '../../app/api/apiTypes';
import MoreLink from '../../components/MoreLink';
import PageHeader from '../../components/PageHeader';
import Table from '../../components/sortTable/Table';
import CategoryBadge from '../../features/categories/CategoryBadge';
import useLanguage from '../../features/language/useLanguage';
import {
  useGetAllSubCategoriesQuery,
  useGetScheduledQuery,
} from '../../features/subCategories/subCategoryApiSlice';
import { MainPath } from '../../layout/nav/enums';
import { oneDay } from '../../utils/utils';

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

  const renderRow = ({
    id,
    scheduledDate,
    subCategoryName,
    categoryStatus,
    productCount,
    mainCategoryName,
  }: SubCategoryResponse) => {
    const statusKey = categoryStatus.toLocaleLowerCase();
    return (
      <tr key={id}>
        <td>{mainCategoryName}</td>
        <td>{subCategoryName}</td>
        <td>{productCount}</td>
        <td>
          <CategoryBadge
            badgeClassName={categoryStatus.toLowerCase()}
            badgeText={language[statusKey]}
            scheduledDate={scheduledDate || null}
          />
        </td>
        <td>
          <MoreLink
            linkText={language.viewCategory}
            linkTo={`/admin/${MainPath.AdminSubCategoryView}/${id}`}
          />
        </td>
      </tr>
    );
  };

  return (
    <section className="page page-medium">
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
          {(data) => data.map(renderRow)}
        </Table>
      </div>
    </section>
  );
};

export default SubCategoryPage;
