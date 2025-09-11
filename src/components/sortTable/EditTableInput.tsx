import { ReactElement } from 'react';
import useLanguage from '../../features/language/useLanguage';
import { BtnType, IconName } from '../../types/enums';
import type { InputChangeHandler } from '../../types/types';
import Input from '../formElements/Input';
import IconBtn from '../IconBtn';

export type BaseEditTableInput = {
  cellContent: string;
  id: string;
  onEditChange: InputChangeHandler;
  value: string;
  onCancel: () => void;
  onSave: () => void;
};

type EditTableInputProps = BaseEditTableInput & {
  alternativeInput?: ReactElement;
  isAlterntiveInput?: boolean;
};

const EditTableInput = ({
  id,
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
      onSubmit={(event) => {
        event.preventDefault();
        onSave();
      }}
    >
      <div className="edit-controls">
        {!isAlterntiveInput ? (
          <Input
            id={id}
            name={id}
            onChange={onEditChange}
            value={value}
            labelText={cellContent}
            inputHasNoLabel
            autoFocus
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
          btnType={BtnType.Submit}
        />
      </div>
    </form>
  );
};

export default EditTableInput;
