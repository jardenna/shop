import { OptionProps } from 'react-select';

type Colors = {
  label: string;
  value: string;
  border?: string;
};

const ColorOptions = ({
  data,
  innerRef,
  innerProps,
  isDisabled,
  isFocused,
  isSelected,
}: OptionProps<Colors>) => {
  const className = `custom-option ${isDisabled ? 'disabled' : ''} ${
    isSelected ? 'selected' : ''
  } ${isFocused ? 'focused' : ''}`;

  return (
    <div className={className} ref={innerRef} {...innerProps}>
      <span
        className="color-icon"
        style={{ backgroundColor: data.value, borderColor: data.border }}
      />
      <span>{data.label}</span>
    </div>
  );
};

export default ColorOptions;
