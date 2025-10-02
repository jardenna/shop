import type { BaseProfile } from '../../app/api/apiTypes/shopApiTypes';
import SkeletonParagraph from '../../components/skeleton/SkeletonParagraph';
import useLanguage from '../../features/language/useLanguage';
import { useGetUserProfileQuery } from '../../features/profile/profileApiSlice';
import type { InputType } from '../../types/types';
import './_my-account.scss';
import AccountForm from './AccountForm';
import AccountInfoList from './AccountInfoList';

export type ProfileList = {
  label: string;
  name: keyof BaseProfile;
  tooltip?: boolean;
  type?: InputType;
};

const MyAccountPage = () => {
  const { language } = useLanguage();
  const { data: profile, isLoading } = useGetUserProfileQuery();

  const profileList: ProfileList[] = [
    {
      name: 'username',
      label: 'name',
    },
    {
      name: 'dateOfBirth',
      type: 'date',
      label: 'dateOfBirth',
    },
    {
      name: 'email',
      label: 'email',
      type: 'email',
    },
    {
      name: 'phoneNo',
      label: 'phone',
      type: 'number',
      tooltip: true,
    },
  ];

  return (
    <>
      {isLoading && <SkeletonParagraph />}
      <p>{language.verifyAndUpdateInfo}</p>

      {profile && (
        <div className="my-account">
          <AccountInfoList profile={profile} profileList={profileList} />
          <AccountForm profile={profile} profileList={profileList} />
        </div>
      )}
    </>
  );
};

export default MyAccountPage;
