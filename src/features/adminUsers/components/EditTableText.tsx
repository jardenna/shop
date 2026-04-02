type EditTableTextProps = {
  text: string;
};

const EditTableText = ({ text }: EditTableTextProps) => (
  <span>
    {!text.includes('@') ? text : <a href={`mailto:${text}`}>{text}</a>}
  </span>
);

export default EditTableText;
