import { type OptionProps } from 'react-select';
import MultiCustomOption from './MultiCustomOption';
import type { BrandProps } from './SelectFieldMulti';

const BrandOptions = (props: OptionProps<BrandProps, true>) => (
  <MultiCustomOption {...props} render={(data) => <span>{data.label}</span>} />
);

export default BrandOptions;
