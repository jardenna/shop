import { IconName } from '../../types/enums';
import { ChangeInputType } from '../../types/types';
import Input from '../formElements/Input';
import IconBtn from '../IconBtn';

type EditFieldProps = {
  id: string;
  labelText: string;
  showEditInput: boolean;
  value: string;
  onCancel: () => void;
  onChange: (event: ChangeInputType) => void;
  onEdit: () => void;
  onSave: () => void;
};

const EditField = ({
  showEditInput,
  id,
  onChange,
  onSave,
  onCancel,
  value,
  labelText,
  onEdit,
}: EditFieldProps) => (
  <section>
    {showEditInput ? (
      <div>
        <Input
          id={id}
          name={id}
          onChange={onChange}
          value={value}
          labelText={labelText}
          inputHasNoLabel
        />

        <IconBtn
          onClick={onCancel}
          iconName={IconName.Close}
          title="Check"
          ariaLabel="save"
        />

        <IconBtn
          onClick={onSave}
          iconName={IconName.Check}
          title="Check"
          ariaLabel="save"
        />
      </div>
    ) : (
      <>
        <span>{labelText}</span>
        <IconBtn
          onClick={onEdit}
          iconName={IconName.Edit}
          title="gg"
          ariaLabel="edit"
        />
      </>
    )}
  </section>
);

export default EditField;
