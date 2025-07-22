import { OptionGroupHeading } from '../../types/types';

type OptionGroupTitleProps = {
  groupTitle: OptionGroupHeading;
  errorText?: string;
};

const OptionGroupTitle = ({ errorText, groupTitle }: OptionGroupTitleProps) => (
  <div className="option-group-title">
    <h3 className="title" aria-labelledby={groupTitle.id}>
      {groupTitle.title}
    </h3>
    <span className="error-message">{errorText}</span>
  </div>
);

export default OptionGroupTitle;
