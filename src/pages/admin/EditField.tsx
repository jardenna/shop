import { useMemo } from 'react';
import Input from '../../components/formElements/Input';
import IconBtn from '../../components/IconBtn';
import useLanguage from '../../features/language/useLanguage';
import { IconName } from '../../types/enums';
import { ChangeInputType } from '../../types/types';
import dateToLocaleMap from '../../utils/dates';

type EditFieldProps<T extends Record<string, any>> = {
  cellText: string;
  data: T[];
  id: string;
  labelText: string;
  showEditInput: boolean;
  value: string;
  onCancel: () => void;
  onEditBtnClick: () => void;
  onEditChange: (event: ChangeInputType) => void;
  onSave: () => void;
};

const EditField = <T extends Record<string, any>>({
  data,
  id,
  cellText,
  showEditInput,
  onEditChange,
  value,
  onEditBtnClick,
  labelText,
  onCancel,
  onSave,
}: EditFieldProps<T>) => {
  const { language, selectedLanguage } = useLanguage();
  const isCategoryName = cellText === 'categoryName';
  const categoryCellContent = useMemo(
    () => String(data.find((item) => item.id === id)?.[cellText] || ''),
    [data, id, cellText],
  );

  return (
    <div className="edit-cell">
      {showEditInput && (
        <form
          className="edit-controls"
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <Input
            id={cellText}
            name={cellText}
            onChange={onEditChange}
            value={value}
            labelText={labelText}
            inputHasNoLabel
          />
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
      )}
      {!showEditInput && isCategoryName && (
        <>
          <span>{categoryCellContent}</span>
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
          }).format(new Date(categoryCellContent))}
        </span>
      )}
    </div>
  );
};
export default EditField;
