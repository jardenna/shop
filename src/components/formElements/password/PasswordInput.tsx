import { useState } from 'react';
import useLanguage from '../../../features/language/useLanguage';
import { IconName } from '../../../types/enums';
import IconBtn from '../../IconBtn';
import type { InputProps } from '../Input';
import Input from '../Input';
import './_password-input.scss';
import type { PasswordRulesProps } from './PasswordPopupList';
import PasswordPopupList from './PasswordPopupList';

type OmittedInputProps = Omit<
  InputProps,
  'checked' | 'min' | 'max' | 'maxLength' | 'multiple'
>;

type PasswordInputProps = OmittedInputProps & {
  isFocused?: boolean;
  passwordRules?: (value: string) => PasswordRulesProps[];
};

const PasswordInput = ({
  value,
  id,
  onChange,
  errorText,
  onBlur,
  labelText,
  name,
  inputHasNoLabel,
  ref,
  autoComplete,
  autoFocus,
  required,
  passwordRules,
  isFocused,
  onFocus,
}: PasswordInputProps) => {
  const { language } = useLanguage();
  const [showPassword, setShowPassword] = useState(true);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="password-input-container">
      {passwordRules && isFocused && (
        <PasswordPopupList
          passwordRules={passwordRules}
          inputValue={String(value)}
        />
      )}
      <Input
        id={id}
        labelText={labelText}
        name={name}
        onChange={onChange}
        value={value}
        errorText={errorText}
        onBlur={onBlur}
        type={!showPassword ? 'text' : 'password'}
        inputHasNoLabel={inputHasNoLabel}
        ref={ref}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        required={required}
        onFocus={onFocus}
      />
      {!!value && (
        <IconBtn
          onClick={handleShowPassword}
          className="toggle-icon-btn"
          iconName={showPassword ? IconName.EyeOff : IconName.Eye}
          title={showPassword ? language.eyeClosed : language.eye}
          ariaLabel={
            showPassword ? language.showPassword : language.hidePassword
          }
        />
      )}
    </div>
  );
};

export default PasswordInput;
