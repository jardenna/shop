import { OptionProps } from 'react-select';
import CustomOption from './CustomOption';

type Colors = {
  label: string;
  value: string;
  border?: string;
};

const ColorOptions = (props: OptionProps<Colors>) => (
  <CustomOption
    {...props}
    render={(data) => (
      <>
        <span
          className="option-icon"
          style={{ backgroundColor: data.value, borderColor: data.border }}
        />
        <span>{data.label}</span>
      </>
    )}
  />
);

export default ColorOptions;
