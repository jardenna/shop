import Form from '../../components/formElements/form/Form';
import Input from '../../components/formElements/Input';
import useMessagePopup from '../../components/messagePopup/useMessagePopup';
import { useCreateCategoryMutation } from '../../features/categories/categoriyApiSlice';
import useLanguage from '../../features/language/useLanguage';
import useFormValidation from '../../hooks/useFormValidation';

const initialState = {
  name: '',
};

const CategoryPage = () => {
  const { language } = useLanguage();
  const { onAddMessagePopup } = useMessagePopup();
  const [createCategory] = useCreateCategoryMutation();

  const { onChange, values, onSubmit, errors } = useFormValidation({
    initialState,
    callback: handleSubmitCategory,
  });

  async function handleSubmitCategory() {
    try {
      const result = await createCategory(values);
      console.log(result);
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
      <div>category list</div>
    </section>
  );
};

export default CategoryPage;
