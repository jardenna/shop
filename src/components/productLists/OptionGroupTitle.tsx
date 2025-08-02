import type { OptionGroupHeading } from '../../types/types';
import RequiredIcon from '../RequiredIcon';

type OptionGroupTitleProps = {
  groupTitle: OptionGroupHeading;
  required?: boolean;
};

const OptionGroupTitle = ({ groupTitle, required }: OptionGroupTitleProps) => (
  <div className="option-group-title">
    <h2 aria-labelledby={groupTitle.id}>
      {groupTitle.title}
      {required && <RequiredIcon />}
    </h2>

    {groupTitle.errorText && (
      <span className="error-message">{groupTitle.errorText}</span>
    )}
  </div>
);

export default OptionGroupTitle;
