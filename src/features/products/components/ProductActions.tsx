import { useNavigate } from 'react-router';
import DropdownBtn, {
  DropdownItem,
} from '../../../components/dropdownBtn/DropdownBtn';
import Icon from '../../../components/icons/Icon';
import { AdminPath } from '../../../layout/nav/enums';
import { IconName } from '../../../types/enums';
import useLanguage from '../../language/useLanguage';

type ProductActionsProps = {
  id: string;
  onCopyProduct: (id: string) => void;
};

const ProductActions = ({ onCopyProduct, id }: ProductActionsProps) => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const actionsDropdownList: DropdownItem[] = [
    {
      label: language.view,
      onClick: () => {
        navigate(`${AdminPath.AdminProductView}/${id}`);
      },
      icon: <Icon iconName={IconName.Eye} title={language.eye} />,
    },
    {
      label: language.update,
      onClick: () => {
        navigate(`${AdminPath.AdminProductUpdate}/${id}`);
      },
      icon: <Icon iconName={IconName.Pencil} title={language.pencil} />,
    },
    {
      label: language.copyAction,
      onClick: () => {
        onCopyProduct(id);
      },
      icon: <Icon iconName={IconName.Dublicate} title={language.copy} />,
    },
  ];

  return (
    <DropdownBtn
      dropdownList={actionsDropdownList}
      ariaControls="product-actions"
      ariaLabel={language.productActions}
      showArrow
      placement="left-start"
    >
      <Icon iconName={IconName.MenuDotsHorizontal} title={language.user} />
    </DropdownBtn>
  );
};

export default ProductActions;
