export type OptionGroupTitle1 = {
  id: string;
  title: string;
};

type OptionGroupTitleProps = {
  text: string;
  errorText?: string;
  groupTitle?: OptionGroupTitle1;
  id?: string;
};

const OptionGroupTitle = ({
  text,
  errorText,
  id,
  groupTitle,
}: OptionGroupTitleProps) => (
  <>
    {groupTitle && (
      <div className="option-group-title" aria-labelledby={groupTitle.id}>
        <h3 className="title">{groupTitle.title}</h3>
        <span className="error-message">{errorText}</span>
      </div>
    )}
    <div className="option-group-title" aria-labelledby={id || undefined}>
      <h3 className="title">{text}</h3>
      <span className="error-message">{errorText}</span>
    </div>
  </>
);

export default OptionGroupTitle;
