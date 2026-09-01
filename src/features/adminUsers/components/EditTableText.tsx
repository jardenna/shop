import MailTo from '../../../components/MailTo';
import { translateKey } from '../../../utils/utils';

type EditTableTextProps = {
  language: Record<string, string>;
  text: string;
};

const EditTableText = ({ text, language }: EditTableTextProps) => (
  <span className="edit-user-text">
    {!text.includes('@') ? (
      translateKey(text, language)
    ) : (
      <MailTo email={text} />
    )}
  </span>
);

export default EditTableText;
