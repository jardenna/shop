import type { Roles } from '../../../app/api/apiTypes/adminApiTypes';
import Form from '../../../components/form/Form';
import Input from '../../../components/formElements/Input';
import { ColumnKey } from '../../../pages/admin/UserPage';
import { InputChangeHandler } from '../../../types/types';
import RoleRadioBtn from './RoleRadioBtn';

type EditUserInputProps = {
  id: ColumnKey;
  labelText: string;
  onEditChange: InputChangeHandler;
  roleValue: Roles;
  submitBtnLabel: string;
  value: string;
  onCancel: () => void;
  onSave: () => void;
};

const EditUserInput = ({
  id,
  onEditChange,
  onSave,
  onCancel,
  value,
  labelText,
  roleValue,
  submitBtnLabel,
}: EditUserInputProps) => (
  <section className="delete-user-popup">
    <Form
      submitBtnLabel={submitBtnLabel}
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
          labelText={labelText}
          inputHasNoLabel
          autoFocus
          autoComplete="off"
        />
      )}
    </Form>
  </section>
);

export default EditUserInput;
