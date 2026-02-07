import { ReactElement } from 'react';
import useLanguage from '../../features/language/useLanguage';
import type { InputChangeHandler } from '../../types/types';
import Form from '../form/Form';
import Input from '../formElements/Input';

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
    <Form
      onSubmit={() => {
        onSave();
      }}
      onCancel={onCancel}
      submitBtnLabel={language.save}
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
      </div>
    </Form>
  );
};

export default EditTableInput;
