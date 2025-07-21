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
      <div className="option-group-title">
        <h3 className="title" aria-labelledby={groupTitle.id}>
          {groupTitle.title}
        </h3>
        <span className="error-message">{errorText}</span>
      </div>
    )}
    <div className="option-group-title">
      <h3 className="title" aria-labelledby={id || undefined}>
        {text}
      </h3>
      <span className="error-message">{errorText}</span>
    </div>
  </>
);

export default OptionGroupTitle;
