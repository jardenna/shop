import type { Roles } from '../../app/api/apiTypes/adminApiTypes';
import IconBtn from '../../components/IconBtn';
import EditTableInput, {
  BaseEditTableInput,
} from '../../components/sortTable/EditTableInput';
import EditTableText from '../../components/sortTable/EditTableText';
import { IconName } from '../../types/enums';
import { getlowerCaseFirstLetter } from '../../utils/utils';
import useLanguage from '../language/useLanguage';
import RoleRadioBtn from './RoleRadioBtn';

type EditUserInputProps = BaseEditTableInput & {
  allowedEditUser: boolean;
  isAdmin: boolean;
  roleValue: Roles;
  showEditInput: boolean;
  onEditBtnClick: () => void;
};

const EditUserInput = ({
  showEditInput,
  id,
  allowedEditUser,
  onEditChange,
  onSave,
  onCancel,
  value,
  cellContent,
  onEditBtnClick,
  isAdmin,
  roleValue,
}: EditUserInputProps) => {
  const { language } = useLanguage();

  return !allowedEditUser ? (
    <EditTableText
      cellContent={cellContent}
      text={getlowerCaseFirstLetter(cellContent, language)}
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
            text={getlowerCaseFirstLetter(cellContent, language)}
          />
          {!isAdmin && (
            <IconBtn
              onClick={onEditBtnClick}
              iconName={IconName.Pencil}
              title={language.pencil}
              ariaLabel={language.updateUser}
            />
          )}
        </>
      )}
    </div>
  );
};

export default EditUserInput;
