export type OptionGroupTitle1 = {
  id: string;
  title: string;
};

type OptionGroupTitleProps = {
  groupTitle: OptionGroupTitle1;
  errorText?: string;
};

const OptionGroupTitle = ({ errorText, groupTitle }: OptionGroupTitleProps) => (
  <div className="option-group-title">
    <h3 className="title" aria-labelledby={groupTitle.id}>
      {groupTitle.title}
    </h3>
    <span className="error-message">{errorText}</span>
  </div>
);

export default OptionGroupTitle;
