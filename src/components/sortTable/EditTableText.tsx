type EditTableTextProps = {
  cellContent: string;
  text: string;
};

const EditTableText = ({ cellContent, text }: EditTableTextProps) => (
  <span>
    {!cellContent.includes('@') ? (
      text
    ) : (
      <a href={`mailto:${cellContent}`}>{cellContent}</a>
    )}
  </span>
);

export default EditTableText;
