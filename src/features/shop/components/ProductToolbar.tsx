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
  activeDisplay: string;
  announce: boolean;
  ariaLiveText: string;
  displayControlList: ProductViewIconList[];
  infoText: string;
  onSetDisplay: any;
}

const ProductToolbar = ({
  displayControlList,
  onSetDisplay,
  activeDisplay,
  infoText,
  announce,
  ariaLiveText,
}: ProductToolbarProps) => (
  <div className="product-toolbar">
    <DisplayControls
      onSetDisplay={onSetDisplay}
      displayControlList={displayControlList}
      activeDisplay={activeDisplay}
    />
    <LiveAnnouncement
      infoText={infoText}
      announce={announce}
      ariaLiveText={ariaLiveText}
    />
  </div>
);

export default ProductToolbar;
