import { ReactElement } from 'react';
import useLanguage from '../../features/language/useLanguage';
import { IconName } from '../../types/enums';
import { ChangeInputType, InputType } from '../../types/types';
import Input from '../formElements/Input';
import IconBtn from '../IconBtn';

export type BaseEditTableInput = {
  cellContent: string;
  id: string;
  value: string;
  onCancel: () => void;
  onEditChange: (event: ChangeInputType) => void;
  onSave: () => void;
};

type EditTableInputProps = {
  alternativeInput?: ReactElement;
  inputType?: InputType;
  isAlterntiveInput?: boolean;
} & BaseEditTableInput;

const EditTableInput = ({
  id,
  inputType,
  value,
  cellContent,
  onCancel,
  onEditChange,
  onSave,
  isAlterntiveInput,
  alternativeInput,
}: EditTableInputProps) => {
  const { language } = useLanguage();

  return (
    <form
      className="edit-controls"
      onSubmit={(event) => {
        event.preventDefault();
        onSave();
      }}
    >
      {!isAlterntiveInput ? (
        <Input
          id={id}
          name={id}
          onChange={onEditChange}
          value={value}
          labelText={cellContent}
          type={inputType}
          inputHasNoLabel
        />
      ) : (
        alternativeInput
      )}

      <IconBtn
        onClick={onCancel}
        iconName={IconName.Close}
        title={language.cancel}
        ariaLabel={language.cancel}
        size="12"
      />

      <IconBtn
        iconName={IconName.Check}
        title="Check"
        ariaLabel={language.save}
        size="16"
        btnType="submit"
      />
    </form>
  );
};

export default EditTableInput;
