import { useNavigate } from 'react-router';
import type {
  Category,
  CreateSubCategoryRequest,
  SubCategoryResponse,
} from '../../app/api/apiTypes/adminApiTypes';
import useDatePicker from '../../components/datePicker/useDatePicker';
import FieldSet from '../../components/fieldset/FieldSet';
import Form from '../../components/form/Form';
import Input from '../../components/formElements/Input';
import validateSubcategory from '../../components/formElements/validation/validateSubcategory';
import useMessagePopup from '../../components/messagePopup/useMessagePopup';
import Selectbox from '../../components/selectbox/Selectbox';
import StatusOptions from '../../components/selectbox/StatusOptions';
import SharedCategoryInputs from '../../components/SharedCategoryInputs';
import useFormValidation from '../../hooks/useFormValidation';
import { MainPath } from '../../layout/nav/enums';
import type { OptionType } from '../../types/types';
import { getlowerCaseFirstLetter } from '../../utils/utils';
import useLanguage from '../language/useLanguage';
import {
  useCreateSubCategoryMutation,
  useUpdateSubCategoryMutation,
} from './subCategoryApiSlice';

type SubCategoryFormProps = {
  id: string | null;
  parentCategories: Category[];
  selectedCategory: SubCategoryResponse | null;
};

const SubCategoryForm = ({
  selectedCategory,
  id,
  parentCategories,
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
      label: categoryName,
      value: id,
      status: categoryStatus,
    }),
  );

  const initialState: CreateSubCategoryRequest = {
    subCategoryName: selectedCategory?.subCategoryName ?? '',
    categoryStatus: selectedCategory?.categoryStatus ?? 'Inactive',
    category: selectedCategory?.mainCategory.categoryName ?? '',
    translationKey: selectedCategory?.translationKey ?? '',
  };

  const selectedTime = selectedCategory?.scheduledDate;

  // Hooks
  const { onChange, values, onSubmit, onCustomChange, errors } =
    useFormValidation({
      initialState,
      validate: validateSubcategory,
      callback: handleSubmitCategory,
    });

  const preSelectedCategory = parentCategoriesOptions.find(
    (mainCategoryName) => mainCategoryName.label === values.category,
  );

  const { onAddMessagePopup } = useMessagePopup();
  const { handleTimeChange, handleDaySelect, selectedDate, timeValue } =
    useDatePicker({ initialTime: selectedTime });

  // Redux hooks
  const [updateSubCategory] = useUpdateSubCategoryMutation();
  const [createSubCategory] = useCreateSubCategoryMutation();

  // Submit handler
  async function handleSubmitCategory() {
    try {
      if (id) {
        await updateSubCategory({
          id,
          subCategory: {
            ...values,
            category: preSelectedCategory
              ? preSelectedCategory.value
              : values.category,
            scheduledDate: selectedDate,
          },
        }).unwrap();

        onAddMessagePopup({
          messagePopupType: 'success',
          message: language.categoryUpdated,
        });
      } else {
        await createSubCategory({
          ...values,
          scheduledDate: selectedDate,
        }).unwrap();

        onAddMessagePopup({
          messagePopupType: 'success',
          message: language.categoryCreated,
        });
      }
      navigate(MainPath.AdminSubCategories);
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
      onSubmit={onSubmit}
      submitBtnLabel={id ? language.save : language.create}
      onCancel={handleGoback}
    >
      <FieldSet legendText={language.categories} hideLegendText>
        <Selectbox
          id="category"
          defaultValue={{
            label: values.category,
            value: values.category,
          }}
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
          inputHelpText={language.translationKeyHelpText}
          required
        />
        <SharedCategoryInputs
          labelText={language.categoryStatus}
          categoryNamevalue={values.subCategoryName}
          categoryNameId="subCategoryName"
          categoryNameErrorText={language[errors.subCategoryName]}
          categoryNameLabelText={language.categoryName}
          onCategoryNameChange={onChange}
          allowedUpdateCategory
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
        />
      </FieldSet>
    </Form>
  );
};

export default SubCategoryForm;
