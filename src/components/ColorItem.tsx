import variables from '../scss/variables.module.scss';
import { SizeVariant } from '../types/types';
import { colorMap } from '../utils/colorUtils';

interface ColorItemProps {
  colorKey: string;
  hasBorderColor?: boolean;
  variant?: SizeVariant;
}

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
