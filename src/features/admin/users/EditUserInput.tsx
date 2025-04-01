import { RoleTypes } from '../../../app/api/apiTypes';
import RadioButton, {
  RadioListItem,
} from '../../../components/formElements/radioButton/RadioButton';
import IconBtn from '../../../components/IconBtn';
import EditTableInput, {
  baseEditTableInput,
} from '../../../components/sortTable/EditTableInput';
import { IconName } from '../../../types/enums';
import useLanguage from '../../language/useLanguage';

type EditUserInputProps = {
  isAdmin: boolean;
  roleOptions: RadioListItem[];
  roleValue: RoleTypes;
  showEditInput: boolean;
  onEditChange: () => void;
} & baseEditTableInput;

const EditUserInput = ({
  showEditInput,
  id,
  onChange,
  onSave,
  onCancel,
  value,
  inputLabel,
  onEditChange,
  isAdmin,
  roleOptions,
  roleValue,
}: EditUserInputProps) => {
  const { language } = useLanguage();

  return (
    <div className="edit-cell">
      {showEditInput ? (
        <EditTableInput
          id={id}
          onChange={onChange}
          value={value}
          inputLabel={inputLabel}
          onCancel={onCancel}
          onSave={onSave}
          isAlterntiveInput={id === 'role'}
          alternativeInput={
            <RadioButton
              radioButtonList={roleOptions}
              name="role"
              initialChecked={roleValue}
              onChange={onChange}
            />
          }
        />
      ) : (
        <>
          <span>
            {!inputLabel.includes('@') ? (
              inputLabel
            ) : (
              <a href={`mailto:${inputLabel}`}>{inputLabel}</a>
            )}
          </span>
          {!isAdmin && (
            <IconBtn
              onClick={onEditChange}
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
