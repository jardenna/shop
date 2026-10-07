import Form from '../../../components/Form';
import Input from '../../../components/formElements/Input';
import { InputChangeHandler } from '../../../types/types';
import RoleRadioBtn from './RoleRadioBtn';
import { BaseUserTableRowProps } from './UserTablePopup';

interface UpdateUserInputProps extends BaseUserTableRowProps {
  labelText: string;
  onUpdateChange: InputChangeHandler;
  submitBtnLabel: string;
  onCancel: () => void;
}

const UpdateUserInput = ({
  id,
  onUpdateChange,
  onSave,
  onCancel,
  value,
  labelText,
  roleValue,
  submitBtnLabel,
  isFormDirty,
  language,
}: UpdateUserInputProps) => (
  <Form
    submitBtnLabel={submitBtnLabel}
    disabled={!isFormDirty}
    onSubmit={() => {
      onSave();
    }}
    cancelBtnProps={{
      onCancel,
    }}
  >
    {id === 'role' ? (
      <RoleRadioBtn roleValue={roleValue} onChange={onUpdateChange} />
    ) : (
      <Input
        id={id}
        name={id}
        onChange={onUpdateChange}
        value={value}
        labelText={language[labelText]}
        inputHasNoLabel
      />
    )}
  </Form>
);

export default UpdateUserInput;
