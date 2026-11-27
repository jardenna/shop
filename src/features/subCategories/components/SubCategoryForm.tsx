/* eslint-disable no-underscore-dangle */
import { ErrorBoundary } from 'react-error-boundary';
import { useLocation, useNavigate } from 'react-router';
import type { Category } from '../../../app/api/apiTypes/categoryApiTypes';
import type { SubCategoryResponse } from '../../../app/api/apiTypes/subCategoryApiTypes';
import { useDatePicker } from '../../../components/datePicker/useDatePicker';
import ErrorBoundaryFallback from '../../../components/ErrorBoundaryFallback';
import FieldSet from '../../../components/fieldset/FieldSet';
import Form from '../../../components/Form';
import Input from '../../../components/formElements/Input';
import Selectbox from '../../../components/selectbox/Selectbox';
import StatusOptions from '../../../components/selectbox/StatusOptions';
import SharedCategoryInputs from '../../../components/SharedCategoryInputs';
import { useToast } from '../../../components/toast/hooks/useToast';
import { useFormValidation } from '../../../hooks/useFormValidation';
import { AdminPath } from '../../../layout/nav/navConstants';
import { translateKey } from '../../../utils/utils';
import { validateSubcategory } from '../../../utils/validation/validateSubcategory';
import { useLanguage } from '../../language/useLanguage';
import {
  useCreateSubCategoryMutation,
  useUpdateSubCategoryMutation,
} from '../subCategoryApiSlice';

interface SubCategoryFormProps {
  id: string | null;
  parentCategories: Category[];
  selectedCategory?: SubCategoryResponse;
  onReset: () => void;
}

const SubCategoryForm = ({
  selectedCategory,
  id,
  onReset,
  parentCategories,
}: SubCategoryFormProps) => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const location = useLocation();

  const returnTo = location.state?.returnTo ?? AdminPath.AdminSubCategories;

  // Helper functions
  const handleGoback = () => {
    navigate(-1);
  };

  // Options
  const parentCategoriesOptions = parentCategories.map(
    ({ categoryName, id, categoryStatus }) => ({
      label: translateKey(categoryName, language) || categoryName,
      value: id,
      id,
      status: categoryStatus,
    }),
  );

  const initialState = {
    subCategoryName: selectedCategory?.subCategoryName ?? '',
    categoryStatus: selectedCategory?.categoryStatus ?? 'Inactive',
    category: selectedCategory?.mainCategory._id ?? '',
    translationKey: selectedCategory?.translationKey ?? '',
  };

  const selectedTime = selectedCategory?.scheduledDate;

  // Hooks
  const { onChange, values, onSubmit, onSelectChange, errors, isFormDirty } =
    useFormValidation({
      initialState,
      validate: validateSubcategory,
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
  const [updateSubCategory, { isLoading }] = useUpdateSubCategoryMutation();
  const [createSubCategory, { isLoading: isCreateLoading }] =
    useCreateSubCategoryMutation();

  // Submit handler
  async function handleSubmitCategory() {
    const subCategory = {
      ...values,
      category: values.category,
      scheduledDate: selectedDate,
    };

    const result = await (
      id
        ? updateSubCategory({
            id,
            subCategory,
          })
        : createSubCategory(subCategory)
    ).unwrap();

    if (result.success) {
      onAddToast({
        message: result.message,
      });

      navigate(returnTo, { replace: true });
    }
  }

  return (
    <ErrorBoundary
      FallbackComponent={ErrorBoundaryFallback}
      onReset={() => {
        onReset();
      }}
    >
      <Form
        disabled={!!id && !isFormDirty && !isChanged}
        onSubmit={onSubmit}
        submitBtnLabel={id ? language.save : language.create}
        cancelBtnProps={{
          onCancel: handleGoback,
        }}
        isLoading={isLoading || isCreateLoading}
      >
        <FieldSet legendText={language.categories}>
          <Selectbox
            id="category"
            value={values.category}
            options={parentCategoriesOptions}
            onChange={onSelectChange}
            components={{ Option: StatusOptions }}
            name="category"
            labelText={language.categoryName}
            errorText={language[errors.category]}
            required
          />
          <Input
            onChange={onChange}
            value={values.translationKey}
            id="translationKey"
            name="translationKey"
            labelText={language.translationKey}
            errorText={language[errors.translationKey]}
            inputInfo={language.translationKeyHelpText}
            required
          />
          <SharedCategoryInputs
            labelText={language.categoryStatus}
            categoryNamevalue={values.subCategoryName}
            categoryNameId="subCategoryName"
            categoryNameErrorText={language[errors.subCategoryName]}
            categoryNameLabelText={language.categoryName}
            onCategoryNameChange={onChange}
            onSelectStatus={onSelectChange}
            value={values.categoryStatus}
            onSelectDate={handleDaySelect}
            selectedDate={selectedDate}
            timeValue={timeValue}
            onTimeChange={handleTimeChange}
            name="categoryStatus"
            id="categoryStatus"
          />
        </FieldSet>
      </Form>
    </ErrorBoundary>
  );
};

export default SubCategoryForm;
