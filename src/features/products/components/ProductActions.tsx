import { useNavigate } from 'react-router';
import ActionNavBtn, {
  ActionNavItemProps,
} from '../../../components/dropdownBtn/ActionNavBtn';
import Icon from '../../../components/icons/Icon';
import { AdminPath } from '../../../layout/nav/enums';
import { IconName } from '../../../types/enums';
import { useLanguage } from '../../language/useLanguage';

interface ProductActionsProps {
  id: string;
  onCopyProduct: (id: string) => void;
}

const ProductActions = ({ onCopyProduct, id }: ProductActionsProps) => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const actionsDropdownList: ActionNavItemProps[] = [
    {
      label: language.view,
      onClick: () => {
        navigate(`${AdminPath.AdminProductView}/${id}`);
      },
      iconName: IconName.Eye,
    },
    {
      label: language.update,
      onClick: () => {
        navigate(`${AdminPath.AdminProductUpdate}/${id}`);
      },
      iconName: IconName.Pencil,
    },
    {
      label: language.copyAction,
      onClick: () => {
        onCopyProduct(id);
      },
      iconName: IconName.Dublicate,
    },
  ];

  return (
    <ActionNavBtn
      actionNavDropdownList={actionsDropdownList}
      ariaLabel={language.productActions}
      showArrow
      placement="left-start"
      ariaHasPopup="menu"
    >
      <Icon iconName={IconName.MenuDotsHorizontal} />
    </ActionNavBtn>
  );
};

export default ProductActions;
