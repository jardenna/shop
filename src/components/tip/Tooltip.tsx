import useDropdown from '../../hooks/useDropdown';
import './_tooltip.scss';

const Tooltip = () => {
  const { dropdownRef, buttonRef, dropdownIsOpen, toggleDropdownList } =
    useDropdown();

  return (
    <div className="tooltip-container">
      <button type="button" ref={buttonRef} onClick={toggleDropdownList}>
        Open
      </button>

      {dropdownIsOpen && (
        <div ref={dropdownRef} className="tooltip-content">
          Tooltip or Dropdown Content
        </div>
      )}
    </div>
  );
};

export default Tooltip;
