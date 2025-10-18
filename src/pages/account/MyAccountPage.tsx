import type { BaseProfile } from '../../app/api/apiTypes/shopApiTypes';
import Skeleton from '../../components/skeleton/Skeleton';
import SkeletonGrid from '../../components/skeleton/SkeletonGrid';
import useLanguage from '../../features/language/useLanguage';
import { useGetUserProfileQuery } from '../../features/profile/profileApiSlice';
import type { InputType } from '../../types/types';
import './_my-account.scss';
import AccountFormModal from './AccountFormModal';
import AccountInfoList from './AccountInfoList';

export type ProfileFieldListProps = {
  label: string;
  name: keyof BaseProfile;
  required?: boolean;
  tooltip?: boolean;
  type?: InputType;
};

const MyAccountPage = () => {
  const { language } = useLanguage();
  const { data: profile, isLoading } = useGetUserProfileQuery();

  const profileFieldList: ProfileFieldListProps[] = [
    {
      name: 'username',
      label: 'name',
      required: true,
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
      required: true,
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
      <p>{language.verifyAndUpdateInfo}</p>

      <div className="my-account">
        {isLoading && (
          <>
            <SkeletonGrid width="12" height="1.4" />
            <Skeleton height="3.2" />
          </>
        )}

        {profile && (
          <>
            <AccountInfoList
              profile={profile}
              profileFieldList={profileFieldList}
            />
            <AccountFormModal
              profile={profile}
              profileFieldList={profileFieldList}
            />
          </>
        )}
      </div>
    </>
  );
};

export default MyAccountPage;
