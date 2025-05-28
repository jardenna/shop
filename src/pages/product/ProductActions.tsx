import { useNavigate } from 'react-router';
import DropdownBtn, {
  DropdownItem,
} from '../../components/dropdownBtn/DropdownBtn';
import IconContent from '../../components/IconContent';
import Icon from '../../components/icons/Icon';
import useLanguage from '../../features/language/useLanguage';
import { MainPath } from '../../layout/nav/enums';
import { IconName } from '../../types/enums';

type ProductActionsProps = {
  id: string;
  onCopyProduct: (id: string) => void;
};

const ProductActions = ({ onCopyProduct, id }: ProductActionsProps) => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const ActionsDropdownList: DropdownItem[] = [
    {
      label: language.view,
      onClick: () => {
        navigate(`/admin/${MainPath.AdminProductView}/${id}`);
      },
      icon: <Icon iconName={IconName.Eye} title={language.eye} ariaHidden />,
    },
    {
      label: language.update,
      onClick: () => {
        navigate(`/admin/${MainPath.AdminProductUpdate}/${id}`);
      },
      icon: (
        <Icon iconName={IconName.Edit} title={language.pensil} ariaHidden />
      ),
    },
    {
      label: language.copy,
      onClick: () => {
        onCopyProduct(id);
      },
      icon: (
        <Icon iconName={IconName.Dublicate} title={language.copy} ariaHidden />
      ),
    },
  ];

  return (
    <DropdownBtn
      dropdownList={ActionsDropdownList}
      ariaControls="product-actions"
      ariaLabel={language.productActions}
      showArrow
      placement="left-start"
    >
      <IconContent
        iconName={IconName.MenuDotsHorizontal}
        title={language.user}
      />
    </DropdownBtn>
  );
};

export default ProductActions;
