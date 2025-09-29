import DateDisplay from '../../components/datePicker/DateDisplay';
import LabelValueGrid from '../../components/LabelValueGrid';
import SkeletonParagraph from '../../components/skeleton/SkeletonParagraph';
import useLanguage from '../../features/language/useLanguage';
import { useGetUserProfileQuery } from '../../features/profile/profileApiSlice';
import './_my-account.scss';

const MyAccountPage = () => {
  const { language } = useLanguage();
  const { data: profile, isLoading } = useGetUserProfileQuery();
  const notProvided = language.notProvided;
  return (
    <>
      {isLoading && <SkeletonParagraph />}
      <p>{language.verifyAndUpdateInfo}</p>

      {profile && (
        <div className="my-account">
          <LabelValueGrid text={language.name}>
            {profile.username}
          </LabelValueGrid>
          <LabelValueGrid text={language.phone}>
            {language.phoneInfo}
            {profile.phoneNo || notProvided}
          </LabelValueGrid>
          <LabelValueGrid text={language.fashionPreference}>
            {language[profile.preferredFashion]}
          </LabelValueGrid>
          <LabelValueGrid text={language.dateOfBirth}>
            {profile.dateOfBirth ? (
              <DateDisplay date={profile.dateOfBirth} />
            ) : (
              notProvided
            )}
          </LabelValueGrid>
          <LabelValueGrid text={language.email}>{profile.email}</LabelValueGrid>
        </div>
      )}
    </>
  );
};

export default MyAccountPage;
