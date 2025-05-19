import Button from '../../components/Button';
import useLanguage from '../../features/language/useLanguage';
import LayoutElement from '../../layout/LayoutElement';
import { BtnVariant } from '../../types/enums';
import { refElementType } from '../../types/types';

type DeleteUserProps = {
  ref: refElementType;
  text: string;
  onPrimaryClick: () => void;
  onSecondaryClick?: () => void;
};

const DeleteUser = ({
  onPrimaryClick,
  onSecondaryClick,
  text,
  ref,
}: DeleteUserProps) => {
  const { language } = useLanguage();

  return (
    <section className="tooltip-content" ref={ref}>
      <span>{text}</span>
      <LayoutElement
        className="dropdown-content-footer"
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
