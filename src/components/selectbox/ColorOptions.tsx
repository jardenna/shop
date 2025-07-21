import { OptionProps } from 'react-select';
import { ColorOption } from '../../utils/colorUtils';
import CustomOption from './CustomOption';

const ColorOptions = (props: OptionProps<ColorOption>) => (
  <CustomOption
    {...props}
    render={(data) => (
      <>
        <span
          className="option-box"
          style={{ backgroundColor: data.color, borderColor: data.border }}
        />
        <span>{data.label}</span>
      </>
    )}
  />
);

export default ColorOptions;
