import { useLocation, useNavigate } from 'react-router';
import ActionNavBtn, {
  type ActionNavItemProps,
} from '../../../components/dropdownBtn/ActionNavBtn';
import Icon from '../../../components/icons/Icon';
import { AdminPath } from '../../../layout/nav/enums';
import { useLanguage } from '../../language/useLanguage';

interface ProductActionsProps {
  id: string;
  onCopyProduct: (id: string) => void;
}

const ProductActions = ({ onCopyProduct, id }: ProductActionsProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { language } = useLanguage();

  const returnTo = `${location.pathname}${location.search}`;

  const actionsDropdownList: ActionNavItemProps[] = [
    {
      label: language.view,
      onClick: () => {
        navigate(`${AdminPath.AdminProductView}/${id}`, {
          state: { returnTo },
        });
      },
      iconName: 'eye',
    },
    {
      label: language.update,
      onClick: () => {
        navigate(`${AdminPath.AdminProductUpdate}/${id}`, {
          state: { returnTo },
        });
      },
      iconName: 'pencil',
    },
    {
      label: language.copyAction,
      onClick: () => {
        onCopyProduct(id);
      },
      iconName: 'dublicate',
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
      <Icon iconName="menuDotsHorizontal" />
    </ActionNavBtn>
  );
};

export default ProductActions;
