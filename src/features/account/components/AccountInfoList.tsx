import { ErrorBoundary } from 'react-error-boundary';
import type { MyAccountResponse } from '../../../app/api/apiTypes/shopApiTypes';
import DateDisplay from '../../../components/datePicker/DateDisplay';
import ErrorBoundaryFallback from '../../../components/ErrorBoundaryFallback';
import LabelValueGrid from '../../../components/labelValueGrid/LabelValueGrid';
import Tooltip from '../../../components/popup/Tooltip';
import type { ProfileFieldListProps } from '../../../pages/MyAccountPage';
import { IconName } from '../../../types/enums';
import { useLanguage } from '../../language/useLanguage';

interface AccountInfoListProps {
  profile: MyAccountResponse;
  profileFieldList: ProfileFieldListProps[];
  onReset: () => void;
}

const AccountInfoList = ({
  profile,
  profileFieldList,
  onReset,
}: AccountInfoListProps) => {
  const { language } = useLanguage();

  type ProfileProps = {
    fallbackInfo: string;
    value: string | number | undefined;
    type?: string;
  };

  const getProfileValue = ({ fallbackInfo, value, type }: ProfileProps) => {
    if (type === 'date') {
      return value ? <DateDisplay date={String(value)} /> : fallbackInfo;
    }
    return value !== undefined && value !== '' ? value : fallbackInfo;
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorBoundaryFallback} onReset={onReset}>
      <div>
        {profileFieldList.map(({ name, label, type, tooltip }) => (
          <LabelValueGrid
            key={name}
            text={language[label]}
            tooltip={
              tooltip && (
                <Tooltip
                  ariaLabel={language.viewInfo}
                  tooltipContent={language.phoneInfo}
                  iconName={IconName.Info}
                />
              )
            }
          >
            {getProfileValue({
              value: profile[name],
              fallbackInfo: language.notProvided,
              type,
            })}
          </LabelValueGrid>
        ))}

        <LabelValueGrid text={language.fashionPreference}>
          {language[profile.preferredFashion]}
        </LabelValueGrid>
      </div>
    </ErrorBoundary>
  );
};

export default AccountInfoList;
