import { BtnVariant } from '../../types/enums';
import { ChangeInputType } from '../../types/types';
import Button from '../Button';
import Input from '../formElements/Input';

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
        />
        <Button variant={BtnVariant.Ghost} onClick={onCancel}>
          Cancel
        </Button>
        <Button variant={BtnVariant.Ghost} onClick={onSave}>
          Save
        </Button>
      </div>
    ) : (
      <>
        <span>{labelText}</span>
        <Button variant={BtnVariant.Ghost} onClick={onEdit}>
          Edit
        </Button>
      </>
    )}
  </section>
);

export default EditField;
