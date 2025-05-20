import { RoleTypes } from '../../../app/api/apiTypes';

import IconBtn from '../../../components/IconBtn';
import EditTableInput, {
  BaseEditTableInput,
} from '../../../components/sortTable/EditTableInput';
import { IconName } from '../../../types/enums';
import { getlowerCaseFirstLetter } from '../../../utils/utils';
import useLanguage from '../../language/useLanguage';
import RoleRadioBtn from './RoleRadioBtn';

type EditUserInputProps = {
  isAdmin: boolean;
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
            <RoleRadioBtn roleValue={roleValue} onChange={onEditChange} />
          }
        />
      ) : (
        <>
          <span>
            {!cellContent.includes('@') ? (
              getlowerCaseFirstLetter(cellContent, language)
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
