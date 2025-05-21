import { useNavigate } from 'react-router';
import { AuthRequest, RoleTypes, UserResponse } from '../app/api/apiTypes';
import AuthForm from '../components/authForm/AuthForm';
import validateSignup from '../components/formElements/validation/validateSignup';
import useMessagePopup from '../components/messagePopup/useMessagePopup';
import { useSignupMutation } from '../features/auth/authApiSlice';
import useLanguage from '../features/language/useLanguage';
import useFormValidation from '../hooks/useFormValidation';
import { MainPath } from '../layout/nav/enums';
import passwordRules from '../utils/passwordRules';

export type RegisterUserProps = {
  navigateTo: string;
  currentUser?: UserResponse;
  heading?: string;
};

export type InitialState = AuthRequest & {
  confirmPassword: string;
};

const RegisterUser = ({
  navigateTo,
  heading,
  currentUser,
}: RegisterUserProps) => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const initialState: InitialState = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'User',
  };

  const { onAddMessagePopup } = useMessagePopup();

  const { values, errors, onChange, onBlur, isFocused, onFocus, onSubmit } =
    useFormValidation({
      initialState,
      callback: handleRegisterUser,
      validate: validateSignup,
    });

  const [registerUser, { isLoading }] = useSignupMutation();

  async function handleRegisterUser() {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword, ...rest } = values;

      const result = await registerUser({
        ...rest,
        role: rest.role as RoleTypes,
      }).unwrap();

      if (result.success) {
        navigate(navigateTo);
      }
    } catch (error: any) {
      onAddMessagePopup({
        messagePopupType: 'error',
        message: error.data.message,
        componentType: 'notification',
      });
    }
  }

  return (
    <AuthForm
      heading={heading}
      values={values}
      submitBtnLabel={language.signup}
      onSubmit={onSubmit}
      isLoading={isLoading}
      legendText={language.userInfo}
      onChange={onChange}
      errors={errors}
      onBlur={onBlur}
      passwordRules={passwordRules}
      isFocused={isFocused}
      onFocus={onFocus}
      navigateTo={MainPath.Login}
      navigateToText={language.loginHere}
      currentUser={currentUser}
    />
  );
};

export default RegisterUser;
