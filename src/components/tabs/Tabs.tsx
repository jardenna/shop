import { ReactNode } from 'react';
import { useRovingTabIndex } from '../../hooks/useRovingTabIndex';
import { BtnVariant } from '../../types/enums';
import Button from '../Button';
import './_tabs.scss';

export interface TabItemList {
  id: string | number;
  label: ReactNode;
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
    <div className={`tab-navigation-list ${className}`}>
      <ul className="tab-navigation" role="tablist" onKeyDown={handleKeyDown}>
        {tabItemList.map((tab, index) => (
          <li key={tab.id}>
            <Button
              variant={BtnVariant.Secondary}
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
              className={`tab ${index === selectedIndex ? 'active' : ''}`}
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
