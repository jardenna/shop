import useLanguage from '../../features/language/useLanguage';
import { MainPath } from '../../layout/nav/enums';
import PageContainer from '../PageContainer';
import RegisterUser from '../RegisterUser';

const CreateUserPage = () => {
  const { language } = useLanguage();

  return (
    <article className="page">
      <PageContainer heading={language.createNewUser}>
        <RegisterUser navigateTo={MainPath.Users} hideAuthBtn />
      </PageContainer>
    </article>
  );
};

export default CreateUserPage;
