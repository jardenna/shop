import { FC } from 'react';

import { useNavigate } from 'react-router';
import useLanguage from '../../features/language/useLanguage';
import { KeyValuePair } from '../../hooks/useFormValidation';
import { MainPath } from '../../layout/nav/enums';
import { BtnVariant } from '../../types/enums';
import {
  BlurEventType,
  ChangeInputType,
  FormEventType,
} from '../../types/types';
import Button from '../Button';
import FieldSet from '../fieldset/FieldSet';
import Form from '../formElements/form/Form';
import Input from '../formElements/Input';
import PasswordInput from '../formElements/password/PasswordInput';
import { PasswordRulesProps } from '../formElements/password/PasswordPopupList';
import './_auth-form.scss';

export interface User {
  email: string;
  password: string;
  confirmPassword?: string;
  username?: string;
}

interface AuthFormProps {
  errors: KeyValuePair<string>;
  heading: string;
  isLoading: boolean;
  legendText: string;
  navigateTo: MainPath;
  navigateToText: string;
  submitBtnLabel: string;
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
  heading,
  isLoading,
  onChange,
  submitBtnLabel,
  navigateTo,
  legendText,
  errors,
  onBlur,
  passwordRules,
  isFocused,
  onFocus,
  navigateToText,
}) => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  return (
    <>
      <h1>{heading}</h1>
      <Form
        submitBtnLabel={submitBtnLabel}
        onSubmit={onSubmit}
        isLoading={isLoading}
        className="auth-form"
      >
        <FieldSet legendText={legendText}>
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
        </FieldSet>
        <div className="auth-btn">
          <Button
            onClick={() => navigate(`/${navigateTo}`)}
            variant={BtnVariant.Ghost}
          >
            {navigateToText}
          </Button>
        </div>
      </Form>
    </>
  );
};

export default AuthForm;
