import Img from '../../components/Img';
import useAuth from '../../features/auth/hooks/useAuth';
import useLanguage from '../../features/language/useLanguage';
import FullSizePageContainer from '../pageContainer/FullSizePageContainer';

const MyAccount = () => {
  const { language } = useLanguage();
  const { currentUser } = useAuth();

  return (
    <FullSizePageContainer heading={language.myAccount}>
      <section className="flex">
        <div>
          <Img src="/images/about/woman.jpg" alt="" />
        </div>
        <div>
          <h1>{language.myAccount}</h1>

          <div>
            <p>{currentUser?.username}</p>
            <p>{currentUser?.email}</p>
          </div>
        </div>
      </section>
    </FullSizePageContainer>
  );
};

export default MyAccount;
