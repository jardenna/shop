import type { BaseProfile } from '../app/api/apiTypes/shopApiTypes';
import SkeletonAccountPage from '../components/skeleton/SkeletonAccountPage';
import { useGetMyAccountQuery } from '../features/account/accountApiSlice';
import AccountFormModal from '../features/account/components/AccountFormModal';
import AccountInfoList from '../features/account/components/AccountInfoList';
import { useLanguage } from '../features/language/useLanguage';
import type { InputMode, InputType } from '../types/types';

export interface BaseInputListProps {
  inputMode?: InputMode;
  required?: boolean;
  type?: InputType;
}

export interface ProfileFieldListProps extends BaseInputListProps {
  label: string;
  name: keyof BaseProfile;
  tooltip?: string;
}

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
      tooltip: language.birthDateInfo,
    },
    {
      name: 'email',
      label: 'email',
      type: 'email',
      required: true,
      inputMode: 'email',
    },
    {
      name: 'phoneNo',
      label: 'phone',
      tooltip: language.phoneInfo,
      type: 'tel',
      inputMode: 'tel',
    },
  ];
  //
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
