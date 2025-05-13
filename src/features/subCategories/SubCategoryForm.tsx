import { useNavigate } from 'react-router';
import {
  Category,
  CreateSubCategoryRequest,
  SubCategoryResponse,
} from '../../app/api/apiTypes';
import useDatePicker from '../../components/datePicker/useDatePicker';
import FieldSet from '../../components/fieldset/FieldSet';
import Form from '../../components/Form';
import validateSubcategory from '../../components/formElements/validation/validateSubcategory';
import useMessagePopup from '../../components/messagePopup/useMessagePopup';
import Selectbox from '../../components/selectbox/Selectbox';
import StatusOptions from '../../components/selectbox/StatusOptions';
import SharedCategoryInputs from '../../components/SharedCategoryInputs';
import useFormValidation from '../../hooks/useFormValidation';
import { MainPath } from '../../layout/nav/enums';
import { OptionType } from '../../types/types';
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
  const initialState: CreateSubCategoryRequest = {
    subCategoryName: selectedCategory?.subCategoryName ?? '',
    categoryStatus: selectedCategory?.categoryStatus ?? 'Inactive',
    category: selectedCategory?.mainCategory.categoryName ?? '',
  };

  const { onChange, values, onSubmit, onCustomChange, errors } =
    useFormValidation({
      initialState,
      validate: validateSubcategory,
      callback: handleSubmitCategory,
    });

  const { onAddMessagePopup } = useMessagePopup();
  const [updateSubCategory] = useUpdateSubCategoryMutation();
  const [createSubCategory] = useCreateSubCategoryMutation();
  const selectedTime = selectedCategory?.scheduledDate;

  const parentCategoriesOptions = parentCategories.map(
    ({ categoryName, id, categoryStatus }) => ({
      label: categoryName,
      value: id,
      status: categoryStatus,
    }),
  );

  const { handleTimeChange, handleDaySelect, selectedDate, timeValue } =
    useDatePicker({ initialTime: selectedTime });

  const handleSelectStatus = (name: string, selectedOptions: OptionType) => {
    onCustomChange(name, selectedOptions.value);
  };

  const preSelectedCategory = parentCategoriesOptions.find(
    (parentCategory) => parentCategory.label === values.category,
  );

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
      navigate(`/admin/${MainPath.AdminSubCategories}`);
    } catch (error: any) {
      onAddMessagePopup({
        messagePopupType: 'error',
        message: error.data.message,
        componentType: 'notification',
      });
    }
  }

  const handleGoback = () => {
    navigate(-1);
  };

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
          labelText={language.parentCategory}
          errorText={language[errors.category]}
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
            label: language[values.categoryStatus.toLowerCase()],
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
