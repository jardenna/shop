import CreateAccount from '../features/auth/components/CreateAccount';
import { useAuth } from '../features/auth/hooks/useAuth';
import { ShopPath } from '../layout/nav/enums';
import MainPageContainer from './pageContainer/MainPageContainer';

const CreateAccountPage = () => {
  const { currentUser } = useAuth();

  return (
    <MainPageContainer heading="createAccount" className="page-small">
      <CreateAccount
        navigateTo={ShopPath.Root}
        currentUser={currentUser}
        autoComplete="on"
      />
    </MainPageContainer>
  );
};

export default CreateAccountPage;
