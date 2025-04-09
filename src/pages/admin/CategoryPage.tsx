import { useEffect } from 'react';
import { Link } from 'react-router';
import apiSlice, { TagTypeIdEnum, TagTypesEnum } from '../../app/api/apiSlice';
import { Category } from '../../app/api/apiTypes';
import { useAppDispatch } from '../../app/hooks';
import Dropdown from '../../components/dropdown/Dropdown';
import validateUpdateCategory from '../../components/formElements/validation/validateUpdateCategory';
import Icon from '../../components/icons/Icon';
import useMessagePopup from '../../components/messagePopup/useMessagePopup';
import Table from '../../components/sortTable/Table';
import TopContainer from '../../components/TopContainer';
import {
  useGetAllCategoriesQuery,
  useGetScheduledCategoriesQuery,
  useUpdateCategoryMutation,
} from '../../features/categories/categoriyApiSlice';
import DateDisplay from '../../features/categories/DateDisplay';
import useLanguage from '../../features/language/useLanguage';
import useTableEditField from '../../hooks/useTableEditField';
import { MainPath } from '../../layout/nav/enums';
import { BtnVariant, IconName } from '../../types/enums';

const tableHeaders: { key: keyof Category; label: string }[] = [
  { key: 'categoryName', label: 'categoryName' },
  { key: 'categoryStatus', label: 'categoryStatus' },
  { key: 'createdAt', label: 'createdAt' },
  { key: 'id', label: '' },
];

const CategoryPage = () => {
  const dispatch = useAppDispatch();
  const sixHours = 1000 * 60 * 60 * 6;
  const { language } = useLanguage();
  const { onAddMessagePopup } = useMessagePopup();
  const { data: allCategories, isLoading } = useGetAllCategoriesQuery();

  const { data: scheduledCategories, refetch } = useGetScheduledCategoriesQuery(
    undefined,
    { pollingInterval: sixHours },
  );

  const [updateCategory] = useUpdateCategoryMutation();

  const { editValues } = useTableEditField({
    data: allCategories?.categories || [],
    callback: handleUpdateCategory,
  });

  async function handleUpdateCategory(id: string) {
    const validation = validateUpdateCategory(editValues);
    if (validation) {
      onAddMessagePopup({
        messagePopupType: 'error',
        message: language[validation],
        componentType: 'notification',
      });
      return;
    }
    try {
      await updateCategory({
        id,
        categoryName: editValues.categoryName || '',
      }).unwrap();

      onAddMessagePopup({
        messagePopupType: 'success',
        message: language.categoryUpdated,
      });
    } catch (error: any) {
      onAddMessagePopup({
        messagePopupType: 'error',
        message: error.data.message,
        componentType: 'notification',
      });
    }
  }

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
          <span>{language[statusKey]}</span>
          {scheduledDate && (
            <Dropdown
              text={<DateDisplay date={scheduledDate} />}
              ariaControls="scheduled-date"
              triggerBtnVariant={BtnVariant.Ghost}
              ariaLabel={language.scheduledDate}
              hideFooter
            >
              <Icon
                iconName={IconName.Calendar}
                title={language.calendar}
                ariaLabel={language.scheduledDate}
              />
            </Dropdown>
          )}
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
