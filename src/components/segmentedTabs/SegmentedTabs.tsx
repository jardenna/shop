import { ReactNode } from 'react';
import { useRovingTabIndex } from '../../hooks/useRovingTabIndex';
import { BtnVariant } from '../../types/enums';
import Button from '../Button';
import VisuallyHidden from '../VisuallyHidden';
import './_segmented-tabs.scss';

export interface TabItemList {
  id: string | number;
  label: ReactNode;
  value: string;
  ariaLabel?: string;
}

interface SegmentedTabsProps {
  tabItemList: TabItemList[];
  className?: string;
  defaultIndex?: number;
  onClick: (value: string) => void;
}

const SegmentedTabs = ({
  tabItemList,
  defaultIndex = 0,
  onClick,
  className = '',
}: SegmentedTabsProps) => {
  const { selectedIndex, itemRefs, handleKeyDown, handleChange } =
    useRovingTabIndex({
      defaultIndex,
      itemCount: tabItemList.length,
      onChange: (index) => {
        onClick(tabItemList[index].value);
      },
    });

  const handleActivateTab = (index: number) => {
    handleChange(index);
    itemRefs.current[index]?.focus();
  };

  return (
    <ul className={`segmented-tab-list ${className}`} role="tablist">
      {tabItemList.map(({ id, label, ariaLabel }, index) => (
        <li key={id} className="tab-item">
          <Button
            onKeyDown={handleKeyDown}
            role="tab"
            ariaPressed={index === selectedIndex}
            variant={BtnVariant.Ghost}
            id={`tab-${id}`}
            tabIndex={index === selectedIndex ? 0 : -1}
            refCallback={(element) => {
              itemRefs.current[index] = element;
            }}
            onClick={() => {
              handleActivateTab(index);
            }}
            className={`tab-item-trigger ${index === selectedIndex ? 'active' : ''}`}
          >
            {label}
            {ariaLabel && <VisuallyHidden>{ariaLabel}</VisuallyHidden>}
          </Button>
        </li>
      ))}
    </ul>
  );
};

export default SegmentedTabs;
