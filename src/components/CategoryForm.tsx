import { setHours, setMinutes } from 'date-fns';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { CreateCategoryRequest } from '../app/api/apiTypes';
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from '../features/categories/categoriyApiSlice';
import useLanguage from '../features/language/useLanguage';
import useFormValidation from '../hooks/useFormValidation';
import { MainPath } from '../layout/nav/enums';
import { ChangeInputType } from '../types/types';
import DatePicker from './datePicker/DatePicker';
import FieldSet from './fieldset/FieldSet';
import Form from './formElements/form/Form';
import Input from './formElements/Input';
import validationCategories from './formElements/validation/validateCategory';
import validateUpdateCategory from './formElements/validation/validateUpdateCategory';
import useMessagePopup from './messagePopup/useMessagePopup';
import Selectbox, { OptionType } from './selectbox/Selectbox';

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
  const [selectedDate, setSelectedDate] = useState<any>(new Date());
  const [timeValue, setTimeValue] = useState<string>('00:00');

  const handleTimeChange = (event: ChangeInputType) => {
    const { value } = event.target;

    const [hours, minutes] = value.split(':').map((str) => parseInt(str, 10));
    const newSelectedDate = setHours(setMinutes(selectedDate, minutes), hours);
    setSelectedDate(newSelectedDate);
    setTimeValue(value);
  };

  const handleSelectStatus = (name: string, selectedOptions: OptionType) => {
    onCustomChange(name, selectedOptions.value);
  };

  const handleDaySelect = (date: Date | undefined) => {
    if (!timeValue || !date) {
      setSelectedDate(date);
      return;
    }
    const [hours, minutes] = timeValue
      .split(':')
      .map((str) => parseInt(str, 10));
    const newDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      hours,
      minutes,
    );
    setSelectedDate(newDate);
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
        />{' '}
        <label>
          Set the time:{' '}
          <input type="time" value={timeValue} onChange={handleTimeChange} />
        </label>
        {values.categoryStatus === 'Scheduled' && (
          <DatePicker
            onSelectDate={handleDaySelect}
            selectedDate={selectedDate}
            id="selectedDate"
            labelText={language.selectPublishDate}
          />
        )}
      </FieldSet>
    </Form>
  );
};

export default CategoryForm;
