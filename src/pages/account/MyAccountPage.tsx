import useLanguage from '../../features/language/useLanguage';
import { useGetUserProfileQuery } from '../../features/profile/profileApiSlice';

const MyAccountPage = () => {
  const { language } = useLanguage();
  const { data: profile, isLoading } = useGetUserProfileQuery();

  console.log(profile, isLoading);

  return (
    <div>
      <p>{language.verifyAndUpdateInfo}</p>
      {/* <p>{currentUser?.username}</p>
      <p>{currentUser?.email}</p> */}
    </div>
  );
};

export default MyAccountPage;
