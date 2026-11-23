import { type OptionProps } from 'react-select';
import type { BrandProps } from '../../pages/footerPages/CookiesPage';
import MultiCustomOption from './MultiCustomOption';

const BrandOptions = (props: OptionProps<BrandProps, true>) => (
  <MultiCustomOption {...props} render={(data) => <span>{data.label}</span>} />
);

export default BrandOptions;
