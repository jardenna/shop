import { Link } from 'react-router';
import { SubCategory } from '../../app/api/apiTypes';
import Table from '../../components/sortTable/Table';
import TopContainer from '../../components/TopContainer';
import DateDisplay from '../../features/categories/DateDisplay';
import useLanguage from '../../features/language/useLanguage';
import { useGetAllSubCategoriesQuery } from '../../features/subCategories/subCategoryApiSlice';
import { MainPath } from '../../layout/nav/enums';

const SubCategoryPage = () => {
  const { language } = useLanguage();

  const { data: allSubcategories, isLoading } = useGetAllSubCategoriesQuery();

  const tableHeaders: {
    key: keyof SubCategory;
    label: string;
    name: string;
  }[] = [
    {
      key: 'subCategoryName',
      label: 'name',
      name: 'subCategoryName',
    },
    { key: 'categoryStatus', label: 'status', name: 'categoryStatus' },
    { key: 'createdAt', label: 'createdAt', name: 'createdAt' },
    { key: 'id', label: '', name: '' },
  ];

  const renderRow = ({
    id,
    scheduledDate,
    subCategoryName,
    createdAt,
    categoryStatus,
  }: SubCategory) => {
    const statusKey = categoryStatus.toLocaleLowerCase();
    return (
      <tr key={id}>
        <td>{subCategoryName}</td>
        <td>
          <span>{language[statusKey]}</span>
          {scheduledDate && (
            <span>
              <DateDisplay date={scheduledDate} />
            </span>
          )}
        </td>
        <td>
          <DateDisplay date={createdAt} />
        </td>
        <td>
          <Link to={`/admin/${MainPath.AdminCategoryUpdate}/${id}`}>
            {language.editCategory}
          </Link>
        </td>
      </tr>
    );
  };

  return (
    <section className="page">
      <TopContainer
        heading={language.subCategories}
        linkText={language.addSubCategory}
        linkTo={`/admin/${MainPath.AdminSubCategoryCreate}`}
      />
      <div className="page-card">
        <Table
          data={allSubcategories?.subCategories || []}
          columns={tableHeaders}
          tableCaption={language.subCategoryList}
          isLoading={isLoading}
        >
          {(data) => data.map(renderRow)}
        </Table>
      </div>
    </section>
  );
};

export default SubCategoryPage;
