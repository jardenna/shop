import Button from '../../../components/Button';
import { BtnVariant } from '../../../types/enums';
import type { RefElementType } from '../../../types/types';
import { useLanguage } from '../../language/useLanguage';

type DeleteUserProps = {
  ref: RefElementType;
  username: string;
  onPrimaryClick: () => void;
  onSecondaryClick?: () => void;
};

const DeleteUser = ({
  onPrimaryClick,
  onSecondaryClick,
  ref,
  username,
}: DeleteUserProps) => {
  const { language } = useLanguage();

  return (
    <section className="cell-user-popup" ref={ref}>
      <p>{language.sureToDelete}</p>
      <p>{username}?</p>

      <footer className="footer">
        <Button variant={BtnVariant.Secondary} onClick={onSecondaryClick}>
          {language.cancel}
        </Button>
        <Button variant={BtnVariant.Danger} onClick={onPrimaryClick}>
          {language.delete}
        </Button>
      </footer>
    </section>
  );
};

export default DeleteUser;
