import { useLocation, useNavigate } from 'react-router';
import AuthForm from '../components/authForm/AuthForm';
import Button from '../components/Button';
import validateLogin from '../components/formElements/validation/validateLogin';
import useMessagePopup from '../components/messagePopup/useMessagePopup';
import { useLoginMutation } from '../features/auth/authApiSlice';
import useAuth from '../features/auth/hooks/useAuth';
import useLanguage from '../features/language/useLanguage';
import useFormValidation from '../hooks/useFormValidation';
import { ShopPath } from '../layout/nav/enums';
import MainPageContainer from './pageContainer/MainPageContainer';

const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [loginUser, { isLoading }] = useLoginMutation();
  const { onAddMessagePopup } = useMessagePopup();

  const { currentUser, isLoading: isUserLoading } = useAuth();
  const initialState = { email: '', password: '' };
  const from = location.state?.from?.pathname || ShopPath.Root;

  const { values, errors, onChange, onBlur, onSubmit } = useFormValidation({
    initialState,
    callback: handleLoginUser,
    validate: validateLogin,
  });

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

  // Show nothing (or a spinner) while we are checking auth from cookie
  if (isUserLoading) {
    return null;
  }

  return (
    <MainPageContainer heading={language.login} className="page-small">
      {currentUser?.username ? (
        <div>
          You are already logged in as {currentUser.username}
          <div>
            <Button
              onClick={() => {
                /* logout logic */
              }}
            >
              Log out
            </Button>
            <Button
              onClick={() => {
                /* switch account logic */
              }}
            >
              Switch account
            </Button>
            <Button onClick={() => navigate(ShopPath.CreateAccount)}>
              {language.createAccount}
            </Button>
          </div>
        </div>
      ) : (
        <AuthForm
          values={values}
          submitBtnLabel={language.login}
          onSubmit={onSubmit}
          isLoading={isLoading}
          legendText={language.userInfo}
          onChange={onChange}
          errors={errors}
          onBlur={onBlur}
          navigateTo={ShopPath.CreateAccount}
          navigateToText={language.createAccount}
        />
      )}
    </MainPageContainer>
  );
};

export default LoginPage;
