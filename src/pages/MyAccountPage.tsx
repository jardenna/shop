import type { BaseProfile } from '../app/api/apiTypes/shopApiTypes';
import SkeletonAccountPage from '../components/skeleton/SkeletonAccountPage';
import { useGetMyAccountQuery } from '../features/account/accountApiSlice';
import AccountFormModal from '../features/account/components/AccountFormModal';
import AccountInfoList from '../features/account/components/AccountInfoList';
import { useLanguage } from '../features/language/useLanguage';
import type { InputType } from '../types/types';

export type ProfileFieldListProps = {
  label: string;
  name: keyof BaseProfile;
  required?: boolean;
  tooltip?: boolean;
  type?: InputType;
};

const MyAccountPage = () => {
  const { language } = useLanguage();
  const { data: profile, isLoading, refetch } = useGetMyAccountQuery();

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
      <div>
        {isLoading && <SkeletonAccountPage />}
        {profile && (
          <>
            <AccountInfoList
              profile={profile}
              profileFieldList={profileFieldList}
              onReset={() => refetch}
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
