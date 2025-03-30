import { Category } from '../../app/api/apiTypes';
import Form from '../../components/formElements/form/Form';
import Input from '../../components/formElements/Input';
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

const initialState = {
  name: '',
};

const tableHeaders: { key: keyof Category; label: string }[] = [
  { key: 'name', label: 'name' },
  { key: 'createdAt', label: 'createdAt' },
  { key: 'updatedAt', label: 'updatedAt' },
  { key: 'id', label: '' },
];

const tableBodyCells: (keyof Category)[] = ['name', 'createdAt', 'updatedAt'];

const CategoryPage = () => {
  const { language } = useLanguage();
  const { onAddMessagePopup } = useMessagePopup();
  const { data: allCategories, isLoading } = useGetAllCategoriesQuery();
  const [createCategory] = useCreateCategoryMutation();

  const { onChange, values, onSubmit, errors } = useFormValidation({
    initialState,
    callback: handleSubmitCategory,
  });

  async function handleSubmitCategory() {
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

  return (
    <section>
      <h1>{language.categories}</h1>
      <Form onSubmit={onSubmit} submitBtnLabel={language.save}>
        <Input
          onChange={onChange}
          value={values.name}
          id="name"
          name="name"
          labelText={language.addCategory}
          placeholder={language.name}
          errorText={errors.name}
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
                      {String(
                        allCategories.find((user) => user.id === id)?.[td] ||
                          '',
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
