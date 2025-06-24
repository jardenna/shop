import { useNavigate } from 'react-router';
import type { CreateCategoryRequest } from '../../app/api/apiTypes/adminApiTypes';
import useDatePicker from '../../components/datePicker/useDatePicker';
import FieldSet from '../../components/fieldset/FieldSet';
import Form from '../../components/form/Form';
import validateCategory from '../../components/formElements/validation/validateCategory';
import useMessagePopup from '../../components/messagePopup/useMessagePopup';
import SharedCategoryInputs from '../../components/SharedCategoryInputs';
import useFormValidation from '../../hooks/useFormValidation';
import { AdminPath } from '../../layout/nav/enums';
import type { OptionType } from '../../types/types';
import { getlowerCaseFirstLetter } from '../../utils/utils';
import useLanguage from '../language/useLanguage';
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from './categoriyApiSlice';

type CategoryFormProps = {
  id: string | null;
  selectedCategory: CreateCategoryRequest | null;
  allowedUpdateCategory?: boolean;
};

const CategoryForm = ({
  selectedCategory,
  id,
  allowedUpdateCategory,
}: CategoryFormProps) => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  // Helper functions
  const handleGoback = () => {
    navigate(-1);
  };

  const handleSelectStatus = (name: string, selectedOptions: OptionType) => {
    onCustomChange(name, selectedOptions.value);
  };

  // Initial state
  const initialState: CreateCategoryRequest = {
    categoryName: selectedCategory?.categoryName || '',
    categoryStatus: selectedCategory?.categoryStatus || 'Inactive',
  };

  const selectedTime = selectedCategory?.scheduledDate;

  // Hooks
  const { onChange, values, onSubmit, errors, onCustomChange } =
    useFormValidation({
      initialState,
      validate: validateCategory,
      callback: handleSubmitCategory,
    });

  const { onAddMessagePopup } = useMessagePopup();
  const { handleTimeChange, handleDaySelect, selectedDate, timeValue } =
    useDatePicker({ initialTime: selectedTime });

  // Redux hooks
  const [updateCategory] = useUpdateCategoryMutation();
  const [createCategory] = useCreateCategoryMutation();

  // Submit handler
  async function handleSubmitCategory() {
    try {
      if (id) {
        await updateCategory({
          id,
          category: { ...values, scheduledDate: selectedDate },
        }).unwrap();

        onAddMessagePopup({
          messagePopupType: 'success',
          message: language.categoryUpdated,
        });
      } else {
        await createCategory({
          ...values,
          scheduledDate: selectedDate,
        }).unwrap();

        onAddMessagePopup({
          messagePopupType: 'success',
          message: language.categoryCreated,
        });
      }

      navigate(AdminPath.AdminCategories);
    } catch (error: any) {
      onAddMessagePopup({
        messagePopupType: 'error',
        message: error.data.message,
        componentType: 'notification',
      });
    }
  }

  return (
    <Form
      className="category-form"
      onSubmit={onSubmit}
      submitBtnLabel={id ? language.save : language.create}
      onCancel={handleGoback}
    >
      <FieldSet legendText={language.categories} hideLegendText>
        <SharedCategoryInputs
          labelText={language.categoryStatus}
          allowedUpdateCategory={allowedUpdateCategory}
          onCategoryNameChange={onChange}
          categoryNamevalue={values.categoryName}
          categoryNameId="categoryName"
          defaultStatusValue={{
            label: getlowerCaseFirstLetter(values.categoryStatus, language),
            value: values.categoryStatus,
          }}
          onSelectStatus={(selectedOptions: OptionType) => {
            handleSelectStatus('categoryStatus', selectedOptions);
          }}
          status={values.categoryStatus}
          onSelectDate={handleDaySelect}
          selectedDate={selectedDate}
          timeValue={timeValue}
          onTimeChange={handleTimeChange}
          categoryNameErrorText={language[errors.categoryName]}
          categoryNameLabelText={language.categoryName}
        />
      </FieldSet>
    </Form>
  );
};

export default CategoryForm;
