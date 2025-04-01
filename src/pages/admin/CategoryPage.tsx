import { Category } from '../../app/api/apiTypes';
import Dropdown from '../../components/dropdown/Dropdown';
import Form from '../../components/formElements/form/Form';
import Input from '../../components/formElements/Input';
import validateUpdateCategory from '../../components/formElements/validation/validateUpdateCategory';
import Icon from '../../components/icons/Icon';
import useMessagePopup from '../../components/messagePopup/useMessagePopup';
import Table from '../../components/sortTable/Table';
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
  useUpdateCategoryMutation,
} from '../../features/categories/categoriyApiSlice';
import EditCategoryInput from '../../features/categories/EditCategoryInput';
import useLanguage from '../../features/language/useLanguage';
import useFormValidation from '../../hooks/useFormValidation';
import useTableEditField from '../../hooks/useTableEditField';
import { BtnVariant, IconName } from '../../types/enums';

const initialState = {
  categoryName: '',
};

const tableHeaders: { key: keyof Category; label: string }[] = [
  { key: 'categoryName', label: 'categoryName' },
  { key: 'createdAt', label: 'createdAt' },
  { key: 'updatedAt', label: 'updatedAt' },
  { key: 'id', label: '' },
];

const columnKeys: (keyof Category)[] = [
  'categoryName',
  'createdAt',
  'updatedAt',
];

const CategoryPage = () => {
  const { language } = useLanguage();
  const { onAddMessagePopup } = useMessagePopup();
  const { data: allCategories, isLoading } = useGetAllCategoriesQuery();
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const { onChange, values, onSubmit, errors } = useFormValidation({
    initialState,
    callback: handleSubmitNewCategory,
  });

  const {
    editRowId,
    editingField,
    handleShowEditInput,
    handleEditChange,
    handleCancelEdit,
    editValues,
    handleSaveEdit,
  } = useTableEditField({
    data: allCategories || [],
    callback: handleUpdateCategory,
  });

  async function handleSubmitNewCategory() {
    try {
      const result = await createCategory(values).unwrap();

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

  const handleDeleteCategory = async (id: string, category: string) => {
    try {
      await deleteCategory(id).unwrap();
      onAddMessagePopup({
        messagePopupType: 'success',
        message: `${category} ${language.deleted}`,
      });
    } catch (error: any) {
      onAddMessagePopup({
        messagePopupType: 'error',
        message: error.data.message,
        componentType: 'notification',
      });
    }
  };

  return (
    <section className="category-page">
      <h1>{language.categories}</h1>
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
      <div>
        <h2>Category list</h2>
        {allCategories && (
          <Table
            data={allCategories}
            columns={tableHeaders}
            tableCaption={language.customersList}
            isLoading={isLoading}
            emptyHeaderCellText={language.deleteCategory}
          >
            {() =>
              allCategories.map(({ id, categoryName }) => (
                <tr key={id}>
                  {columnKeys.map((columnKey) => (
                    <td key={columnKey}>
                      <EditCategoryInput
                        id={columnKey}
                        onSave={() => {
                          handleSaveEdit();
                        }}
                        showEditInput={
                          editRowId === id && editingField === columnKey
                        }
                        onCancel={handleCancelEdit}
                        onEditChange={handleEditChange}
                        onEditBtnClick={() => {
                          handleShowEditInput(id, columnKey);
                        }}
                        cellContent={
                          allCategories.find((item) => item.id === id)?.[
                            columnKey
                          ] || ''
                        }
                        value={String(editValues[columnKey] || '')}
                        labelText={String(
                          allCategories.find(
                            (category) => category.id === id,
                          )?.[columnKey] || '',
                        )}
                      />
                    </td>
                  ))}
                  <td>
                    <Dropdown
                      ariaControls="delete-category"
                      text={`${language.sureToDelete} ${categoryName}?`}
                      triggerBtnVariant={BtnVariant.Ghost}
                      triggerBtnClassName="danger"
                      onPrimaryClick={() => {
                        handleDeleteCategory(id, categoryName);
                      }}
                      primaryBtnLabel={language.delete}
                      primaryBtnVariant={BtnVariant.Danger}
                      ariaLabel={language.deleteCategory}
                    >
                      <Icon
                        iconName={IconName.Trash}
                        title={language.trashCan}
                        ariaLabel={language.deleteCategory}
                      />
                    </Dropdown>
                  </td>
                </tr>
              ))
            }
          </Table>
        )}
      </div>
    </section>
  );
};

export default CategoryPage;
