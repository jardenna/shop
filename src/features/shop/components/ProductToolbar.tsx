import DisplayControls, {
  DisplayControlItem,
} from '../../../components/DisplayControls';
import LiveAnnouncement from '../../../components/LiveAnnouncement';

interface ProductToolbarProps {
  activeDisplay: string;
  announce: boolean;
  ariaLiveText: string;
  displayControlList: DisplayControlItem[];
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
