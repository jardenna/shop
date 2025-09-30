import { UserProfileResponse } from '../../app/api/apiTypes/sharedApiTypes';
import DateDisplay from '../../components/datePicker/DateDisplay';
import Icon from '../../components/icons/Icon';
import LabelValueGrid from '../../components/LabelValueGrid';
import Tooltip from '../../components/popup/Popup';
import useLanguage from '../../features/language/useLanguage';
import { IconName } from '../../types/enums';

type AccountInfoListProps = {
  profile: UserProfileResponse;
};

const AccountInfoList = ({ profile }: AccountInfoListProps) => {
  const { language } = useLanguage();
  const notProvided = language.notProvided;
  return (
    <div>
      <LabelValueGrid text={language.name}>{profile.username}</LabelValueGrid>

      <LabelValueGrid
        text={language.phone}
        tooltip={
          <Tooltip
            ariaControls="phone"
            ariaLabel={language.viewInfo}
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
    </div>
  );
};

export default AccountInfoList;
