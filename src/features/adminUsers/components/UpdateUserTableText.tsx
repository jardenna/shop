import MailTo from '../../../components/MailTo';
import { translateKey } from '../../../utils/utils';

interface UpdateUserTableTextProps {
  language: Record<string, string>;
  text: string;
}

const UpdateUserTableText = ({ text, language }: UpdateUserTableTextProps) => (
  <span>
    {!text.includes('@') ? (
      translateKey(text, language)
    ) : (
      <MailTo email={text} />
    )}
  </span>
);

export default UpdateUserTableText;
