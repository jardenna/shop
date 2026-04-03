type EditTableTextProps = {
  text: string;
};

const EditTableText = ({ text }: EditTableTextProps) => (
  <span className="edit-user-text">
    {!text.includes('@') ? text : <a href={`mailto:${text}`}>{text}</a>}
  </span>
);

export default EditTableText;
