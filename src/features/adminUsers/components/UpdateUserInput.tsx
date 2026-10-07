import Form from '../../../components/Form';
import Input from '../../../components/formElements/Input';
import { InputChangeHandler } from '../../../types/types';
import RoleRadioBtn from './RoleRadioBtn';
import { BaseUpdateUserProps } from './UpdateUser';

interface UpdateUserInputProps extends BaseUpdateUserProps {
  labelText: string;
  onEditChange: InputChangeHandler;
  submitBtnLabel: string;
  onCancel: () => void;
}

const UpdateUserInput = ({
  id,
  onEditChange,
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
      <RoleRadioBtn roleValue={roleValue} onChange={onEditChange} />
    ) : (
      <Input
        id={id}
        name={id}
        onChange={onEditChange}
        value={value}
        labelText={language[labelText]}
        inputHasNoLabel
      />
    )}
  </Form>
);

export default UpdateUserInput;
