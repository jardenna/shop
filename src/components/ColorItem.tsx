import variables from '../scss/variables.module.scss';
import { SizeVariantNew } from '../types/types';
import { colorMap } from '../utils/colorUtils';

type ColorItemProps = {
  colorKey: string;
  hasBorderColor?: boolean;
  variant?: SizeVariantNew;
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
