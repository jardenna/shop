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
  ariaLabel: string;
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
  ariaLabel,
  totalFiltersCount,
}: FilterPanelProps) => {
  const ariaControls = useId();

  const hasActiveFilters = totalFiltersCount > 0;

  return (
    <>
      <TriggerPanelButton
        ariaExpanded={isPanelShown}
        onTogglePanel={onTogglePanel}
        ariaLabel={ariaLabel}
        ariaControls={ariaControls}
      >
        <>
          {hasActiveFilters && `[${totalFiltersCount}]`}
          <Icon iconName={IconName.Filter} />
          <VisuallyHidden>
            {hasActiveFilters
              ? language.filtersApplied
              : language.noFiltersApplied}
          </VisuallyHidden>
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
