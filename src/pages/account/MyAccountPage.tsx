import DateDisplay from '../../components/datePicker/DateDisplay';
import LabelValueGrid from '../../components/LabelValueGrid';
import SkeletonParagraph from '../../components/skeleton/SkeletonParagraph';
import useLanguage from '../../features/language/useLanguage';
import { useGetUserProfileQuery } from '../../features/profile/profileApiSlice';
import './_my-account.scss';

const MyAccountPage = () => {
  const { language } = useLanguage();
  const { data: profile, isLoading } = useGetUserProfileQuery();

  return (
    <>
      {isLoading && <SkeletonParagraph />}
      <p>{language.verifyAndUpdateInfo}</p>

      {profile && (
        <div className="my-account">
          <LabelValueGrid text={language.name}>
            {profile.username}
          </LabelValueGrid>
          <LabelValueGrid text="Mobil">
            {profile.phoneNo || 'Ikke oplyst'}
          </LabelValueGrid>
          <LabelValueGrid text="Din foretrukne mode">
            {language[profile.preferredFashion]}
          </LabelValueGrid>
          <LabelValueGrid text="Fødselsdag">
            {profile.dateOfBirth ? (
              <DateDisplay date={profile.dateOfBirth} />
            ) : (
              'Ikke oplyst'
            )}
          </LabelValueGrid>
          <LabelValueGrid text="Email">{profile.email}</LabelValueGrid>
        </div>
      )}
    </>
  );
};

export default MyAccountPage;
