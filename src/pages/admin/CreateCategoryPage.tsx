import { useState } from 'react';
import { CategoryStatus } from '../../app/api/apiTypes';
import DatePicker from '../../components/datePicker/DatePicker';
import FieldSet from '../../components/fieldset/FieldSet';
import Form from '../../components/formElements/form/Form';
import Input from '../../components/formElements/Input';
import validationCategories from '../../components/formElements/validation/validateCategory';
import useMessagePopup from '../../components/messagePopup/useMessagePopup';
import Selectbox, { OptionType } from '../../components/selectbox/Selectbox';
import { useCreateCategoryMutation } from '../../features/categories/categoriyApiSlice';
import useLanguage from '../../features/language/useLanguage';
import useFormValidation from '../../hooks/useFormValidation';

export type CategoryState = {
  categoryName: string;
  categoryStatus: CategoryStatus;
};

const CreateCategoryPage = () => {
  const initialState: CategoryState = {
    categoryName: '',
    categoryStatus: '' as CategoryStatus,
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
    validate: validationCategories,
    callback: handleSubmitNewCategory,
  });
  const [createCategory] = useCreateCategoryMutation();

  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleSelectStatus = (name: string, selectedOptions: OptionType) => {
    onCustomChange(name, selectedOptions.value);
  };

  async function handleSubmitNewCategory() {
    try {
      const result = await createCategory({
        ...values,
        scheduledDate: selectedDate,
      }).unwrap();
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
      label: language.scheduledFor,
      value: 'Scheduled',
    },
    {
      label: language.published,
      value: 'Published',
    },
  ];

  return (
    <section className="page-small">
      <h1>{language.createNewCategory}</h1>
      <div className="page-card">
        <Form
          onSubmit={onSubmit}
          submitBtnLabel={language.save}
          className="submit-category"
        >
          <FieldSet legendText={language.categories}>
            <Input
              onChange={onChange}
              value={values.categoryName}
              id="categoryName"
              name="categoryName"
              labelText={language.addCategoryName}
              placeholder={language.categoryName}
              errorText={language[errors.categoryName]}
              required
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
              labelText={language.selectCategoryStatus}
            />
            {values.categoryStatus === 'Scheduled' && (
              <DatePicker
                onSelectDate={setSelectedDate}
                selectedDate={selectedDate}
                id="selectedDate"
                labelText={language.selectPublishDate}
              />
            )}
          </FieldSet>
        </Form>
      </div>
    </section>
  );
};

export default CreateCategoryPage;
