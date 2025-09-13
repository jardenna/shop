import variables from '../scss/variables.module.scss';
import { colorMap } from '../utils/colorUtils';
import { ProductLabelVariant } from './productLists/ProductListItem';

type ColorItemProps = {
  colorKey: string;
  className?: string;
  hasBorderColor?: boolean;
  variant?: ProductLabelVariant;
};

const ColorItem = ({
  hasBorderColor,
  colorKey,
  variant = 'small',
}: ColorItemProps) => (
  <span
    className={`color-item ${variant}-item`}
    style={{
      backgroundColor: colorMap[colorKey],
      borderColor: hasBorderColor ? variables.colorIconBorder : '',
    }}
  />
);

export default ColorItem;
