import { useState } from 'react';
import { Category } from '../../app/api/apiTypes'; // Assuming this is defined elsewhere
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
import useLanguage from '../../features/language/useLanguage';
import useFormValidation from '../../hooks/useFormValidation';
import { BtnVariant, IconName } from '../../types/enums';
import { ChangeInputType } from '../../types/types';
import EditField from './EditField';

const initialState = {
  categoryName: '',
};

const tableHeaders: { key: keyof Category; label: string }[] = [
  { key: 'categoryName', label: 'name' },
  { key: 'createdAt', label: 'createdAt' },
  { key: 'updatedAt', label: 'updatedAt' },
  { key: 'id', label: '' },
];

const tableBodyCells: (keyof Category)[] = [
  'categoryName',
  'createdAt',
  'updatedAt',
];

const CategoryPage = () => {
  const { language } = useLanguage();
  const [editValues, setEditValues] = useState<Partial<Category>>(initialState);
  const [editRowId, setEditRowId] = useState<string | null>(null);
  const [editingField, setEditingField] = useState<keyof Category | null>(null);
  const { onAddMessagePopup } = useMessagePopup();
  const { data: allCategories, isLoading } = useGetAllCategoriesQuery();
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const { onChange, values, onSubmit, errors } = useFormValidation({
    initialState,
    callback: handleSubmitNewCategory,
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
    } catch (error: any) {
      onAddMessagePopup({
        messagePopupType: 'error',
        message: error.data.message,
        componentType: 'notification',
      });
    }
    setEditRowId(null);
    setEditingField(null);
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

  const handleEditChange = (event: ChangeInputType) => {
    const { name, value } = event.target;
    setEditValues({ ...values, [name]: value });
  };

  const handleShowEditInput = (id: string, field: keyof Category) => {
    setEditRowId(id);
    setEditingField(field);
    const row = allCategories?.find((item) => item.id === id);
    if (row) {
      setEditValues({ ...initialState, [field]: row[field] });
    }
  };

  const handleCancelEdit = () => {
    setEditRowId(null);
    setEditingField(null);
    setEditValues(initialState);
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
          placeholder={language.name}
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
            {(data) =>
              data.map(({ id, categoryName }) => (
                <tr key={id}>
                  {tableBodyCells.map((cellText) => (
                    <td key={cellText}>
                      <EditField
                        onSave={() => {
                          handleUpdateCategory(id);
                        }}
                        showEditInput={
                          editRowId === id && editingField === cellText
                        }
                        data={allCategories}
                        onCancel={handleCancelEdit}
                        cellText={cellText}
                        id={id}
                        onEditChange={handleEditChange}
                        onEditBtnClick={() => {
                          handleShowEditInput(id, cellText);
                        }}
                        value={String(editValues[cellText] || '')}
                        labelText={String(
                          allCategories.find(
                            (category) => category.id === id,
                          )?.[cellText] || '',
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
