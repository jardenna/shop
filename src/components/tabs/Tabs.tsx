import { useState } from 'react';
import { useRovingTabIndex } from '../../hooks/useRovingTabIndex';
import { BtnVariant } from '../../types/enums';
import Button from '../Button';
import './_tabs.scss';

export interface TabItemList {
  id: string | number;
  label: string;
  value: string;
}

interface TabsProps {
  tabItemList: TabItemList[];
  className?: string;
  defaultIndex?: number;
  onClick: (value: string) => void;
}

const Tabs = ({
  tabItemList,
  defaultIndex = 0,
  onClick,
  className = '',
}: TabsProps) => {
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
    <div className={`tab-navigation-list ${className}`}>
      <ul className="tab-navigation" role="tablist" onKeyDown={handleKeyDown}>
        {tabItemList.map((tab, index) => (
          <li key={tab.id}>
            <Button
              variant={BtnVariant.Secondary}
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
    </div>
  );
};

export default Tabs;
