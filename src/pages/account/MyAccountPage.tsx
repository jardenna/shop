import DateDisplay from '../../components/datePicker/DateDisplay';
import GridTwoCol from '../../components/GridTwoCol';
import SkeletonParagraph from '../../components/skeleton/SkeletonParagraph';
import useLanguage from '../../features/language/useLanguage';
import { useGetUserProfileQuery } from '../../features/profile/profileApiSlice';

const MyAccountPage = () => {
  const { language } = useLanguage();
  const { data: profile, isLoading } = useGetUserProfileQuery();

  return (
    <div>
      {isLoading && <SkeletonParagraph />}
      <div>{language.verifyAndUpdateInfo}</div>

      {profile && (
        <div>
          <GridTwoCol text={language.name}>{profile.username}</GridTwoCol>
          <GridTwoCol text="Mobil">
            {profile.phoneNo || 'Ikke oplyst'}
          </GridTwoCol>
          <GridTwoCol text="Din foretrukne mode">
            {language[profile.preferredFashion] || 'Ikke oplyst'}
          </GridTwoCol>
          <GridTwoCol text="Fødselsdag">
            <DateDisplay date={profile.createdAt} />
          </GridTwoCol>
          <GridTwoCol text="Email">{profile.email}</GridTwoCol>
        </div>
      )}
    </div>
  );
};

export default MyAccountPage;
