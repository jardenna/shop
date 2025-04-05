import IconBtn from '../../components/IconBtn';
import EditTableInput, {
  BaseEditTableInput,
} from '../../components/sortTable/EditTableInput';
import { IconName } from '../../types/enums';
import dateToLocaleMap from '../../utils/dates';
import useLanguage from '../language/useLanguage';
import DateDisplay from './DateDisplay'; // Import the new child component

type EditCategoryInputProps = {
  showEditInput: boolean;
  onEditBtnClick: () => void;
} & BaseEditTableInput;

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
        <DateDisplay
          cellContent={cellContent}
          locale={dateToLocaleMap[selectedLanguage]}
        />
      )}
    </div>
  );
};
export default EditCategoryInput;
