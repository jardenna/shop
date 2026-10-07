import MailTo from '../../../components/MailTo';
import { translateKey } from '../../../utils/utils';

interface EditTableTextProps {
  language: Record<string, string>;
  text: string;
}

const EditTableText = ({ text, language }: EditTableTextProps) => (
  <span>
    {!text.includes('@') ? (
      translateKey(text, language)
    ) : (
      <MailTo email={text} />
    )}
  </span>
);

export default EditTableText;
