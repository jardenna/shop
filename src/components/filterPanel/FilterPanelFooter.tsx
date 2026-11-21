import ClearFilterBtn from '../ClearFilterBtn';

interface FilterPanelFooterProps {
  disabled: boolean;
  onClick: () => void;
}

const FilterPanelFooter = ({ onClick, disabled }: FilterPanelFooterProps) => (
  <div className="filter-panel-footer">
    <ClearFilterBtn
      showIcon
      variant="ghost"
      onClick={onClick}
      disabled={disabled}
    />
  </div>
);

export default FilterPanelFooter;
