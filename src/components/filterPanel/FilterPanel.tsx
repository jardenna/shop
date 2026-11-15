import { ReactNode, useId } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { IconName } from '../../types/enums';
import { Language } from '../../types/types';
import ErrorBoundaryFallback from '../ErrorBoundaryFallback';
import Icon from '../icons/Icon';
import Panel from '../panel/Panel';
import TriggerPanelButton from '../panel/TriggerPanelButton';
import VisuallyHidden from '../VisuallyHidden';
import './filter-panel.scss';

interface FilterPanelProps {
  children: ReactNode;
  isPanelShown: boolean;
  language: Language;
  panelHeading: string;
  portalId: string;
  totalFiltersCount: number;
  trapFocus?: boolean;
  onHidePanel: () => void;
  onReset: () => void;
  onTogglePanel: () => void;
}

const FilterPanel = ({
  children,
  language,
  isPanelShown,
  panelHeading,
  portalId,
  onReset,
  onTogglePanel,
  trapFocus,
  onHidePanel,
  totalFiltersCount,
}: FilterPanelProps) => {
  const ariaControls = useId();

  return (
    <>
      <TriggerPanelButton
        ariaExpanded={isPanelShown}
        onTogglePanel={onTogglePanel}
        ariaLabel={language.filterProducts}
        ariaControls={ariaControls}
      >
        <>
          {totalFiltersCount > 0 && `[${totalFiltersCount}]`}
          <Icon iconName={IconName.Filter} />
          <VisuallyHidden>{language.filtersApplied}</VisuallyHidden>
        </>
      </TriggerPanelButton>
      <Panel
        portalId={portalId}
        closePanel={onHidePanel}
        isPanelShown={isPanelShown}
        className="filter-panel"
        ariaControls={ariaControls}
        heading={panelHeading}
        trapFocus={trapFocus}
      >
        <ErrorBoundary
          FallbackComponent={ErrorBoundaryFallback}
          onReset={onReset}
        >
          {children}
        </ErrorBoundary>
      </Panel>
    </>
  );
};

export default FilterPanel;
