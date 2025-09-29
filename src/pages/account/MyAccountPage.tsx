import DateDisplay from '../../components/datePicker/DateDisplay';
import Icon from '../../components/icons/Icon';
import LabelValueGrid from '../../components/LabelValueGrid';
import SkeletonParagraph from '../../components/skeleton/SkeletonParagraph';
import Tooltip from '../../components/tooltip/Tooltip';
import useLanguage from '../../features/language/useLanguage';
import { useGetUserProfileQuery } from '../../features/profile/profileApiSlice';
import { IconName } from '../../types/enums';
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

          <LabelValueGrid
            text={language.phone}
            tooltip={
              <Tooltip
                ariaControls="phone"
                ariaLabel={language.viewScheduledDate}
                tooltip={language.phoneInfo}
              >
                <Icon iconName={IconName.Info} title="" />
              </Tooltip>
            }
          >
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
