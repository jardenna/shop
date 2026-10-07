import MailTo from '../../../components/MailTo';
import { translateKey } from '../../../utils/utils';

interface UserRowTextProps {
  language: Record<string, string>;
  text: string;
}

const UserRowText = ({ text, language }: UserRowTextProps) => (
  <span>
    {!text.includes('@') ? (
      translateKey(text, language)
    ) : (
      <MailTo email={text} />
    )}
  </span>
);

export default UserRowText;
