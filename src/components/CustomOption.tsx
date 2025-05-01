import { FC } from 'react';
import { OptionProps } from 'react-select';

interface Aggregation {
  key: string;
  label: string;
  value: string;
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

  return (
    <div className={className} ref={innerRef} {...innerProps}>
      <span>{data.label}</span>
      <span className="color-icon" style={{ backgroundColor: data.value }} />
    </div>
  );
};

export default CustomOption;
