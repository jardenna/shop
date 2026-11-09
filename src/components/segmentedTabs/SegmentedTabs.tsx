import { ReactNode, useState } from 'react';
import { useRovingTabIndex } from '../../hooks/useRovingTabIndex';
import { BtnVariant } from '../../types/enums';
import Button from '../Button';

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
  const [selectedTabIndex, setSelectedTabIndex] = useState(defaultIndex);

  const handleChangeTab = (index: number) => {
    setSelectedTabIndex(index);
    onClick(tabItemList[index].value);
  };

  const { itemRefs, handleKeyDown } = useRovingTabIndex({
    selectedIndex: selectedTabIndex,
    itemCount: tabItemList.length,
    onChange: (index) => {
      handleChangeTab(index);
    },
  });

  const handleActivateTab = (index: number) => {
    handleChangeTab(index);
    itemRefs.current[index]?.focus();
  };

  return (
    <ul className={`tab-navigation-list ${className}`} role="tablist">
      {tabItemList.map((tab, index) => (
        <li key={tab.id}>
          <Button
            onKeyDown={handleKeyDown}
            variant={BtnVariant.Ghost}
            id={`tab-${tab.id}`}
            tabIndex={index === selectedTabIndex ? 0 : -1}
            role="tab"
            refCallback={(element) => {
              itemRefs.current[index] = element;
            }}
            onClick={() => {
              handleActivateTab(index);
            }}
            ariaSelected={index === selectedTabIndex}
            ariaControls={`tabpanel-${tab.id}`}
            className={`tab ${index === selectedTabIndex ? 'active' : ''}`}
          >
            {tab.label}
          </Button>
        </li>
      ))}
    </ul>
  );
};

export default SegmentedTabs;
