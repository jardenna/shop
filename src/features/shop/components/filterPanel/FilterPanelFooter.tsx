import ClearFilterBtn from '../../../../components/ClearFilterBtn';
import { BtnVariant } from '../../../../types/enums';

interface FilterPanelFooterProps {
  disabled: boolean;
  onClick: () => void;
}

const FilterPanelFooter = ({ onClick, disabled }: FilterPanelFooterProps) => (
  <div className="filter-panel-footer">
    <ClearFilterBtn
      showIcon
      variant={BtnVariant.Ghost}
      onClick={onClick}
      disabled={disabled}
    />
  </div>
);

export default FilterPanelFooter;
