import IconBtn from '../../components/IconBtn';
import EditTableInput from '../../components/sortTable/EditTableInput';
import { IconName } from '../../types/enums';
import { ChangeInputType } from '../../types/types';
import dateToLocaleMap from '../../utils/dates';
import useLanguage from '../language/useLanguage';

// type EditUserInputProps = {
//   showEditInput: boolean;
//   onEditChange: () => void;
// } & baseEditTableInput;

type EditCategoryInputProps = {
  cellContent: string;
  id: string;
  showEditInput: boolean;
  value: string;
  onCancel: () => void;
  onEditBtnClick: () => void;
  onEditChange: (event: ChangeInputType) => void;
  onSave: () => void;
};

const EditCategoryInput = ({
  id,
  showEditInput,
  onEditChange,
  value,
  onEditBtnClick,
  onCancel,
  onSave,
  cellContent,
}: EditCategoryInputProps) => {
  const { language, selectedLanguage } = useLanguage();
  const isCategoryName = id === 'categoryName';

  return (
    <div className="edit-cell">
      {showEditInput && (
        <EditTableInput
          id={id}
          onEditChange={onEditChange}
          value={value}
          cellContent={cellContent}
          onCancel={onCancel}
          onSave={onSave}
        />
      )}
      {!showEditInput && isCategoryName && (
        <>
          <span>{cellContent.toString()}</span>
          <IconBtn
            onClick={onEditBtnClick}
            iconName={IconName.Edit}
            title={language.pensil}
            ariaLabel={language.editUser}
          />
        </>
      )}
      {!showEditInput && !isCategoryName && (
        <span>
          {new Intl.DateTimeFormat(dateToLocaleMap[selectedLanguage], {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          }).format(new Date(cellContent))}
        </span>
      )}
    </div>
  );
};
export default EditCategoryInput;
