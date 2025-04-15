import { Link } from 'react-router';
import { SubCategoryResponse } from '../../app/api/apiTypes';
import DateDisplay from '../../components/datePicker/DateDisplay';
import PageHeader from '../../components/PageHeader';
import Table from '../../components/sortTable/Table';
import useLanguage from '../../features/language/useLanguage';
import { useGetAllSubCategoriesQuery } from '../../features/subCategories/subCategoryApiSlice';
import { MainPath } from '../../layout/nav/enums';

const SubCategoryPage = () => {
  const { language } = useLanguage();

  const { data: allSubcategories, isLoading } = useGetAllSubCategoriesQuery();

  const tableHeaders: {
    key: keyof SubCategoryResponse;
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
  }: SubCategoryResponse) => {
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
        >
          {(data) => data.map(renderRow)}
        </Table>
      </div>
    </section>
  );
};

export default SubCategoryPage;
