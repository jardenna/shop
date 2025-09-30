import Button from '../../components/Button';
import useLanguage from '../../features/language/useLanguage';
import LayoutElement from '../../layout/LayoutElement';
import { BtnVariant } from '../../types/enums';
import type { refElementType } from '../../types/types';

type DeleteUserProps = {
  ref: refElementType;
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
    <section className="delete-user-popup" ref={ref}>
      <span>
        <p>{language.sureToDelete}</p>
        <p>{username}?</p>
      </span>
      <LayoutElement
        as="footer"
        className="footer"
        ariaLabel={language.deleteUser}
      >
        <Button variant={BtnVariant.Secondary} onClick={onSecondaryClick}>
          {language.cancel}
        </Button>
        <Button variant={BtnVariant.Danger} onClick={onPrimaryClick}>
          {language.delete}
        </Button>
      </LayoutElement>
    </section>
  );
};

export default DeleteUser;
