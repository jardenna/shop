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
  disabled?: boolean;
  initCount?: number;
  max?: number;
  min?: number;
  readOnlyInput?: boolean;
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
  readOnlyInput,
  id,
  name,
  showLabel,
  disabled,
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
        {readOnlyInput ? (
          <span className="read-only">{value}</span>
        ) : (
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
            readOnly={readOnlyInput}
          />
        )}
        <IconBtn
          iconName={IconName.Add}
          variant={BtnVariant.Ghost}
          onClick={() => {
            handleNumberStepClick(initCount);
          }}
          ariaLabel={`${language.add} ${initCount} `}
          disabled={disabled}
        />
      </div>
    </article>
  );
};

export default NumberStep;
