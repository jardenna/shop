import type { InputChangeHandler } from '../types/types';
import Input from './formElements/Input';
import type { StatusInputsProps } from './StatusInputs';
import StatusInputs from './StatusInputs';

type SharedCategoryInputsProps = StatusInputsProps & {
  categoryNameErrorText: string;
  categoryNameId: string;
  categoryNameLabelText: string;
  categoryNamevalue: string;
  onCategoryNameChange: InputChangeHandler;
};

const SharedCategoryInputs = ({
  status,
  onSelectDate,
  selectedDate,
  timeValue,
  onTimeChange,
  onSelectStatus,
  defaultStatusValue,
  onCategoryNameChange,
  categoryNamevalue,
  categoryNameId,
  categoryNameLabelText,
  categoryNameErrorText,
  labelText,
}: SharedCategoryInputsProps) => (
  <>
    <Input
      onChange={onCategoryNameChange}
      value={categoryNamevalue}
      id={categoryNameId}
      name={categoryNameId}
      labelText={categoryNameLabelText}
      errorText={categoryNameErrorText}
      required
    />

    <StatusInputs
      labelText={labelText}
      timeValue={timeValue}
      onTimeChange={onTimeChange}
      status={status}
      onSelectDate={onSelectDate}
      onSelectStatus={onSelectStatus}
      defaultStatusValue={defaultStatusValue}
      selectedDate={selectedDate}
    />
  </>
);

export default SharedCategoryInputs;
