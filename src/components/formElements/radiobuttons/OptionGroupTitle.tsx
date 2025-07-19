type OptionGroupTitleProps = {
  text: string;
  errorText?: string;
  id?: string;
};

const OptionGroupTitle = ({ text, errorText, id }: OptionGroupTitleProps) => (
  <p className="option-group-title" aria-labelledby={id || undefined}>
    {text}
    <span className="error-message">{errorText}</span>
  </p>
);

export default OptionGroupTitle;
