import { ErrorBoundary } from 'react-error-boundary';
import { useLocation, useNavigate, useSearchParams } from 'react-router';
import Button from '../components/Button';
import ErrorBoundaryFallback from '../components/ErrorBoundaryFallback';
import { useMessagePopup } from '../components/messagePopup/useMessagePopup';
import { useLoginMutation } from '../features/auth/authApiSlice';
import AlreadyLoggedIn from '../features/auth/components/AlreadyLoggedIn';
import AuthForm from '../features/auth/components/AuthForm';
import { useAuth } from '../features/auth/hooks/useAuth';
import { useAddToCartMutation } from '../features/cart/cartApiSlice';
import { cartStorageUtil } from '../features/cart/utils/cartStorageUtil';
import { useLanguage } from '../features/language/useLanguage';
import { useFormValidation } from '../hooks/useFormValidation';
import { ShopPath } from '../layout/nav/enums';
import { BtnVariant } from '../types/enums';
import { handleApiError } from '../utils/handleApiError';
import { validateLogin } from '../utils/validation/validateLogin';
import MainPageContainer from './pageContainer/MainPageContainer';

const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [loginUser, { isLoading }] = useLoginMutation();
  const { onAddMessagePopup } = useMessagePopup();
  const {
    currentUser,
    isLoading: isUserLoading,
    logout,
    isAuthReady,
    onReset,
  } = useAuth();
  // const initialState = { email: '', password: '' };
  const initialState = { email: 'helle@mail.com', password: 'Helle123!' };
  const from = location.state?.from?.pathname || ShopPath.Root;
  const [searchParams, setSearchParams] = useSearchParams();
  const paramKey = 'mode';
  const [syncCart] = useAddToCartMutation();
  const cartList = cartStorageUtil.load();

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
        if (cartList.length > 0) {
          await syncCart(cartList).unwrap();

          cartStorageUtil.clear();
        }

        navigate(from, { replace: true });
      }
    } catch (error) {
      handleApiError(error, onAddMessagePopup);
    }
  }

  if (isUserLoading) {
    return null;
  }

  let heading = 'login';

  if (currentUser) {
    if (mode) {
      heading = mode;
    } else {
      heading = 'alreadyLoggedIn';
    }
  }

  return (
    <MainPageContainer heading={language[heading]} variant="small">
      <ErrorBoundary
        FallbackComponent={ErrorBoundaryFallback}
        onReset={() => onReset()}
      >
        {currentUser && isAuthReady && !mode ? (
          <AlreadyLoggedIn
            onSwitchAccount={handleSwitchAccount}
            navigate={navigate}
            language={language}
            username={currentUser.username}
          >
            <Button
              variant={BtnVariant.Secondary}
              onClick={() => {
                logout();
              }}
            >
              {language.logout}
            </Button>
          </AlreadyLoggedIn>
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
            autoComplete="on"
          />
        )}
      </ErrorBoundary>
    </MainPageContainer>
  );
};

export default LoginPage;
