import { useEffect } from 'react';
import { Link } from 'react-router';
import apiSlice, { TagTypeIdEnum, TagTypesEnum } from '../../app/api/apiSlice';
import { Category } from '../../app/api/apiTypes';
import { useAppDispatch } from '../../app/hooks';
import Icon from '../../components/icons/Icon';
import Table from '../../components/sortTable/Table';
import Tooltip from '../../components/tooltip/Tooltip';
import TopContainer from '../../components/TopContainer';
import {
  useGetAllCategoriesQuery,
  useGetScheduledCategoriesQuery,
} from '../../features/categories/categoriyApiSlice';
import DateDisplay from '../../features/categories/DateDisplay';
import useLanguage from '../../features/language/useLanguage';
import { MainPath } from '../../layout/nav/enums';
import { BtnVariant, IconName } from '../../types/enums';

const tableHeaders: { key: keyof Category; label: string; name: string }[] = [
  { key: 'categoryName', label: 'name', name: 'categoryName' },
  { key: 'categoryStatus', label: 'status', name: 'categoryStatus' },
  { key: 'createdAt', label: 'createdAt', name: 'createdAt' },
  { key: 'id', label: '', name: '' },
];

const CategoryPage = () => {
  const dispatch = useAppDispatch();
  const sixHours = 1000 * 60 * 60 * 6;
  const { language } = useLanguage();
  const { data: allCategories, isLoading } = useGetAllCategoriesQuery();

  const { data: scheduledCategories, refetch } = useGetScheduledCategoriesQuery(
    undefined,
    { pollingInterval: sixHours },
  );

  // Monitor for emptying scheduled list
  useEffect(() => {
    if (!isLoading && scheduledCategories?.categories.length === 0) {
      // Trigger refetch of full category list
      dispatch(
        apiSlice.util.invalidateTags([
          { type: TagTypesEnum.Categories, id: TagTypeIdEnum.Scheduled },
        ]),
      );
    }
    refetch();
  }, [scheduledCategories, isLoading, dispatch, refetch]);

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
          <div className={`badge ${categoryStatus.toLowerCase()}`}>
            <span>{language[statusKey]}</span>
            {scheduledDate && (
              <Tooltip
                text={<DateDisplay date={scheduledDate} />}
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
          <Link to={`/admin/${MainPath.AdminCategoryUpdate}/${id}`}>
            {language.update}
          </Link>
        </td>
      </tr>
    );
  };

  return (
    <section className="page">
      <TopContainer
        heading={language.categories}
        linkText={language.addCategory}
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
