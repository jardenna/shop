import SkeletonParagraph from '../../components/skeleton/SkeletonParagraph';
import useLanguage from '../../features/language/useLanguage';
import { useGetUserProfileQuery } from '../../features/profile/profileApiSlice';
import './_my-account.scss';
import AccountForm from './AccountForm';
import AccountInfoList from './AccountInfoList';

const MyAccountPage = () => {
  const { language } = useLanguage();
  const { data: profile, isLoading } = useGetUserProfileQuery();

  return (
    <>
      {isLoading && <SkeletonParagraph />}
      <p>{language.verifyAndUpdateInfo}</p>

      {profile && (
        <div className="my-account">
          <AccountInfoList profile={profile} />
          <AccountForm profile={profile} />
        </div>
      )}
    </>
  );
};

export default MyAccountPage;
