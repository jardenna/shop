import { useNavigate } from 'react-router';
import type {
  AuthRequest,
  Roles,
  UserResponse,
} from '../app/api/apiTypes/adminApiTypes';
import validateSignup from '../components/formElements/validation/validateCreateAccount';
import useMessagePopup from '../components/messagePopup/useMessagePopup';
import { useCreateAccountMutation } from '../features/auth/authApiSlice';
import AuthForm from '../features/auth/components/AuthForm';
import useLanguage from '../features/language/useLanguage';
import useFormValidation from '../hooks/useFormValidation';
import { ShopPath } from '../layout/nav/enums';

export type CreateAccountProps = {
  navigateTo: string;
  canAssignRoles?: boolean;
  currentUser?: UserResponse;
};

export type InitialState = AuthRequest & {
  confirmPassword: string;
};

const CreateAccount = ({
  navigateTo,
  currentUser,
  canAssignRoles,
}: CreateAccountProps) => {
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
      callback: handleCreateAccount,
      validate: validateSignup,
    });

  const [registerUser, { isLoading }] = useCreateAccountMutation();

  async function handleCreateAccount() {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword, ...rest } = values;

      const result = await registerUser({
        ...rest,
        role: rest.role as Roles,
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
      showPopUpRules={isFocused}
      onFocus={onFocus}
      navigateTo={ShopPath.Login}
      navigateToText={language.loginHere}
      currentUser={currentUser}
      canAssignRoles={canAssignRoles}
    />
  );
};

export default CreateAccount;
