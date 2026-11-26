import type { Status } from '../app/api/apiTypes/adminApiTypes';
import type { InputChangeHandler } from '../shared/types';
import Input from './formElements/Input';
import type { SelectChangeHandler } from './selectbox/SelectboxNew';
import StatusInputs from './StatusInputs';

export interface StatusOptionsValues {
  label: string;
  value: Status;
}

interface SharedCategoryInputsProps {
  categoryNameErrorText: string;
  categoryNameId: string;
  categoryNameLabelText: string;
  categoryNamevalue: string;
  id: string;
  labelText: string;
  name: string;
  onCategoryNameChange: InputChangeHandler;
  onSelectStatus: SelectChangeHandler<StatusOptionsValues>;
  onTimeChange: InputChangeHandler;
  selectedDate: Date;
  timeValue: string;
  value: Status;
  onSelectDate: (date: Date) => void;
}

const SharedCategoryInputs = ({
  id,
  onSelectDate,
  selectedDate,
  timeValue,
  onTimeChange,
  onSelectStatus,
  name,
  value,
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
      onSelectDate={onSelectDate}
      onSelectStatus={onSelectStatus}
      selectedDate={selectedDate}
      id={id}
      name={name}
      value={value}
    />
  </>
);

export default SharedCategoryInputs;
