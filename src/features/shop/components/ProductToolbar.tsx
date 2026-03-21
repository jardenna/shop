import DisplayControls from '../../../components/DisplayControls';
import LiveAnnouncement from '../../../components/LiveAnnouncement';
import { IconName } from '../../../types/enums';

interface ProductViewIconList {
  ariaLabel: string;
  display: string;
  iconName: IconName;
  title: string;
}

interface ProductToolbarProps {
  announce: boolean;
  ariaLiveText: string;
  displayControlList: ProductViewIconList[];
  infoText: string;
  isActive: string; // ???
  onSetDisplay: any;
}

const ProductToolbar = ({
  displayControlList,
  onSetDisplay,
  isActive,
  infoText,
  announce,
  ariaLiveText,
}: ProductToolbarProps) => (
  <div className="product-toolbar">
    <DisplayControls
      onSetDisplay={onSetDisplay}
      displayControlList={displayControlList}
      isActive={isActive}
    />
    <LiveAnnouncement
      infoText={infoText}
      announce={announce}
      ariaLiveText={ariaLiveText}
    />
  </div>
);

export default ProductToolbar;
