import { Link } from 'react-router';
import { SubCategoryResponse } from '../../app/api/apiTypes';
import PageHeader from '../../components/PageHeader';
import Table from '../../components/sortTable/Table';
import CategoryBadge from '../../features/categories/CategoryBadge';
import useLanguage from '../../features/language/useLanguage';
import {
  useGetAllSubCategoriesQuery,
  useGetScheduledQuery,
} from '../../features/subCategories/subCategoryApiSlice';
import { MainPath } from '../../layout/nav/enums';

const SubCategoryPage = () => {
  const { language } = useLanguage();

  const { data: hasScheduledData } = useGetScheduledQuery(undefined, {
    pollingInterval: 30000,
  });

  const shouldPollFullList = hasScheduledData?.hasScheduled ?? false;

  const { data: allSubcategories, isLoading } = useGetAllSubCategoriesQuery(
    undefined,
    {
      pollingInterval: shouldPollFullList ? 15000 : undefined,
      refetchOnMountOrArgChange: true,
    },
  );

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
          <Link to={`/admin/${MainPath.AdminSubCategoryView}/${id}`}>
            {language.editCategory}
          </Link>
        </td>
      </tr>
    );
  };

  return (
    <section className="page">
      <PageHeader
        heading={language.subCategories}
        linkText={language.createNewSubCategory}
        linkTo={`/admin/${MainPath.AdminSubCategoryCreate}`}
      />
      <div className="page-card">
        <Table
          data={allSubcategories?.subCategories || []}
          columns={tableHeaders}
          tableCaption={language.subCategoryList}
          isLoading={isLoading}
          emptyHeaderCellText={language.updateSubCategory}
        >
          {(data) => data.map(renderRow)}
        </Table>
      </div>
    </section>
  );
};

export default SubCategoryPage;
