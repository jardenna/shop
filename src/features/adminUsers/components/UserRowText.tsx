import MailTo from '../../../components/MailTo';
import { Language } from '../../../types/types';
import { translateKey } from '../../../utils/utils';

interface UserRowTextProps {
  language: Language;
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
