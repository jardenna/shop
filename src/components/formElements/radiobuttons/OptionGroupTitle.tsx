type OptionGroupTitleProps = {
  text: string;
  errorText?: string;
};

const OptionGroupTitle = ({ text, errorText }: OptionGroupTitleProps) => (
  <p className="option-group-title">
    {text}
    <span className="error-message">{errorText}</span>
  </p>
);

export default OptionGroupTitle;
