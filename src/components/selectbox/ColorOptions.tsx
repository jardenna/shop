import type { OptionProps } from 'react-select';
import type { ColorOption } from '../../utils/colorUtils';
import CustomOption from './CustomOption';

const ColorOptions = (props: OptionProps<ColorOption>) => (
  <CustomOption
    {...props}
    render={(data) => (
      <>
        <span
          className="color-item small-item"
          style={{ backgroundColor: data.color, borderColor: data.border }}
        />
        <span>{data.label}</span>
      </>
    )}
  />
);

export default ColorOptions;
