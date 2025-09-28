import DateDisplay from '../../components/datePicker/DateDisplay';
import SkeletonParagraph from '../../components/skeleton/SkeletonParagraph';
import useLanguage from '../../features/language/useLanguage';
import { useGetUserProfileQuery } from '../../features/profile/profileApiSlice';

const MyAccountPage = () => {
  const { language } = useLanguage();
  const { data: profile, isLoading } = useGetUserProfileQuery();

  return (
    <div>
      {isLoading && <SkeletonParagraph />}
      <p>{language.verifyAndUpdateInfo}</p>
      {profile && (
        <>
          <p>{profile.username}</p>
          <p>{profile.email}</p>
          <p>{profile.preferredFashion}</p>
          <p>{profile.phoneNo}</p>
          <p>
            <DateDisplay date={profile.createdAt} />
          </p>
        </>
      )}
    </div>
  );
};

export default MyAccountPage;
