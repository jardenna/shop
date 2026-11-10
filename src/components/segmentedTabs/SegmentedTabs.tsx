import { ReactNode } from 'react';
import { useRovingTabIndex } from '../../hooks/useRovingTabIndex';
import { BtnVariant } from '../../types/enums';
import Button from '../Button';
import './_segmented-tabs.scss';

export interface TabItemList {
  id: string | number;
  label: ReactNode;
  value: string;
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
      {tabItemList.map((tab, index) => (
        <li key={tab.id} className="tab-item">
          <Button
            onKeyDown={handleKeyDown}
            variant={BtnVariant.Ghost}
            id={`tab-${tab.id}`}
            tabIndex={index === selectedIndex ? 0 : -1}
            role="tab"
            refCallback={(element) => {
              itemRefs.current[index] = element;
            }}
            onClick={() => {
              handleActivateTab(index);
            }}
            ariaSelected={index === selectedIndex}
            ariaControls={`tabpanel-${tab.id}`}
            className={`tab-item-trigger ${index === selectedIndex ? 'active' : ''}`}
          >
            {tab.label}
          </Button>
        </li>
      ))}
    </ul>
  );
};

export default SegmentedTabs;
