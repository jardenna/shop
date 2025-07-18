import { ChangeEvent } from 'react';
import { IconName } from '../../types/enums';
import type {
  BlurEventType,
  ChangeInputType,
  InputType,
  refInputType,
} from '../../types/types';
import FormLabel from './FormLabel';
import InputInfo from './InputInfo';

export type InputProps = {
  id: string;
  labelText: string;
  name: string;
  value: string | number;
  autoComplete?: string;
  autoFocus?: boolean;
  checked?: boolean;
  className?: string;
  disabled?: boolean;
  errorText?: string;
  iconName?: IconName;
  inputHasNoLabel?: boolean;
  inputInfo?: string;
  inputSuffix?: string;
  max?: number;
  maxLength?: number;
  min?: number;
  multiple?: boolean;
  placeholder?: string;
  ref?: refInputType;
  required?: boolean;
  type?: InputType;
  onBlur?: (event: BlurEventType) => void;
  onChange: (event: ChangeInputType) => void;
  onFocus?: () => void;
};

const Input = ({
  id,
  ref,
  type,
  required,
  labelText,
  name,
  value,
  inputHasNoLabel,
  checked,
  className = '',
  errorText,
  onChange,
  onBlur,
  min,
  multiple,
  max,
  inputSuffix,
  placeholder,
  maxLength,
  autoComplete,
  autoFocus,
  onFocus,
  disabled,
  iconName,
  inputInfo,
}: InputProps) => {
  const inputClassName =
    type === 'checkbox' || type === 'radio'
      ? 'checkbox-radio-container'
      : 'input-container';
  const handleOnInput = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    if (maxLength && inputValue.length > maxLength) {
      // eslint-disable-next-line no-param-reassign
      event.target.value = inputValue.slice(0, maxLength);
    }
  };
  return (
    <>
      <div className={inputClassName}>
        <FormLabel
          required={required}
          labelText={labelText}
          id={id}
          inputHasNoLabel={inputHasNoLabel}
          errorText={errorText}
          iconName={iconName}
        />
        <input
          ref={ref}
          multiple={multiple}
          type={type || 'text'}
          name={name}
          checked={checked}
          onChange={onChange}
          className={className}
          value={value}
          autoFocus={autoFocus}
          id={id}
          aria-disabled={disabled}
          aria-invalid={errorText ? true : undefined}
          aria-required={required && !disabled}
          aria-errormessage={errorText ? `err-${id}` : undefined}
          onBlur={onBlur}
          placeholder={placeholder}
          min={min}
          max={max}
          autoComplete={autoComplete}
          onInput={handleOnInput}
          onFocus={onFocus}
          disabled={disabled}
        />
        {inputSuffix && <span className="input-suffix">{inputSuffix}</span>}
      </div>
      {inputInfo && <InputInfo inputInfo={inputInfo} />}
    </>
  );
};

export default Input;
