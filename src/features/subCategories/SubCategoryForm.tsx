import { useNavigate } from 'react-router';
import {
  Category,
  CreateCategoryRequest,
  CreateSubCategoryRequest,
} from '../../app/api/apiTypes';
import DatePicker from '../../components/datePicker/DatePicker';
import useDatePicker from '../../components/datePicker/useDatePicker';
import FieldSet from '../../components/fieldset/FieldSet';
import Form from '../../components/formElements/form/Form';
import Input from '../../components/formElements/Input';
import TimeInput from '../../components/formElements/timeInput/TimeInput';
import validateUpdateCategory from '../../components/formElements/validation/validateUpdateCategory';
import useMessagePopup from '../../components/messagePopup/useMessagePopup';
import Selectbox, { OptionType } from '../../components/selectbox/Selectbox';
import useFormValidation from '../../hooks/useFormValidation';
import { MainPath } from '../../layout/nav/enums';
import useLanguage from '../language/useLanguage';
import { useCreateSubCategoryMutation } from './subCategoryApiSlice';

type SubCategoryFormProps = {
  id: string | null;
  parentCategories: Category[];
  selectedCategory: CreateCategoryRequest | null;
};

const SubCategoryForm = ({
  selectedCategory,
  id,
  parentCategories,
}: SubCategoryFormProps) => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const initialState: CreateSubCategoryRequest = {
    subCategoryName: selectedCategory?.categoryName || '',
    categoryStatus: selectedCategory?.categoryStatus || 'Inactive',
    category: '',
  };

  const parentCategoriesOptions = parentCategories.map(
    ({ categoryName, id }) => ({
      label: categoryName,
      value: id,
    }),
  );

  const { onChange, values, onSubmit, onCustomChange } = useFormValidation({
    initialState,
    callback: handleSubmitCategory,
  });

  const { onAddMessagePopup } = useMessagePopup();

  const [createSubCategory] = useCreateSubCategoryMutation();

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
      const result = await createSubCategory({
        ...values,
        scheduledDate: selectedDate,
      }).unwrap();
      console.log(result);

      onAddMessagePopup({
        messagePopupType: 'success',
        message: language.categoryCreated,
      });

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
  // console.log(selectedCategory?.scheduledDate);

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
        />
        <Selectbox
          id="category"
          defaultValue={{
            label: language[values.category.toLowerCase()],
            value: values.category,
          }}
          options={parentCategoriesOptions}
          onChange={(selectedOptions: OptionType) => {
            handleSelectStatus('category', selectedOptions);
          }}
          name="category"
          labelText="select parent Cat"
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

export default SubCategoryForm;
