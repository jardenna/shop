import type { Roles } from '../../../app/api/apiTypes/adminApiTypes';
import IconBtn from '../../../components/IconBtn';
import type { BaseEditTableInput } from '../../../components/sortTable/EditTableInput';
import EditTableInput from '../../../components/sortTable/EditTableInput';
import EditTableText from '../../../components/sortTable/EditTableText';
import { IconName } from '../../../types/enums';
import { translateKey } from '../../../utils/utils';
import useLanguage from '../../language/useLanguage';
import RoleRadioBtn from './RoleRadioBtn';

type EditUserInputProps = BaseEditTableInput & {
  allowedEditUser: boolean;
  roleValue: Roles;
  showEditInput: boolean;
  userCanBeDeleted: boolean;
  onEditBtnClick: () => void;
};

const EditUserInput = ({
  showEditInput,
  id,
  allowedEditUser,
  userCanBeDeleted,
  onEditChange,
  onSave,
  onCancel,
  value,
  cellContent,
  onEditBtnClick,

  roleValue,
}: EditUserInputProps) => {
  const { language } = useLanguage();

  return !allowedEditUser ? (
    <EditTableText
      cellContent={cellContent}
      text={translateKey(cellContent, language)}
    />
  ) : (
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
            <RoleRadioBtn roleValue={roleValue} onChange={onEditChange} />
          }
        />
      ) : (
        <>
          <EditTableText
            cellContent={cellContent}
            text={translateKey(cellContent, language)}
          />
          {!userCanBeDeleted && (
            <IconBtn
              onClick={onEditBtnClick}
              iconName={IconName.Pencil}
              ariaLabel={`${language.update} ${translateKey(id, language)}`}
            />
          )}
        </>
      )}
    </div>
  );
};

export default EditUserInput;
