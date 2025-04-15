import { CategoryStatus } from '../../app/api/apiTypes';
import useLanguage from '../../features/language/useLanguage';
import { ChangeInputType, FormEventType } from '../../types/types';
import DatePicker from '../datePicker/DatePicker';
import useDatePicker from '../datePicker/useDatePicker';
import FieldSet from '../fieldset/FieldSet';
import Form from '../formElements/form/Form';
import Input from '../formElements/Input';
import TimeInput from '../formElements/timeInput/TimeInput';
import Selectbox, { OptionType } from '../selectbox/Selectbox';

type StatusOptions = {
  label: string;
  value: CategoryStatus;
};

type SharedCategoryFormProps = {
  errors: any;
  onCustomChange: any;
  submitBtnLabel: string;
  values: any;
  parentCategoriesOptions?: any;
  selectedTime?: Date;
  onChange: (value: ChangeInputType) => void;
  onSubmit: (event: FormEventType) => void;
};

const SharedCategoryForm = ({
  selectedTime,
  onSubmit,
  onChange,
  errors,
  values,
  onCustomChange,
  parentCategoriesOptions,
  submitBtnLabel,
}: SharedCategoryFormProps) => {
  const { language } = useLanguage();
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

  const { handleTimeChange, handleDaySelect, selectedDate, timeValue } =
    useDatePicker({ initialTime: selectedTime });

  const handleSelectStatus = (name: string, selectedOptions: OptionType) => {
    onCustomChange(name, selectedOptions.value);
  };

  return (
    <Form onSubmit={onSubmit} submitBtnLabel={submitBtnLabel}>
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
        {parentCategoriesOptions && (
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
        )}
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

export default SharedCategoryForm;
