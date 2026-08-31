import { useLanguage } from '../../features/language/useLanguage';
import { BtnVariant, IconName } from '../../types/enums';
import Button from '../Button';
import Icon from '../icons/Icon';
import Popup from '../popup/Popup';
import './_delete-item.scss';

interface DeleteItemProps {
  ariaLabel: string;
  isLoading: boolean;
  itemName: string;
  onDeleteItem: () => void;
}

const DeleteItem = ({
  onDeleteItem,
  itemName,
  ariaLabel,
  isLoading,
}: DeleteItemProps) => {
  const { language } = useLanguage();

  return (
    <Popup
      placement="left-start"
      popupContent={({ close }) => (
        <section className="delete-item">
          <p>{language.sureToDelete}</p>
          <p>{itemName}?</p>

          <footer className="footer">
            <Button variant={BtnVariant.Secondary} onClick={close}>
              {language.cancel}
            </Button>

            <Button
              showBtnLoader={isLoading}
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
