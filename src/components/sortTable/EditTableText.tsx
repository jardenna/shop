type EditTableTextProps = {
  cellContent: string;
  text: string;
};

const EditTableText = ({ cellContent, text }: EditTableTextProps) => (
  <span className="edit-cell-text">
    {!cellContent.includes('@') ? (
      text
    ) : (
      <a href={`mailto:${cellContent}`}>{cellContent}</a>
    )}
  </span>
);

export default EditTableText;
