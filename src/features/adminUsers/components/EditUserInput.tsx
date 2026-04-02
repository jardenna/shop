import type { Roles } from '../../../app/api/apiTypes/adminApiTypes';
import type { BaseEditTableInput } from '../../../components/sortTable/EditTableInput';
import EditTableInput from '../../../components/sortTable/EditTableInput';
import RoleRadioBtn from './RoleRadioBtn';

type EditUserInputProps = BaseEditTableInput & {
  roleValue: Roles;
};

const EditUserInput = ({
  id,
  onEditChange,
  onSave,
  onCancel,
  value,
  roleValue,
}: EditUserInputProps) => (
  <section className="delete-user-popup">
    <EditTableInput
      labelText={id}
      id={id}
      onEditChange={onEditChange}
      value={value}
      onCancel={onCancel}
      onSave={onSave}
      isAlterntiveInput={id === 'role'}
      alternativeInput={
        <RoleRadioBtn roleValue={roleValue} onChange={onEditChange} />
      }
    />
  </section>
);

export default EditUserInput;
