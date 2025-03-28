import useLanguage from '../../features/language/useLanguage';
import { IconName } from '../../types/enums';
import { ChangeInputType } from '../../types/types';
import Input from '../formElements/Input';
import RadioButton from '../formElements/radioButton/RadioButton';
import IconBtn from '../IconBtn';

type EditTableCellProps = {
  id: string;
  isAdmin: boolean;
  labelText: string;
  roleOptions: any;
  roleValue: any;
  showEditInput: boolean;
  value: string;
  onCancel: () => void;
  onChange: (event: ChangeInputType) => void;
  onEdit: () => void;
  onSave: () => void;
};

const EditTableCell = ({
  showEditInput,
  id,
  onChange,
  onSave,
  onCancel,
  value,
  labelText,
  onEdit,
  isAdmin,
  roleOptions,
  roleValue,
}: EditTableCellProps) => {
  const { language } = useLanguage();

  return (
    <div className="edit-cell">
      {showEditInput ? (
        <div className="edit-controls">
          {id !== 'role' ? (
            <Input
              id={id}
              name={id}
              onChange={onChange}
              value={value}
              labelText={labelText}
              inputHasNoLabel
            />
          ) : (
            <RadioButton
              radioButtonList={roleOptions}
              name="role"
              initialChecked={roleValue}
              onChange={onChange}
            />
          )}

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
          />
        </div>
      ) : (
        <>
          <span>
            {!labelText.includes('@') ? (
              labelText
            ) : (
              <a href={`mailto:${labelText}`}>{labelText}</a>
            )}
          </span>
          {!isAdmin && (
            <IconBtn
              onClick={onEdit}
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

export default EditTableCell;
