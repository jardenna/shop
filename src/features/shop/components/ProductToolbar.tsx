import { ReactNode } from 'react';
import DisplayControls, {
  DisplayControlItem,
} from '../../../components/DisplayControls';
import { IconName } from '../../../types/enums';
import { useLanguage } from '../../language/useLanguage';

interface ProductToolbarProps {
  activeDisplay: string;

  children?: ReactNode;
  setProductView: (id: string) => void;
}

const ProductToolbar = ({
  setProductView,
  activeDisplay,
  children,
}: ProductToolbarProps) => {
  const { language } = useLanguage();

  const displayControlList: DisplayControlItem[] = [
    {
      iconName: IconName.LayoutGrid,
      ariaLabel: language.productViewGrid,
      display: 'grid',
    },
    {
      iconName: IconName.LayoutList,
      ariaLabel: language.productViewList,
      display: 'list',
    },
  ];

  return (
    <div className="product-toolbar">
      <DisplayControls
        onSetDisplay={setProductView}
        displayControlList={displayControlList}
        activeDisplay={activeDisplay}
      />
      {children && children}
    </div>
  );
};

export default ProductToolbar;
