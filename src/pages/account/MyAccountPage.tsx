import DateDisplay from '../../components/datePicker/DateDisplay';
import Icon from '../../components/icons/Icon';
import LabelValueGrid from '../../components/LabelValueGrid';
import { PrimaryActionBtnProps } from '../../components/modal/Modal';
import ModalContainer from '../../components/modal/ModalContainer';
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

  const primaryActionBtn: PrimaryActionBtnProps = {
    label: 'ok',
  };

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
                <Icon iconName={IconName.Info} title="" size="1em" />
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
          <ModalContainer
            triggerModalBtnContent={language.update}
            id="id"
            primaryActionBtn={primaryActionBtn}
            modalHeaderText={language.temporarilyOutOfStock}
          >
            modal
          </ModalContainer>
        </div>
      )}
    </>
  );
};

export default MyAccountPage;
