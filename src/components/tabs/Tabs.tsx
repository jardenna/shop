import { useState } from 'react';
import { useRovingTabIndex } from '../../hooks/useRovingTabIndex';
import { BtnVariant } from '../../types/enums';
import Button from '../Button';
import './_tabs.scss';
export interface TabItemList<T = string> {
  id: string | number;
  label: string;
  value: T;
}

interface TabsProps<T> {
  tabItemList: TabItemList<T>[];
  className?: string;
  defaultIndex?: number;
  onClick: (value: T) => void;
}

const Tabs = <T,>({
  tabItemList,
  defaultIndex = 0,
  onClick,
  className = '',
}: TabsProps<T>) => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(defaultIndex);

  const { itemRefs, handleKeyDown } = useRovingTabIndex({
    selectedIndex: selectedTabIndex,
    itemCount: tabItemList.length,
    onChange: (index) => {
      setSelectedTabIndex(index);
      onClick(tabItemList[index].value);
    },
  });

  const handleActivateTab = (index: number) => {
    setSelectedTabIndex(index);
    onClick(tabItemList[index].value);
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
