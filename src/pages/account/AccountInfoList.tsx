import type { UserProfileResponse } from '../../app/api/apiTypes/shopApiTypes';
import DateDisplay from '../../components/datePicker/DateDisplay';
import Icon from '../../components/icons/Icon';
import LabelValueGrid from '../../components/LabelValueGrid';
import Popup from '../../components/popup/Popup';
import useLanguage from '../../features/language/useLanguage';
import { IconName } from '../../types/enums';
import type { ProfileList } from './MyAccountPage';

type AccountInfoListProps = {
  profile: UserProfileResponse;
  profileList: ProfileList[];
};

const AccountInfoList = ({ profile, profileList }: AccountInfoListProps) => {
  const { language } = useLanguage();
  const notProvided = language.notProvided;

  const profileDateOfBirth = profile.dateOfBirth ? (
    <DateDisplay date={profile.dateOfBirth} />
  ) : (
    notProvided
  );

  return (
    <div>
      {profileList.map((profie, index) => (
        <LabelValueGrid
          key={index}
          text={language[profie.label]}
          tooltip={
            profie.tooltip && (
              <Popup
                ariaControls="phone"
                ariaLabel={language.viewInfo}
                popupContent={language.phoneInfo}
              >
                <Icon iconName={IconName.Info} title="" size="1em" />
              </Popup>
            )
          }
        >
          {profie.type === 'date' ? profileDateOfBirth : profile[profie.name]}
        </LabelValueGrid>
      ))}

      <LabelValueGrid text={language.fashionPreference}>
        {language[profile.preferredFashion]}
      </LabelValueGrid>
    </div>
  );
};

export default AccountInfoList;
