import { FC } from 'react';

import useLanguage from '../../features/language/useLanguage';
import { KeyValuePair } from '../../hooks/useFormValidation';
import {
  BlurEventType,
  ChangeInputType,
  FormEventType,
} from '../../types/types';
import Form from '../formElements/form/Form';
import Input from '../formElements/Input';
import PasswordInput from '../formElements/password/PasswordInput';
import { PasswordRulesProps } from '../formElements/password/PasswordPopupList';
import VisuallyHidden from '../VisuallyHidden';
import './_auth-form.scss';

export interface User {
  email: string;
  password: string;
  confirmPassword?: string;
  username?: string;
}

interface AuthFormProps {
  errors: KeyValuePair<string>;
  isLoading: boolean;
  labelText: string;
  legendText: string;
  values: User;
  isFocused?: boolean;
  onBlur: (event: BlurEventType) => void;
  onChange: (event: ChangeInputType) => void;
  onFocus?: () => void;
  onSubmit: (event: FormEventType) => void;
  passwordRules?: (value: string) => PasswordRulesProps[];
}

const AuthForm: FC<AuthFormProps> = ({
  values,
  onSubmit,
  isLoading,
  onChange,
  labelText,
  legendText,
  errors,
  onBlur,
  passwordRules,
  isFocused,
  onFocus,
}) => {
  const { language } = useLanguage();

  return (
    <Form
      labelText={labelText}
      onSubmit={onSubmit}
      isLoading={isLoading}
      className="auth-form"
    >
      <fieldset className="flex column">
        <VisuallyHidden as="legend">{legendText}</VisuallyHidden>
        {values.username !== undefined && (
          <Input
            name="username"
            id="username"
            value={values.username}
            labelText={language.username}
            onChange={onChange}
            required
            errorText={language[errors.username]}
            onBlur={onBlur}
          />
        )}
        <Input
          name="email"
          id="email"
          value={values.email}
          labelText={language.email}
          onChange={onChange}
          required
          errorText={language[errors.email]}
          onBlur={onBlur}
        />
        <PasswordInput
          name="password"
          id="password"
          value={values.password}
          labelText={language.password}
          onChange={onChange}
          required
          passwordRules={passwordRules}
          onFocus={onFocus}
          isFocused={isFocused}
          onBlur={onBlur}
          errorText={language[errors.password]}
        />
        {values.confirmPassword !== undefined && (
          <PasswordInput
            name="confirmPassword"
            id="confirmPassword"
            value={values.confirmPassword}
            labelText={language.confirmPassword}
            onChange={onChange}
            required
            errorText={language[errors.confirmPassword]}
            onBlur={onBlur}
          />
        )}
      </fieldset>
    </Form>
  );
};

export default AuthForm;
