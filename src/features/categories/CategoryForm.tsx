import { useNavigate } from 'react-router';
import { CategoryStatus, CreateCategoryRequest } from '../../app/api/apiTypes';
import SharedDatePicker from '../../components/authForm/SharedDatePicker';
import useDatePicker from '../../components/datePicker/useDatePicker';
import FieldSet from '../../components/fieldset/FieldSet';
import Form from '../../components/formElements/form/Form';
import Input from '../../components/formElements/Input';
import validationCategories from '../../components/formElements/validation/validateCategory';
import validateUpdateCategory from '../../components/formElements/validation/validateUpdateCategory';
import useMessagePopup from '../../components/messagePopup/useMessagePopup';
import Selectbox, { OptionType } from '../../components/selectbox/Selectbox';
import useFormValidation from '../../hooks/useFormValidation';
import { MainPath } from '../../layout/nav/enums';
import useLanguage from '../language/useLanguage';
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from './categoriyApiSlice';

type CategoryFormProps = {
  id: string | null;
  selectedCategory: CreateCategoryRequest | null;
};

type StatusOptions = {
  label: string;
  value: CategoryStatus;
};

const CategoryForm = ({ selectedCategory, id }: CategoryFormProps) => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const initialState: CreateCategoryRequest = {
    categoryName: selectedCategory?.categoryName || '',
    categoryStatus: selectedCategory?.categoryStatus || 'Inactive',
  };

  const { onChange, values, onSubmit, errors, onCustomChange } =
    useFormValidation({
      initialState,
      validate: validationCategories,
      callback: handleSubmitCategory,
    });

  const { onAddMessagePopup } = useMessagePopup();
  const [updateCategory] = useUpdateCategoryMutation();
  const [createCategory] = useCreateCategoryMutation();
  const selectedTime = selectedCategory?.scheduledDate;

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

      navigate(`/admin/${MainPath.AdminCategories}`);
    } catch (error: any) {
      onAddMessagePopup({
        messagePopupType: 'error',
        message: error.data.message,
        componentType: 'notification',
      });
    }
  }

  const statusOptions: StatusOptions[] = [
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

export default CategoryForm;
