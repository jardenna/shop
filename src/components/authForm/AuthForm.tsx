import { useNavigate } from 'react-router';
import type { RoleTypes } from '../../app/api/apiTypes/adminApiTypes';
import useLanguage from '../../features/language/useLanguage';
import RoleRadioBtn from '../../features/users/RoleRadioBtn';
import type { KeyValuePair } from '../../hooks/useFormValidation';
import type { CreateAccountProps } from '../../pages/CreateAccount';
import { BtnVariant } from '../../types/enums';
import type {
  BlurEventType,
  ChangeInputType,
  FormEventType,
} from '../../types/types';
import Button from '../Button';
import FieldSet from '../fieldset/FieldSet';
import Form from '../form/Form';
import Input from '../formElements/Input';
import PasswordInput from '../formElements/password/PasswordInput';
import type { PasswordRulesProps } from '../formElements/password/PasswordPopupList';
import './_auth-form.scss';

type UserFields = {
  email: string;
  password: string;
  confirmPassword?: string;
  role?: RoleTypes;
  username?: string;
};

type AuthFormProps = CreateAccountProps & {
  errors: KeyValuePair<string>;
  isLoading: boolean;
  legendText: string;
  navigateToText: string;
  submitBtnLabel: string;
  values: UserFields;
  isFocused?: boolean;
  onBlur: (event: BlurEventType) => void;
  onChange: (event: ChangeInputType) => void;
  onFocus?: () => void;
  onSubmit: (event: FormEventType) => void;
  passwordRules?: (value: string) => PasswordRulesProps[];
};

const AuthForm = ({
  values,
  onSubmit,
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
  currentUser,
}: AuthFormProps) => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  return (
    <Form
      submitBtnLabel={submitBtnLabel}
      onSubmit={onSubmit}
      isLoading={isLoading}
      className="auth-form"
    >
      <FieldSet legendText={legendText} hideLegendText>
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
      {!currentUser && (
        <div className="auth-btn">
          <Button
            onClick={() => navigate(`/${navigateTo}`)}
            variant={BtnVariant.Ghost}
          >
            {navigateToText}
          </Button>
        </div>
      )}
      {currentUser?.isAdmin && values.role && (
        <RoleRadioBtn onChange={onChange} roleValue={values.role} />
      )}
    </Form>
  );
};

export default AuthForm;
