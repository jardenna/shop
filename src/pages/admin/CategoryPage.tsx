import { Link } from 'react-router';
import { Category } from '../../app/api/apiTypes';
import Form from '../../components/formElements/form/Form';
import Input from '../../components/formElements/Input';
import validateUpdateCategory from '../../components/formElements/validation/validateUpdateCategory';
import useMessagePopup from '../../components/messagePopup/useMessagePopup';
import Table from '../../components/sortTable/Table';
import {
  useCreateCategoryMutation,
  useGetAllCategoriesQuery,
  useUpdateCategoryMutation,
} from '../../features/categories/categoriyApiSlice';
import DateDisplay from '../../features/categories/DateDisplay';
import useLanguage from '../../features/language/useLanguage';
import useFormValidation from '../../hooks/useFormValidation';
import useTableEditField from '../../hooks/useTableEditField';
import { MainPath } from '../../layout/nav/enums';

const initialState = {
  categoryName: '',
};

const tableHeaders: { key: keyof Category; label: string }[] = [
  { key: 'categoryName', label: 'categoryName' },
  { key: 'categoryStatus', label: 'categoryStatus' },
  { key: 'createdAt', label: 'createdAt' },
  { key: 'id', label: '' },
];

const CategoryPage = () => {
  const TwentyFourHours = 1000 * 60 * 60 * 24;
  const { language } = useLanguage();
  const { onAddMessagePopup } = useMessagePopup();
  const { data: allCategories, isLoading } = useGetAllCategoriesQuery(
    undefined,
    { pollingInterval: TwentyFourHours },
  );
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const { onChange, values, onSubmit, errors, onClearAllValues } =
    useFormValidation({
      initialState,
      callback: handleSubmitNewCategory,
    });

  const { editValues } = useTableEditField({
    data: allCategories?.categories || [],
    callback: handleUpdateCategory,
  });

  async function handleSubmitNewCategory() {
    try {
      const result = await createCategory(values).unwrap();
      onClearAllValues();

      onAddMessagePopup({
        messagePopupType: !result.success ? 'error' : 'success',
        message: result.message,
        componentType: !result.success ? 'notification' : undefined,
      });
    } catch (error: any) {
      onAddMessagePopup({
        messagePopupType: 'error',
        message: error.data.message,
        componentType: 'notification',
      });
    }
  }

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

  return (
    <section className="category-page">
      <h1>{language.categories}</h1>
      <div className="page-card">
        <Form
          onSubmit={onSubmit}
          submitBtnLabel={language.save}
          className="submit-category"
        >
          <Input
            onChange={onChange}
            value={values.categoryName || ''}
            id="categoryName"
            name="categoryName"
            labelText={language.addCategory}
            placeholder={language.categoryName}
            errorText={errors.categoryName}
          />
        </Form>
      </div>
      <div className="page-card">
        <Table
          data={allCategories?.categories || []}
          columns={tableHeaders}
          tableCaption={language.customersList}
          isLoading={isLoading}
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
                <tr key={id}>
                  <td>{categoryName}</td>
                  <td>
                    <span>{language[categoryStatus.toLocaleLowerCase()]} </span>
                    <span>
                      {scheduledDate && <DateDisplay date={scheduledDate} />}
                    </span>
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
              ),
            )
          }
        </Table>
      </div>
    </section>
  );
};

export default CategoryPage;
