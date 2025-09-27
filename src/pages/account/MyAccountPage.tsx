import useAuth from '../../features/auth/hooks/useAuth';
import useLanguage from '../../features/language/useLanguage';

const MyAccountPage = () => {
  const { language } = useLanguage();
  const { currentUser } = useAuth();

  return (
    <div>
      <p>{language.verifyAndUpdateInfo}</p>
      <p>{currentUser?.username}</p>
      <p>{currentUser?.email}</p>
    </div>
  );
};

export default MyAccountPage;
