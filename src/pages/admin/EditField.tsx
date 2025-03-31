import { useMemo } from 'react';
import Input from '../../components/formElements/Input';
import IconBtn from '../../components/IconBtn';
import useLanguage from '../../features/language/useLanguage';
import { IconName } from '../../types/enums';

type EditFieldProps<T extends Record<string, any>> = {
  cellText: string;
  data: T[];
  id: string;
  labelText: string;
  onEditChange: any;
  showEditInput: boolean;
  value: string;
  onCancel: () => void;
  onEditBtnClick: () => void;
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
  const { language } = useLanguage();
  const categoryValue = useMemo(
    () => String(data.find((item) => item.id === id)?.[cellText] || ''),
    [data, id, cellText],
  );

  return showEditInput ? (
    <form
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
  ) : (
    <div>
      {categoryValue}
      {cellText === 'categoryName' && (
        <IconBtn
          onClick={onEditBtnClick}
          iconName={IconName.Edit}
          title={language.pensil}
          ariaLabel={language.editUser}
        />
      )}
    </div>
  );
};
export default EditField;
