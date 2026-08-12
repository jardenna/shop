import { useNavigate } from 'react-router';
import type {
  AuthRequest,
  AuthResponse,
  UserResponse,
} from '../../../app/api/apiTypes/adminApiTypes';
import { useMessagePopup } from '../../../components/messagePopup/useMessagePopup';
import { useFormValidation } from '../../../hooks/useFormValidation';
import { ShopPath } from '../../../layout/nav/enums';
import { AutoComplete } from '../../../types/types';
import { handleApiError } from '../../../utils/handleApiError';
import { validateSignup } from '../../../utils/validation/validateCreateAccount';
import { useLanguage } from '../../language/useLanguage';
import AuthForm from './AuthForm';

interface CreateAccountProps {
  currentUser: UserResponse | null;
  isLoading: boolean;
  navigateTo: string;
  autoComplete?: AutoComplete;
  canAssignRoles?: boolean;
  createUser: (user: AuthRequest) => Promise<AuthResponse>;
}

type InitialState = AuthRequest & {
  confirmPassword: string;
};

const CreateAccount = ({
  navigateTo,
  currentUser,
  canAssignRoles,
  autoComplete,
  isLoading,
  createUser,
}: CreateAccountProps) => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const initialState: InitialState = {
    username: 'TestNewUser',
    email: 'testNew@mail.com',
    password: 'Test123!',
    confirmPassword: 'Test123!',
    role: 'User',
  };

  const { onAddMessagePopup } = useMessagePopup();

  const { values, errors, onChange, onBlur, isFocused, onFocus, onSubmit } =
    useFormValidation({
      initialState,
      callback: handleRegisterUser,
      validate: validateSignup,
    });

  async function handleRegisterUser() {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword, ...rest } = values;

      const result = await createUser({
        ...rest,
        role: rest.role,
      });

      if (result.success) {
        navigate(navigateTo);
      }
    } catch (error) {
      handleApiError(error, onAddMessagePopup);
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
      autoComplete={autoComplete}
    />
  );
};

export default CreateAccount;
