import { Link } from 'react-router';
import { SubCategoryResponse } from '../../app/api/apiTypes';
import DateDisplay from '../../components/datePicker/DateDisplay';
import Icon from '../../components/icons/Icon';
import PageHeader from '../../components/PageHeader';
import Table from '../../components/sortTable/Table';
import Tooltip from '../../components/tooltip/Tooltip';
import useLanguage from '../../features/language/useLanguage';
import {
  useGetAllSubCategoriesQuery,
  useGetScheduledQuery,
} from '../../features/subCategories/subCategoryApiSlice';
import { MainPath } from '../../layout/nav/enums';
import { BtnVariant, IconName } from '../../types/enums';

const SubCategoryPage = () => {
  const { language } = useLanguage();

  const { data: hasScheduledData } = useGetScheduledQuery(undefined, {
    pollingInterval: 30000, // check every 6 hours
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
          <div className={`badge ${categoryStatus.toLowerCase()}`}>
            <span>{language[statusKey]}</span>
            {scheduledDate && (
              <Tooltip
                text={
                  <DateDisplay
                    date={scheduledDate}
                    hour="2-digit"
                    minute="2-digit"
                  />
                }
                ariaControls="scheduled-date"
                triggerBtnVariant={BtnVariant.Ghost}
                ariaLabel={language.scheduledDate}
              >
                <Icon
                  iconName={IconName.Calendar}
                  title={language.calendar}
                  ariaLabel={language.scheduledDate}
                />
              </Tooltip>
            )}
          </div>
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
