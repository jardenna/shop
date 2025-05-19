import Button from '../../components/Button';
import useLanguage from '../../features/language/useLanguage';
import { BtnVariant } from '../../types/enums';

type DeleteUserProps = {
  ref: any;
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
      <footer className="dropdown-content-footer">
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
