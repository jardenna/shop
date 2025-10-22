import FormError from '../../../../components/formElements/FormError';
import RequiredIcon from '../../../../components/RequiredIcon';
import type { OptionGroupHeading } from '../../../../types/types';

type OptionGroupTitleProps = {
  groupTitle: OptionGroupHeading;
  required?: boolean;
};

const OptionGroupTitle = ({ groupTitle, required }: OptionGroupTitleProps) => (
  <div className="form-label-container">
    <span className="title" id={groupTitle.id}>
      {groupTitle.title}
      {required && <RequiredIcon />}
    </span>

    {groupTitle.errorText && (
      <FormError errorText={groupTitle.errorText} role="alert" />
    )}
  </div>
);

export default OptionGroupTitle;
