import { useState } from 'react';
import { Category } from '../../app/api/apiTypes'; // Assuming this is defined elsewhere
import Form from '../../components/formElements/form/Form';
import Input from '../../components/formElements/Input';
import IconBtn from '../../components/IconBtn';
import IconContent from '../../components/IconContent';
import useMessagePopup from '../../components/messagePopup/useMessagePopup';
import Table from '../../components/sortTable/Table';
import {
  useCreateCategoryMutation,
  useGetAllCategoriesQuery,
} from '../../features/categories/categoriyApiSlice';
import useLanguage from '../../features/language/useLanguage';
import useFormValidation from '../../hooks/useFormValidation';
import { IconName } from '../../types/enums';
import { ChangeInputType } from '../../types/types';

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
  const { onAddMessagePopup } = useMessagePopup();
  const { data: allCategories, isLoading } = useGetAllCategoriesQuery();
  const [createCategory] = useCreateCategoryMutation();
  // const [updateCategory] = useUpdateCategoryMutation();

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
  const [editValues, setEditValues] = useState<Partial<Category>>({});
  const [editRowId, setEditRowId] = useState<string | null>(null);

  const [editingField, setEditingField] = useState<keyof Category | null>(null);

  const handleEditChange = (event: ChangeInputType) => {
    const { name, value } = event.target;

    setEditValues({ ...values, [name]: value });
  };

  // async function handleUpdateCategory(id: string) {
  //   // console.log(id, editValues);
  //   try {
  //     await updateCategory({
  //       id,
  //       name: {
  //         name: editValues.name,
  //       },
  //     }).unwrap();
  //   } catch (error: any) {
  //     onAddMessagePopup({
  //       messagePopupType: 'error',
  //       message: error.data.message,
  //       componentType: 'notification',
  //     });
  //   }
  //   setEditRowId(null);
  //   setEditingField(null);
  // }

  const handleEdit = (id: string, field: keyof Category) => {
    setEditRowId(id);
    setEditingField(field);
    const row = allCategories?.find((item) => item.id === id);
    if (row) {
      setEditValues({ [field]: row[field] });
    }
  };
  // const handleCancel = () => {
  //   setEditRowId(null);
  //   setEditingField(null);
  //   setEditValues({});
  // };

  console.log(editingField);

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
            emptyHeaderCellText={language.deleteUser}
          >
            {(data) =>
              data.map(({ id }) => (
                <tr key={id}>
                  {tableBodyCells.map((td) => (
                    <td key={td}>
                      {editRowId === id && editingField === td ? (
                        <Input
                          id={td}
                          name={td}
                          onChange={handleEditChange}
                          value={String(editValues[td] || '')}
                          labelText="labelText"
                          inputHasNoLabel
                        />
                      ) : (
                        <div>
                          {String(
                            allCategories.find((user) => user.id === id)?.[
                              td
                            ] || '',
                          )}
                          {td === 'categoryName' && (
                            <IconBtn
                              onClick={() => {
                                handleEdit(id, td);
                              }}
                              iconName={IconName.Edit}
                              title={language.pensil}
                              ariaLabel={language.editUser}
                            />
                          )}
                        </div>
                      )}
                    </td>
                  ))}
                  <td>
                    <div className="empty-cell">
                      <IconContent
                        iconName={IconName.Trash}
                        title={language.trashCan}
                        ariaLabel={language.actionNotAllowedForAdmin}
                      />
                    </div>
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
