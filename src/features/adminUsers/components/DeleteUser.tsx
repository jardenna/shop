import Button from '../../../components/Button';
import Icon from '../../../components/icons/Icon';
import Popup from '../../../components/popup/Popup';
import { BtnVariant, IconName } from '../../../types/enums';
import { useLanguage } from '../../language/useLanguage';

type DeleteUserProps = {
  onDeleteUser: any;
  username: string;
};

const DeleteUser = ({ onDeleteUser, username }: DeleteUserProps) => {
  const { language } = useLanguage();

  return (
    <Popup
      placement="left-start"
      popupContent={({ close }) => (
        <section className="cell-user-popup">
          <p>{language.sureToDelete}</p>
          <p>{username}?</p>

          <footer className="footer">
            <Button variant={BtnVariant.Secondary} onClick={close}>
              {language.cancel}
            </Button>
            <Button
              variant={BtnVariant.Danger}
              onClick={() => {
                onDeleteUser();
                close();
              }}
            >
              {language.delete}
            </Button>
          </footer>
        </section>
      )}
      triggerBtnClassName="danger"
      ariaLabel={language.deleteUser}
    >
      <Icon iconName={IconName.Trash} />
    </Popup>
  );
};

export default DeleteUser;
