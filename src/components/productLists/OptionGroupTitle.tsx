type OptionGroupTitleProps = {
  text: string;
  errorText?: string;
  id?: string;
};

const OptionGroupTitle = ({ text, errorText, id }: OptionGroupTitleProps) => (
  <div className="option-group-title" aria-labelledby={id || undefined}>
    <h3 className="title">{text}</h3>
    <span className="error-message">{errorText}</span>
  </div>
);

export default OptionGroupTitle;
