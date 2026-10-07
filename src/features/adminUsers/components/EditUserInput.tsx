import type { Roles } from '../../../app/api/apiTypes/adminApiTypes';
import Form from '../../../components/Form';
import Input from '../../../components/formElements/Input';
import { ColumnKey } from '../../../pages/users/UserPage';
import { InputChangeHandler } from '../../../types/types';
import RoleRadioBtn from './RoleRadioBtn';

interface EditUserInputProps {
  id: ColumnKey;
  isFormDirty: boolean;
  labelText: string;
  language: Record<string, string>;
  onEditChange: InputChangeHandler;
  roleValue: Roles;
  submitBtnLabel: string;
  value: string;
  onCancel: () => void;
  onSave: () => void;
}

const EditUserInput = ({
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
}: EditUserInputProps) => (
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

export default EditUserInput;
