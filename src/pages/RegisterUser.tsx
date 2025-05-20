import { useNavigate } from 'react-router';
import AuthForm from '../components/authForm/AuthForm';
import validateSignup from '../components/formElements/validation/validateSignup';
import useMessagePopup from '../components/messagePopup/useMessagePopup';
import RoleRadioBtn from '../features/admin/users/RoleRadioBtn';
import { useSignupMutation } from '../features/auth/authApiSlice';
import useLanguage from '../features/language/useLanguage';
import useFormValidation from '../hooks/useFormValidation';
import { MainPath } from '../layout/nav/enums';
import passwordRules from '../utils/passwordRules';

export type RegisterUserProps = {
  navigateTo: string;
  heading?: string;
  hideAuthBtn?: boolean;
};

const RegisterUser = ({
  navigateTo,
  heading,
  hideAuthBtn,
}: RegisterUserProps) => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const initialState = {
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

      const result = await registerUser({ user: rest, isAdmin: true }).unwrap();

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
    <>
      <AuthForm
        hideAuthBtn={hideAuthBtn}
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
      />
      <RoleRadioBtn onChange={onChange} roleValue={values.role} />
    </>
  );
};

export default RegisterUser;
