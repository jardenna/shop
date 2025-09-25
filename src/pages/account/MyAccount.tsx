import Img from '../../components/Img';
import useAuth from '../../features/auth/hooks/useAuth';
import useLanguage from '../../features/language/useLanguage';
import LayoutElement from '../../layout/LayoutElement';
import FullSizePageContainer from '../pageContainer/FullSizePageContainer';

const MyAccount = () => {
  const { language } = useLanguage();
  const { currentUser } = useAuth();

  return (
    <FullSizePageContainer heading={language.myAccount}>
      <section className="account">
        <div className="test">
          <LayoutElement as="nav" ariaLabel="brugerkonto">
            <ul className="nav">
              <li>Personlige oplysninger</li>
              <li>Adresser</li>
              <li>Ordrer</li>
            </ul>
          </LayoutElement>
          <div className="content-test">
            <h1>{language.myAccount}</h1>

            <div>
              <p>{currentUser?.username}</p>
              <p>{currentUser?.email}</p>
            </div>
          </div>
        </div>
        <div className="img-wrapper">
          <Img src="/images/about/woman.jpg" alt="" />
        </div>
      </section>
    </FullSizePageContainer>
  );
};

export default MyAccount;
