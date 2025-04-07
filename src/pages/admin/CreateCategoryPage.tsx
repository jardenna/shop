import Form from '../../components/formElements/form/Form';
import Input from '../../components/formElements/Input';
import useMessagePopup from '../../components/messagePopup/useMessagePopup';
import { useCreateCategoryMutation } from '../../features/categories/categoriyApiSlice';
import useLanguage from '../../features/language/useLanguage';
import useFormValidation from '../../hooks/useFormValidation';

const CreateCategoryPage = () => {
  const initialState = {
    categoryName: '',
    categoryStatus: '',
    scheduledDate: '',
  };
  const { language } = useLanguage();
  const { onAddMessagePopup } = useMessagePopup();
  const { onChange, values, onSubmit, errors, onClearAllValues } =
    useFormValidation({
      initialState,
      callback: handleSubmitNewCategory,
    });
  const [createCategory] = useCreateCategoryMutation();
  console.log(values);

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
  return (
    <section className="page-card">
      <Form
        onSubmit={onSubmit}
        submitBtnLabel={language.save}
        className="submit-category"
      >
        <div className="flex">
          <Input
            onChange={onChange}
            value={values.categoryName}
            id="categoryName"
            name="categoryName"
            labelText={language.addCategory}
            placeholder={language.categoryName}
            errorText={errors.categoryName}
          />
          <Input
            onChange={onChange}
            value={values.categoryStatus}
            id="categoryStatus"
            name="categoryStatus"
            labelText={language.addCategory}
            placeholder={language.categoryName}
          />
        </div>
      </Form>
    </section>
  );
};

export default CreateCategoryPage;
