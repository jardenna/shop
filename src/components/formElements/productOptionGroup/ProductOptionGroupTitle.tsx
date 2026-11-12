import type { OptionGroupHeading } from '../../../types/types';
import RequiredIcon from '../../RequiredIcon';
import FormError from '../FormError';

interface ProductOptionGroupTitleProps {
  groupTitle: OptionGroupHeading;
  required?: boolean;
}

const ProductOptionGroupTitle = ({
  groupTitle,
  required,
}: ProductOptionGroupTitleProps) => (
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

export default ProductOptionGroupTitle;
