import { RoleTypes } from '../../../app/api/apiTypes';
import RadioButton, {
  RadioListItem,
} from '../../../components/formElements/RadioButton';

import IconBtn from '../../../components/IconBtn';
import EditTableInput, {
  BaseEditTableInput,
} from '../../../components/sortTable/EditTableInput';
import { IconName } from '../../../types/enums';
import useLanguage from '../../language/useLanguage';

type EditUserInputProps = {
  isAdmin: boolean;
  roleOptions: RadioListItem[];
  roleValue: RoleTypes;
  showEditInput: boolean;
  onEditBtnClick: () => void;
} & BaseEditTableInput;

const EditUserInput = ({
  showEditInput,
  id,
  onEditChange,
  onSave,
  onCancel,
  value,
  cellContent,
  onEditBtnClick,
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
          onEditChange={onEditChange}
          value={value}
          cellContent={cellContent}
          onCancel={onCancel}
          onSave={onSave}
          isAlterntiveInput={id === 'role'}
          alternativeInput={
            <RadioButton
              radioButtonList={roleOptions}
              name="role"
              initialChecked={roleValue}
              onChange={onEditChange}
            />
          }
        />
      ) : (
        <>
          <span>
            {!cellContent.includes('@') ? (
              cellContent
            ) : (
              <a href={`mailto:${cellContent}`}>{cellContent}</a>
            )}
          </span>
          {!isAdmin && (
            <IconBtn
              onClick={onEditBtnClick}
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
