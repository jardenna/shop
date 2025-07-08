import { useNavigate } from 'react-router';
import type {
  AuthRequest,
  RoleTypes,
  UserResponse,
} from '../app/api/apiTypes/adminApiTypes';
import AuthForm from '../components/authForm/AuthForm';
import validateSignup from '../components/formElements/validation/validateSignup';
import useMessagePopup from '../components/messagePopup/useMessagePopup';
import { useSignupMutation } from '../features/auth/authApiSlice';
import useLanguage from '../features/language/useLanguage';
import useFormValidation from '../hooks/useFormValidation';
import { ShopPath } from '../layout/nav/enums';
import passwordRules from '../utils/passwordRules';

export type RegisterUserProps = {
  navigateTo: string;
  currentUser?: UserResponse;
};

export type InitialState = AuthRequest & {
  confirmPassword: string;
};

const RegisterUser = ({ navigateTo, currentUser }: RegisterUserProps) => {
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
      values={values}
      submitBtnLabel={language.createAccount}
      onSubmit={onSubmit}
      isLoading={isLoading}
      legendText={language.userInfo}
      onChange={onChange}
      errors={errors}
      onBlur={onBlur}
      passwordRules={passwordRules}
      isFocused={isFocused}
      onFocus={onFocus}
      navigateTo={ShopPath.Login}
      navigateToText={language.loginHere}
      currentUser={currentUser}
    />
  );
};

export default RegisterUser;
