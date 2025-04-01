import { ReactElement } from 'react';
import useLanguage from '../../features/language/useLanguage';
import { IconName } from '../../types/enums';
import { ChangeInputType, InputType } from '../../types/types';
import Input from '../formElements/Input';
import IconBtn from '../IconBtn';

export type baseEditTableInput = {
  id: string;
  inputLabel: string;
  value: string;
  onCancel: () => void;
  onChange: (event: ChangeInputType) => void;
  onSave: () => void;
};

type EditTableInputProps = {
  alternativeInput?: ReactElement;
  inputType?: InputType;
  isAlterntiveInput?: boolean;
} & baseEditTableInput;

const EditTableInput = ({
  id,
  inputType,
  value,
  inputLabel,
  onCancel,
  onChange,
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
      }}
    >
      {!isAlterntiveInput ? (
        <Input
          id={id}
          name={id}
          onChange={onChange}
          value={value}
          labelText={inputLabel}
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
        onClick={onSave}
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
