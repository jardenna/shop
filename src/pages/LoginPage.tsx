import { useLocation, useNavigate, useSearchParams } from 'react-router';
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
  const { currentUser, isLoading: isUserLoading, logout } = useAuth();
  const initialState = { email: '', password: '' };
  const from = location.state?.from?.pathname || ShopPath.Root;
  const [searchParams, setSearchParams] = useSearchParams();
  const paramKey = 'mode';

  const handleSwitchAccount = () => {
    searchParams.set(paramKey, 'switchUser');
    setSearchParams(searchParams);
  };

  const mode = searchParams.get(paramKey);

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

  if (isUserLoading) {
    return null;
  } // or a skeleton/loading spinner

  let heading = language.login;

  if (currentUser) {
    if (mode) {
      heading = language[mode];
    } else {
      heading = language.alreadyLoggedIn;
    }
  }
  return (
    <MainPageContainer heading={heading} className="page-small">
      {currentUser && !mode ? (
        <div>
          {language.alreadyLoggedInAs} {currentUser.username}
          <div>
            <Button
              onClick={() => {
                logout();
              }}
            >
              {language.logout}
            </Button>
            <Button onClick={handleSwitchAccount}>{language.switchUser}</Button>
            <Button onClick={() => navigate(`/${ShopPath.CreateAccount}`)}>
              {language.createNewAccount}
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
