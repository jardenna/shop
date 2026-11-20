import './_chip.scss';
import type { ChipVariant } from './chipsUtils';

interface ChipProps {
  chipText: string;
  variant: ChipVariant;
}

const Chip = ({ chipText, variant }: ChipProps) => (
  <span className={`chip  ${variant}`}>
    <span>{chipText}</span>
  </span>
);

export default Chip;
