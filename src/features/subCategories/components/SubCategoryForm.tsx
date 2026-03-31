/* eslint-disable no-underscore-dangle */
import { ErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router';
import type {
  Category,
  CreateSubCategoryRequest,
  SubCategoryResponse,
} from '../../../app/api/apiTypes/adminApiTypes';
import { useDatePicker } from '../../../components/datePicker/useDatePicker';
import ErrorBoundaryFallback from '../../../components/ErrorBoundaryFallback';
import FieldSet from '../../../components/fieldset/FieldSet';
import Form from '../../../components/form/Form';
import Input from '../../../components/formElements/Input';
import { useMessagePopup } from '../../../components/messagePopup/useMessagePopup';
import Selectbox from '../../../components/selectbox/Selectbox';
import StatusOptions from '../../../components/selectbox/StatusOptions';
import SharedCategoryInputs from '../../../components/SharedCategoryInputs';
import { useFormValidation } from '../../../hooks/useFormValidation';
import { AdminPath } from '../../../layout/nav/enums';
import type { OptionType } from '../../../types/types';
import { handleApiError } from '../../../utils/handleApiError';
import { translateKey } from '../../../utils/utils';
import { validateSubcategory } from '../../../utils/validation/validateSubcategory';
import { useLanguage } from '../../language/useLanguage';
import {
  useCreateSubCategoryMutation,
  useUpdateSubCategoryMutation,
} from '../subCategoryApiSlice';

type SubCategoryFormProps = {
  id: string | null;
  parentCategories: Category[];
  popupMessage: string;
  selectedCategory: SubCategoryResponse | null;
  onReset: () => void;
};

const SubCategoryForm = ({
  selectedCategory,
  id,
  onReset,
  parentCategories,
  popupMessage,
}: SubCategoryFormProps) => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  // Helper functions
  const handleGoback = () => {
    navigate(-1);
  };

  const handleSelectStatus = (name: string, selectedOptions: OptionType) => {
    onCustomChange(name, selectedOptions.value);
  };

  // Options and initial state
  const parentCategoriesOptions = parentCategories.map(
    ({ categoryName, id, categoryStatus }) => ({
      label: translateKey(categoryName, language) || categoryName,
      value: id,
      status: categoryStatus,
    }),
  );

  const initialState: CreateSubCategoryRequest = {
    subCategoryName: selectedCategory?.subCategoryName ?? '',
    categoryStatus: selectedCategory?.categoryStatus ?? 'Inactive',
    category: selectedCategory?.mainCategory._id ?? '',
    translationKey: selectedCategory?.translationKey ?? '',
  };

  const selectedTime = selectedCategory?.scheduledDate;

  // Hooks
  const { onChange, values, onSubmit, onCustomChange, errors, isFormDirty } =
    useFormValidation({
      initialState,
      validate: validateSubcategory,
      callback: handleSubmitCategory,
    });

  const { onAddMessagePopup } = useMessagePopup();
  const { handleTimeChange, handleDaySelect, selectedDate, timeValue } =
    useDatePicker({ initialTime: selectedTime });

  // Redux hooks
  const [updateSubCategory, { isLoading }] = useUpdateSubCategoryMutation();
  const [createSubCategory, { isLoading: isCreateLoading }] =
    useCreateSubCategoryMutation();

  // Submit handler
  async function handleSubmitCategory() {
    if (!isFormDirty) {
      onAddMessagePopup({
        message: language.noChanges,
      });
      return;
    }

    try {
      if (id) {
        await updateSubCategory({
          id,
          subCategory: {
            ...values,
            category: values.category,
            scheduledDate: selectedDate,
          },
        }).unwrap();

        onAddMessagePopup({
          message: language.categoryUpdated,
        });
      } else {
        await createSubCategory({
          ...values,
          category: values.category,
          scheduledDate: selectedDate,
        }).unwrap();
      }

      onAddMessagePopup({
        message: popupMessage,
        withDelay: true,
      });

      navigate(AdminPath.AdminSubCategories);
    } catch (error) {
      handleApiError(error, onAddMessagePopup);
    }
  }

  const selectedCategoryOption = parentCategoriesOptions.find(
    (option) => option.value === values.category,
  );
  return (
    <ErrorBoundary FallbackComponent={ErrorBoundaryFallback} onReset={onReset}>
      <Form
        disabled={!isFormDirty}
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
            defaultValue={selectedCategoryOption}
            options={parentCategoriesOptions}
            components={{ Option: StatusOptions }}
            onChange={(selectedOptions: OptionType) => {
              handleSelectStatus('category', selectedOptions);
            }}
            name="category"
            labelText={language.mainCategoryName}
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
            defaultStatusValue={{
              label: translateKey(values.categoryStatus, language),
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
          />
        </FieldSet>
      </Form>
    </ErrorBoundary>
  );
};

export default SubCategoryForm;
