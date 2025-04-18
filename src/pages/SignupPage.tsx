import { useNavigate } from 'react-router';
import AuthForm from '../components/authForm/AuthForm';
import validationSignup from '../components/formElements/validation/validateSignup';
import useMessagePopup from '../components/messagePopup/useMessagePopup';
import { useSignupMutation } from '../features/auth/authApiSlice';
import useLanguage from '../features/language/useLanguage';
import useFormValidation from '../hooks/useFormValidation';
import { MainPath } from '../layout/nav/enums';
import passwordRules from '../utils/passwordRules';

const SignupPage = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const initialState = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const { onAddMessagePopup } = useMessagePopup();

  const { values, errors, onChange, onBlur, isFocused, onFocus, onSubmit } =
    useFormValidation({
      initialState,
      callback: handleRegisterUser,
      validate: validationSignup,
    });

  const [registerUser, { isLoading }] = useSignupMutation();

  async function handleRegisterUser() {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword, ...rest } = values;

      const result = await registerUser(rest).unwrap();

      if (result.success) {
        navigate(MainPath.Root);
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
      heading={language.signup}
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
  );
};

export default SignupPage;
