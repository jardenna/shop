import useAuth from '../../features/auth/hooks/useAuth';
import useLanguage from '../../features/language/useLanguage';
import { AdminPath } from '../../layout/nav/enums';
import PageContainer from '../pageContainer/PageContainer';
import RegisterUser from '../RegisterUser';

const CreateUserPage = () => {
  const { language } = useLanguage();
  const { currentUser } = useAuth();

  return (
    <article className="page page-small">
      <PageContainer heading={language.createNewUser}>
        <RegisterUser navigateTo={AdminPath.Users} currentUser={currentUser} />
      </PageContainer>
    </article>
  );
};

export default CreateUserPage;
