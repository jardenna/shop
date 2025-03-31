import { RoleTypes } from '../../../app/api/apiTypes';
import Input from '../../../components/formElements/Input';
import RadioButton, {
  RadioListItem,
} from '../../../components/formElements/radioButton/RadioButton';
import IconBtn from '../../../components/IconBtn';
import { IconName } from '../../../types/enums';
import { ChangeInputType } from '../../../types/types';
import useLanguage from '../../language/useLanguage';

type EditUserInputProps = {
  id: string;
  isAdmin: boolean;
  labelText: string;
  roleOptions: RadioListItem[];
  roleValue: RoleTypes;
  showEditInput: boolean;
  value: string;
  onCancel: () => void;
  onChange: (event: ChangeInputType) => void;
  onEdit: () => void;
  onSave: () => void;
};

const EditUserInput = ({
  showEditInput,
  id,
  onChange,
  onSave,
  onCancel,
  value,
  labelText,
  onEdit,
  isAdmin,
  roleOptions,
  roleValue,
}: EditUserInputProps) => {
  const { language } = useLanguage();

  return (
    <div className="edit-cell">
      {showEditInput ? (
        <form
          className="edit-controls"
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          {id !== 'role' ? (
            <Input
              id={id}
              name={id}
              onChange={onChange}
              value={value}
              labelText={labelText}
              inputHasNoLabel
            />
          ) : (
            <RadioButton
              radioButtonList={roleOptions}
              name="role"
              initialChecked={roleValue}
              onChange={onChange}
            />
          )}

          <IconBtn
            onClick={onCancel}
            iconName={IconName.Close}
            title={language.cancel}
            ariaLabel={language.cancel}
            size="12"
          />

          <IconBtn
            onClick={onSave}
            iconName={IconName.Check}
            title="Check"
            ariaLabel={language.save}
            size="16"
            btnType="submit"
          />
        </form>
      ) : (
        <>
          <span>
            {!labelText.includes('@') ? (
              labelText
            ) : (
              <a href={`mailto:${labelText}`}>{labelText}</a>
            )}
          </span>
          {!isAdmin && (
            <IconBtn
              onClick={onEdit}
              iconName={IconName.Edit}
              title={language.pensil}
              ariaLabel={language.editUser}
            />
          )}
        </>
      )}
    </div>
  );
};

export default EditUserInput;
