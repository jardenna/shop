import { Link } from 'react-router';
import { Category } from '../../app/api/apiTypes';
import DateDisplay from '../../components/datePicker/DateDisplay';
import PageHeader from '../../components/PageHeader';
import Table from '../../components/sortTable/Table';
import { useGetAllCategoriesQuery } from '../../features/categories/categoriyApiSlice';
import CategoryBadge from '../../features/categories/CategoryBadge';
import useLanguage from '../../features/language/useLanguage';
import { useGetScheduledQuery } from '../../features/subCategories/subCategoryApiSlice';
import { MainPath } from '../../layout/nav/enums';

const tableHeaders: { key: keyof Category; label: string; name: string }[] = [
  { key: 'categoryName', label: 'name', name: 'categoryName' },
  { key: 'categoryStatus', label: 'status', name: 'categoryStatus' },
  { key: 'createdAt', label: 'created', name: 'createdAt' },
  { key: 'id', label: '', name: '' },
];

const CategoryPage = () => {
  const { language } = useLanguage();
  // const sixHours = 1000 * 60 * 60 * 6;

  const { data: hasScheduledData } = useGetScheduledQuery(undefined, {
    pollingInterval: 15000, // check every 6 hours
  });

  const shouldPollFullList = hasScheduledData?.hasScheduled ?? false;

  const { data: allCategories, isLoading } = useGetAllCategoriesQuery(
    undefined,
    {
      pollingInterval: shouldPollFullList ? 15000 : undefined,
      refetchOnMountOrArgChange: true,
    },
  );

  const renderRow = ({
    id,
    scheduledDate,
    categoryName,
    createdAt,
    categoryStatus,
  }: Category) => {
    const statusKey = categoryStatus.toLocaleLowerCase();
    return (
      <tr key={id}>
        <td>{categoryName}</td>
        <td>
          <CategoryBadge
            badgeClassName={categoryStatus.toLowerCase()}
            badgeText={language[statusKey]}
            scheduledDate={scheduledDate || null}
          />
        </td>
        <td>
          <DateDisplay date={createdAt} />
        </td>
        <td>
          <Link to={`/admin/${MainPath.AdminCategoryUpdate}/${id}`}>
            {language.update}
          </Link>
        </td>
      </tr>
    );
  };

  return (
    <section className="page">
      <PageHeader
        heading={language.categories}
        linkText={language.createNewCategory}
        linkTo={`/admin/${MainPath.AdminCategoryCreate}`}
      />

      <div className="page-card">
        <Table
          data={allCategories?.categories || []}
          columns={tableHeaders}
          tableCaption={language.categoryList}
          isLoading={isLoading}
        >
          {(data) => data.map(renderRow)}
        </Table>
      </div>
    </section>
  );
};

export default CategoryPage;
