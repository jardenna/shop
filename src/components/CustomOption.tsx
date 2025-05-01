import { FC } from 'react';
import { OptionProps } from 'react-select';

interface Aggregation {
  label: string;
  value: string;
  border?: string;
}

const CustomOption: FC<OptionProps<Aggregation>> = ({
  data,
  innerRef,
  innerProps,
  isDisabled,
  isFocused,
  isSelected,
}) => {
  const className = `custom-option ${isDisabled ? 'disabled' : ''} ${
    isSelected ? 'selected' : ''
  } ${isFocused ? 'focused' : ''}`;
  const border = data.border ? data.border : '';
  return (
    <div className={className} ref={innerRef} {...innerProps}>
      <span>{data.label}</span>
      <span
        className="color-icon"
        style={{ backgroundColor: data.value, borderColor: border }}
      />
    </div>
  );
};

export default CustomOption;
