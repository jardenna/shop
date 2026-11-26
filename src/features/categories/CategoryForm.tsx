import { ErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router';
import type { CreateCategoryRequest } from '../../app/api/apiTypes/categoryApiTypes';
import { useDatePicker } from '../../components/datePicker/useDatePicker';
import ErrorBoundaryFallback from '../../components/ErrorBoundaryFallback';
import FieldSet from '../../components/fieldset/FieldSet';
import Form from '../../components/Form';
import SharedCategoryInputs from '../../components/SharedCategoryInputs';
import { useToast } from '../../components/toast/hooks/useToast';
import { useFormValidation } from '../../hooks/useFormValidation';
import { AdminPath } from '../../layout/nav/navConstants';
import { validateCategory } from '../../utils/validation/validateCategory';
import { useLanguage } from '../language/useLanguage';
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from './categoriyApiSlice';

interface CategoryFormProps {
  id: string | null;
  selectedCategory?: CreateCategoryRequest;
  onReset?: () => void;
}

const CategoryForm = ({ selectedCategory, id, onReset }: CategoryFormProps) => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  // Helper functions
  const handleGoback = () => {
    navigate(-1);
  };

  // Initial state
  const initialState: CreateCategoryRequest = {
    categoryName: selectedCategory?.categoryName || '',
    categoryStatus: selectedCategory?.categoryStatus || 'Inactive',
  };

  const selectedTime = selectedCategory?.scheduledDate;

  // Hooks
  const { onChange, values, onSubmit, errors, onSelectChange, isFormDirty } =
    useFormValidation({
      initialState,
      validate: validateCategory,
      callback: handleSubmitCategory,
    });

  const { onAddToast } = useToast();
  const {
    handleTimeChange,
    handleDaySelect,
    selectedDate,
    timeValue,
    isChanged,
  } = useDatePicker({ initialTime: selectedTime });

  // Redux hooks
  const [updateCategory, { isLoading }] = useUpdateCategoryMutation();
  const [createCategory, { isLoading: isCreateLoading }] =
    useCreateCategoryMutation();

  // Submit handler
  async function handleSubmitCategory() {
    const result = await (
      id
        ? updateCategory({
            id,
            category: { ...values, scheduledDate: selectedDate },
          })
        : createCategory({ ...values, scheduledDate: selectedDate })
    ).unwrap();

    if (result.success) {
      onAddToast({
        message: result.message,
      });

      navigate(AdminPath.AdminCategories);
    }
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorBoundaryFallback} onReset={onReset}>
      <Form
        onSubmit={onSubmit}
        disabled={!!id && !isFormDirty && !isChanged}
        submitBtnLabel={id ? language.save : language.create}
        cancelBtnProps={{
          onCancel: handleGoback,
        }}
        isLoading={isLoading || isCreateLoading}
      >
        <FieldSet legendText={language.categories}>
          <SharedCategoryInputs
            labelText={language.categoryStatus}
            onCategoryNameChange={onChange}
            categoryNamevalue={values.categoryName}
            categoryNameId="categoryName"

            onSelectStatus={onSelectChange}
            value={values.categoryStatus}
            onSelectDate={handleDaySelect}
            selectedDate={selectedDate}
            timeValue={timeValue}
            onTimeChange={handleTimeChange}
            categoryNameErrorText={language[errors.categoryName]}
            categoryNameLabelText={language.categoryName}
            name="categoryStatus"
            id="categoryStatus"
          />
        </FieldSet>
      </Form>
    </ErrorBoundary>
  );
};

export default CategoryForm;
