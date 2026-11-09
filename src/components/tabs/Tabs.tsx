import { useRef, useState, type KeyboardEvent } from 'react';
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
    tabsRefs.current[index]?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    let nextIndex = selectedTabIndex;

    switch (event.key as KeyCode) {
      case KeyCode.ArrowRight:
      case KeyCode.ArrowDown:
        nextIndex = (selectedTabIndex + 1) % tabItemList.length;
        break;

      case KeyCode.ArrowLeft:
      case KeyCode.ArrowUp:
        nextIndex =
          (selectedTabIndex - 1 + tabItemList.length) % tabItemList.length;
        break;

      case KeyCode.Home:
        nextIndex = 0;
        break;

      case KeyCode.End:
        nextIndex = tabItemList.length - 1;
        break;

      default:
        return;
    }

    event.preventDefault();
    handleActivateTab(nextIndex);
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
