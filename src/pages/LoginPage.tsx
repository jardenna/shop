import { useLocation, useNavigate } from 'react-router';
import AuthForm from '../components/authForm/AuthForm';
import validateLogin from '../components/formElements/validation/validateLogin';
import useMessagePopup from '../components/messagePopup/useMessagePopup';
import { useLoginMutation } from '../features/auth/authApiSlice';
import useLanguage from '../features/language/useLanguage';
import useFormValidation from '../hooks/useFormValidation';
import { MainPath } from '../layout/nav/enums';
import MainPageContainer from './pageContainer/MainPageContainer';

const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { language } = useLanguage();

  const initialState = {
    email: '',
    password: '',
  };

  const { onAddMessagePopup } = useMessagePopup();
  const from = location.state?.from?.pathname || MainPath.Root;

  const { values, errors, onChange, onBlur, onSubmit } = useFormValidation({
    initialState,
    callback: handleLoginUser,
    validate: validateLogin,
  });
  const [loginUser, { isLoading }] = useLoginMutation();

  async function handleLoginUser() {
    try {
      const result = await loginUser(values).unwrap();
      if (result.success) {
        navigate(from, { replace: true });
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
    <MainPageContainer heading={language.login} className="page-small">
      <AuthForm
        values={values}
        submitBtnLabel={language.login}
        onSubmit={onSubmit}
        isLoading={isLoading}
        legendText={language.userInfo}
        onChange={onChange}
        errors={errors}
        onBlur={onBlur}
        navigateTo={MainPath.Signup}
        navigateToText={language.createAccount}
      />
    </MainPageContainer>
  );
};

export default LoginPage;
