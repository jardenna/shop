import Form from '../../components/formElements/form/Form';
import Input from '../../components/formElements/Input';
import useMessagePopup from '../../components/messagePopup/useMessagePopup';
import {
  useCreateCategoryMutation,
  useGetAllCategoriesQuery,
} from '../../features/categories/categoriyApiSlice';
import CategoryList from '../../features/categories/CategoryList';
import useLanguage from '../../features/language/useLanguage';
import useFormValidation from '../../hooks/useFormValidation';

const initialState = {
  name: '',
};

const CategoryPage = () => {
  const { language } = useLanguage();
  const { onAddMessagePopup } = useMessagePopup();
  const { data: allCategories } = useGetAllCategoriesQuery();
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
        {allCategories && <CategoryList categories={allCategories} />}
      </div>
    </section>
  );
};

export default CategoryPage;
