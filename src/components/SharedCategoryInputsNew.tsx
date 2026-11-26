import type { Status } from '../app/api/apiTypes/adminApiTypes';
import type { InputChangeHandler } from '../shared/types';
import Input from './formElements/Input';
import StatusInputsNew from './StatusInputsNew';

interface SharedCategoryInputsNewProps {
  categoryNameErrorText: string;
  categoryNameId: string;
  categoryNameLabelText: string;
  categoryNamevalue: string;
  id: string;
  labelText: string;
  name: string;
  onCategoryNameChange: InputChangeHandler;
  onSelectStatus: any;
  onTimeChange: InputChangeHandler;
  selectedDate: Date;
  timeValue: string;
  value: Status;
  onSelectDate: (date: Date) => void;
}

const SharedCategoryInputsNew = ({
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
}: SharedCategoryInputsNewProps) => (
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

    <StatusInputsNew
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

export default SharedCategoryInputsNew;
