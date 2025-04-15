import { useNavigate } from 'react-router';
import {
  Category,
  CreateSubCategoryRequest,
  SubCategoryResponse,
} from '../../app/api/apiTypes';
import SharedDatePicker from '../../components/authForm/SharedDatePicker';
import useDatePicker from '../../components/datePicker/useDatePicker';
import FieldSet from '../../components/fieldset/FieldSet';
import Form from '../../components/formElements/form/Form';
import Input from '../../components/formElements/Input';
import validateSubcategory from '../../components/formElements/validation/validate';
import validateUpdateCategory from '../../components/formElements/validation/validateUpdateCategory';
import useMessagePopup from '../../components/messagePopup/useMessagePopup';
import Selectbox, { OptionType } from '../../components/selectbox/Selectbox';
import useFormValidation from '../../hooks/useFormValidation';
import { MainPath } from '../../layout/nav/enums';
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
    subCategoryName: selectedCategory?.subCategoryName || '',
    categoryStatus: selectedCategory?.categoryStatus || 'Inactive',
    category: selectedCategory?.mainCategory.categoryName || '',
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
    ({ categoryName, id }) => ({
      label: categoryName,
      value: id,
    }),
  );

  const { handleTimeChange, handleDaySelect, selectedDate, timeValue } =
    useDatePicker({ initialTime: selectedTime });

  const handleSelectStatus = (name: string, selectedOptions: OptionType) => {
    onCustomChange(name, selectedOptions.value);
  };

  async function handleSubmitCategory() {
    const validation = validateUpdateCategory(values);
    if (validation) {
      onAddMessagePopup({
        messagePopupType: 'error',
        message: language[validation],
        componentType: 'notification',
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
    <Form
      onSubmit={onSubmit}
      submitBtnLabel={id ? language.save : language.create}
    >
      <FieldSet legendText={language.categories}>
        <Input
          onChange={onChange}
          value={values.subCategoryName}
          id="subCategoryName"
          name="subCategoryName"
          labelText={language.addCategoryName}
          placeholder={language.categoryName}
          errorText={language[errors.subCategoryName]}
          required
        />
        <Selectbox
          id="category"
          defaultValue={{
            label: values.category,
            value: values.category,
          }}
          options={parentCategoriesOptions}
          onChange={(selectedOptions: OptionType) => {
            handleSelectStatus('category', selectedOptions);
          }}
          name="category"
          labelText={language.selectParentCategory}
          errorText={language[errors.category]}
          required
        />

        <Selectbox
          id="categoryStatus"
          defaultValue={{
            label: language[values.categoryStatus.toLowerCase()],
            value: values.categoryStatus,
          }}
          options={statusOptions}
          onChange={(selectedOptions: OptionType) => {
            handleSelectStatus('categoryStatus', selectedOptions);
          }}
          name="categoryStatus"
          labelText={language.selectCategoryStatus}
        />

        <SharedDatePicker
          categoryStatus={values.categoryStatus}
          onSelectDate={handleDaySelect}
          selectedDate={selectedDate}
          legendText={language.categories}
          timeValue={timeValue}
          onTimeChange={handleTimeChange}
        />
      </FieldSet>
    </Form>
  );
};

export default SubCategoryForm;
