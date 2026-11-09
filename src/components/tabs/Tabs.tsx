import { useRef, useState } from 'react';
import { useKeyPress } from '../../hooks/useKeyPress';
import { BtnVariant, KeyCode } from '../../types/enums';
import Button from '../Button';
import './_tabs.scss';

export interface TabItemList {
  id: number;
  label: string;
}

interface TabsProps {
  tabItemList: TabItemList[];
  className?: string;
  defaultIndex?: number;
  onClick: (index: number) => void;
}

const Tabs = ({
  tabItemList,
  defaultIndex,
  onClick,
  className = '',
}: TabsProps) => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(defaultIndex ?? 0);
  const tabsRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleActivateTab = (index: number) => {
    setSelectedTabIndex(index);
    onClick(index);
    // Use arrowUp & arrowDown
    tabsRefs.current[index]?.focus();
  };

  const handleNextTab = () => {
    handleActivateTab((selectedTabIndex + 1) % tabItemList.length);
  };

  const handlePrevTab = () => {
    handleActivateTab(
      (selectedTabIndex - 1 + tabItemList.length) % tabItemList.length,
    );
  };

  const handleGotoFirstTab = () => {
    handleActivateTab(0);
  };

  const handleGotoLastTab = () => {
    handleActivateTab(tabItemList.length - 1);
  };

  useKeyPress(handleNextTab, [KeyCode.ArrowRight]);
  useKeyPress(handlePrevTab, [KeyCode.ArrowLeft]);
  useKeyPress(handleNextTab, [KeyCode.ArrowDown]);
  useKeyPress(handlePrevTab, [KeyCode.ArrowUp]);
  useKeyPress(handleGotoFirstTab, [KeyCode.Home]);
  useKeyPress(handleGotoLastTab, [KeyCode.End]);

  return (
    <div className={`tab-navigation-list ${className}`}>
      <ul className="tab-navigation" role="tablist">
        {tabItemList.map((tab, index) => (
          <li key={tab.id}>
            <Button
              variant={BtnVariant.Secondary}
              id={`tab-${tab.id}`}
              tabIndex={index === selectedTabIndex ? 0 : -1}
              role="tab"
              type="button"
              refCallback={(element) => {
                tabsRefs.current[index] = element;
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
