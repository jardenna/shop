import useAuth from '../../features/auth/hooks/useAuth';
import useLanguage from '../../features/language/useLanguage';

const MyAccountPage = () => {
  const { language } = useLanguage();
  const { currentUser } = useAuth();

  return (
    <>
      <h1>{language.myAccount}</h1>
      <div>
        <p>{currentUser?.username}</p>
        <p>{currentUser?.email}</p>
      </div>
    </>
  );
};

export default MyAccountPage;
