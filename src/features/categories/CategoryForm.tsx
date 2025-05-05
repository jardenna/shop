import { useNavigate } from 'react-router';
import { CreateCategoryRequest } from '../../app/api/apiTypes';
import useDatePicker from '../../components/datePicker/useDatePicker';
import FieldSet from '../../components/fieldset/FieldSet';
import Form from '../../components/Form';
import validateCategory from '../../components/formElements/validation/validateCategory';
import useMessagePopup from '../../components/messagePopup/useMessagePopup';
import { OptionType } from '../../components/selectbox/Selectbox';
import SharedCategoryInputs from '../../components/SharedCategoryInputs';
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
      validate: validateCategory,
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

  return (
    <div className="page-card">
      <Form
        className="category-form"
        onSubmit={onSubmit}
        submitBtnLabel={id ? language.save : language.create}
      >
        <FieldSet legendText={language.categories} hideLegendText>
          <SharedCategoryInputs
            labelText={language.categoryStatus}
            onCategoryNameChange={onChange}
            categoryNamevalue={values.categoryName}
            categoryNameId="categoryName"
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
            categoryNameErrorText={language[errors.categoryName]}
            categoryNameLabelText={language.categoryName}
          />
        </FieldSet>
      </Form>
    </div>
  );
};

export default CategoryForm;
