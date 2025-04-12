import DateDisplay from '../../components/datePicker/DateDisplay'; // Import the new child component
import IconBtn from '../../components/IconBtn';
import EditTableInput, {
  BaseEditTableInput,
} from '../../components/sortTable/EditTableInput';
import { IconName } from '../../types/enums';
import useLanguage from '../language/useLanguage';

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
  const { language } = useLanguage();
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
      {!showEditInput && !isCategoryName && <DateDisplay date={cellContent} />}
    </div>
  );
};
export default EditCategoryInput;
