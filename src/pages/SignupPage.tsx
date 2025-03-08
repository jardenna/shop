/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { FC } from 'react';
import { useNavigate } from 'react-router';
import AuthForm from '../components/authForm/AuthForm';
import validationSignup from '../components/formElements/validation/validateSignup';
import useMessagePopup from '../components/messagePopup/useMessagePopup';
import { useSignupMutation } from '../features/auth/authApiSlice';
import useLanguage from '../features/language/useLanguage';
import useFormValidation from '../hooks/useFormValidation';
import { MainPath } from '../layout/nav/enums';
import passwordRules from '../utils/passwordRules';

const SignupPage: FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const initialState = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const { addMessagePopup } = useMessagePopup();

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
      console.log(rest);

      if (result.success) {
        navigate(MainPath.Root);
      }
    } catch (error: any) {
      addMessagePopup({
        messagePopupType: 'error',
        message: error.data.message,
        componentType: 'notification',
      });
    }
  }

  return (
    <AuthForm
      values={values}
      labelText={language.signup}
      onSubmit={onSubmit}
      isLoading={isLoading}
      legendText={language.userInfo}
      onChange={onChange}
      errors={errors}
      onBlur={onBlur}
      passwordRules={passwordRules}
      isFocused={isFocused}
      onFocus={onFocus}
    />
  );
};
export default SignupPage;
