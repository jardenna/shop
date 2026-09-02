import DisplayControls from '../../../components/DisplayControls';
import LiveAnnouncement from '../../../components/LiveAnnouncement';
import { IconName } from '../../../types/enums';

interface ProductViewIconList {
  ariaLabel: string;
  display: string;
  iconName: IconName;
}

interface ProductToolbarProps {
  activeDisplay: string;
  announce: boolean;
  ariaLiveText: string;
  displayControlList: ProductViewIconList[];
  infoText: string;
  setProductView: (id: string) => void;
}

const ProductToolbar = ({
  displayControlList,
  setProductView,
  activeDisplay,
  infoText,
  announce,
  ariaLiveText,
}: ProductToolbarProps) => (
  <>
    <DisplayControls
      onSetDisplay={setProductView}
      displayControlList={displayControlList}
      activeDisplay={activeDisplay}
    />
    <LiveAnnouncement
      infoText={infoText}
      announce={announce}
      ariaLiveText={ariaLiveText}
    />
  </>
);

export default ProductToolbar;
