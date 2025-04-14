import { useNavigate } from 'react-router';
import { CreateCategoryRequest } from '../../app/api/apiTypes';
import DatePicker from '../../components/datePicker/DatePicker';
import useDatePicker from '../../components/datePicker/useDatePicker';
import FieldSet from '../../components/fieldset/FieldSet';
import Form from '../../components/formElements/form/Form';
import Input from '../../components/formElements/Input';
import TimeInput from '../../components/formElements/timeInput/TimeInput';
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

        {values.categoryStatus === 'Scheduled' && (
          <>
            <DatePicker
              onSelectDate={handleDaySelect}
              selectedDate={selectedDate}
              id="date"
              labelText={language.selectPublishDate}
            />
            <TimeInput
              value={timeValue}
              onChange={handleTimeChange}
              id="time"
              labelText={language.selectPublishTime}
              name="time"
            />
          </>
        )}
      </FieldSet>
    </Form>
  );
};

export default CategoryForm;
