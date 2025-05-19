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
      label: language.viewProduct,
      onClick: () => {
        navigate(`/admin/${MainPath.AdminProductView}/${id}`);
      },
      icon: (
        <Icon iconName={IconName.Auth} title={language.myAccount} size="25" />
      ),
    },
    {
      label: language.update,
      onClick: () => {
        navigate(`/admin/${MainPath.AdminProductUpdate}/${id}`);
      },
      icon: (
        <Icon
          iconName={IconName.Dublicate}
          title={language.myAccount}
          size="25"
        />
      ),
    },
    {
      label: language.copy,
      onClick: () => {
        onCopyProduct(id);
      },
      icon: (
        <Icon iconName={IconName.Auth} title={language.myAccount} size="25" />
      ),
    },
  ];

  return (
    <DropdownBtn
      dropdownList={ActionsDropdownList}
      ariaControls="product-actions"
      ariaLabel={language.productActions}
      showArrow
    >
      <IconContent iconName={IconName.User} title={language.user} />
    </DropdownBtn>
  );
};

export default ProductActions;
