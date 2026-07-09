import { useLanguage } from '../../../features/language/useLanguage';
import { BtnVariant, IconName } from '../../../types/enums';
import { ChangeInputType } from '../../../types/types';
import IconBtn from '../../IconBtn';
import Input from '../Input';
import './_number-step.scss';

interface NumberStepProps {
  id: string;
  labelText: string;
  name: string;
  value: number;
  initCount?: number;
  max?: number;
  min?: number;
  showLabel?: boolean;
  onChange: (event: ChangeInputType) => void;
  onNumberStepChange: (field: string, amount: number) => void;
}

const NumberStep = ({
  onChange,
  onNumberStepChange,
  value,
  initCount = 1,
  min = 0,
  max,
  labelText,
  id,
  name,
  showLabel,
}: NumberStepProps) => {
  const { language } = useLanguage();

  const handleNumberStepClick = (amount: number) => {
    onNumberStepChange(id, amount);
  };

  return (
    <article className="number-step">
      {showLabel && <span>{labelText}</span>}
      <div className="number-step-container">
        <IconBtn
          iconName={IconName.Subtract}
          ariaLabel={`${language.subtract} ${initCount} `}
          disabled={value === min}
          variant={BtnVariant.Ghost}
          onClick={() => {
            handleNumberStepClick(-initCount);
          }}
        />
        <Input
          type="number"
          value={value}
          onChange={onChange}
          id={id}
          labelText={labelText}
          inputHasNoLabel
          name={name}
          min={min}
          max={max}
        />
        <IconBtn
          iconName={IconName.Add}
          variant={BtnVariant.Ghost}
          onClick={() => {
            handleNumberStepClick(initCount);
          }}
          ariaLabel={`${language.add} ${initCount} `}
          disabled={value === max}
        />
      </div>
    </article>
  );
};

export default NumberStep;
