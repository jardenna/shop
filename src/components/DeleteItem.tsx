import { useLanguage } from '../features/language/useLanguage';
import { BtnVariant, IconName } from '../types/enums';
import Button from './Button';
import Icon from './icons/Icon';
import Popup from './popup/Popup';

interface DeleteItemProps {
  ariaLabel: string;
  itemName: string;
  onDeleteItem: () => void;
}

const DeleteItem = ({ onDeleteItem, itemName, ariaLabel }: DeleteItemProps) => {
  const { language } = useLanguage();

  return (
    <Popup
      placement="left-start"
      popupContent={({ close }) => (
        <section className="cell-user-popup">
          <p>{language.sureToDelete}</p>
          <p>{itemName}?</p>

          <footer className="footer">
            <Button variant={BtnVariant.Secondary} onClick={close}>
              {language.cancel}
            </Button>

            <Button
              variant={BtnVariant.Danger}
              onClick={() => {
                close();
                onDeleteItem();
              }}
            >
              {language.delete}
            </Button>
          </footer>
        </section>
      )}
      triggerBtnClassName="danger"
      ariaLabel={ariaLabel}
    >
      <Icon iconName={IconName.Trash} />
    </Popup>
  );
};

export default DeleteItem;
