import DatePicker from '../../components/datePicker/DatePicker';
import Form from '../../components/formElements/form/Form';
import Input from '../../components/formElements/Input';
import useMessagePopup from '../../components/messagePopup/useMessagePopup';
import Selectbox, { OptionType } from '../../components/selectBox/SelectBox';
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
  const {
    onChange,
    values,
    onSubmit,
    errors,
    onClearAllValues,
    onCustomChange,
  } = useFormValidation({
    initialState,
    callback: handleSubmitNewCategory,
  });
  const [createCategory] = useCreateCategoryMutation();
  console.log(values);

  const handleSelectStatus = (name: string, selectedOptions: OptionType) => {
    onCustomChange(name, selectedOptions.value);
  };

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

  const statusOptions = [
    {
      label: language.inactive,
      value: 'Inactive',
    },
    {
      label: language.scheduled,
      value: 'Scheduled',
    },
    {
      label: language.published,
      value: 'Published',
    },
  ];

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

          <Selectbox
            id="categoryStatus"
            defaultValue={{
              label: language.inactive,
              value: 'Inactive',
            }}
            options={statusOptions}
            onChange={(selectedOptions: OptionType) => {
              handleSelectStatus('categoryStatus', selectedOptions);
            }}
            name="categoryStatus"
            labelText="select status"
          />
          <DatePicker />
        </div>
      </Form>
    </section>
  );
};

export default CreateCategoryPage;
