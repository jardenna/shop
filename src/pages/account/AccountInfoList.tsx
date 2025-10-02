import type { UserProfileResponse } from '../../app/api/apiTypes/shopApiTypes';
import DateDisplay from '../../components/datePicker/DateDisplay';
import Icon from '../../components/icons/Icon';
import LabelValueGrid from '../../components/LabelValueGrid';
import Popup from '../../components/popup/Popup';
import useLanguage from '../../features/language/useLanguage';
import { IconName } from '../../types/enums';
import type { ProfileFieldListProps } from './MyAccountPage';

type AccountInfoListProps = {
  profile: UserProfileResponse;
  profileFieldList: ProfileFieldListProps[];
};

const AccountInfoList = ({
  profile,
  profileFieldList,
}: AccountInfoListProps) => {
  const { language } = useLanguage();

  const profileDateOfBirth = profile.dateOfBirth ? (
    <DateDisplay date={profile.dateOfBirth} />
  ) : (
    language.notProvided
  );

  return (
    <div>
      {profileFieldList.map((profie, index) => (
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
