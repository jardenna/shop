import { type OptionProps } from 'react-select';
import type { Category } from '../../pages/footerPages/AccessibilityPage';
import CustomOption from './CustomOption';

type CategoryOptionsProps = OptionProps<Category>;

const CategoryOptions = (props: CategoryOptionsProps) => (
  <CustomOption {...props} render={(data) => <span>{data.label}</span>} />
);

export default CategoryOptions;
