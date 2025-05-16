import IconBtn from '../../components/IconBtn';
import MoreLink from '../../components/MoreLink';
import useLanguage from '../../features/language/useLanguage';
import { MainPath } from '../../layout/nav/enums';
import { IconName } from '../../types/enums';

type ProductActionsProps = {
  id: string;
  onCopyProduct: (id: string) => void;
};

const ProductActions = ({ onCopyProduct, id }: ProductActionsProps) => {
  const { language } = useLanguage();
  return (
    <div className="flex">
      <MoreLink
        linkText={language.viewProduct}
        linkTo={`/admin/${MainPath.AdminProductView}/${id}`}
      />{' '}
      I{' '}
      <IconBtn
        title={language.filterRow}
        ariaLabel="copy"
        onClick={() => {
          onCopyProduct(id);
        }}
        iconName={IconName.Dublicate}
      />
    </div>
  );
};

export default ProductActions;
