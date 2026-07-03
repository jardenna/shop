import { useLanguage } from '../../../features/language/useLanguage';
import { IconName } from '../../../types/enums';
import { ChangeInputType } from '../../../types/types';
import Button from '../../Button';
import Icon from '../../icons/Icon';
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
}: NumberStepProps) => {
  const { language } = useLanguage();

  return (
    <article className="number-step">
      <label htmlFor={id}>{labelText}</label>
      <div className="number-step-container">
        <Button
          id={id}
          name={id}
          ariaLabel={`${language.subtract} ${initCount} `}
          disabled={value === min}
          onClick={() => {
            onNumberStepChange(name, value !== min ? -initCount : 0);
          }}
        >
          <Icon iconName={IconName.Subtract} />
        </Button>
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
        <Button
          onClick={() => {
            onNumberStepChange(name, value !== max ? initCount : 0);
          }}
          ariaLabel={`${language.add} ${initCount} `}
          disabled={value === max}
          id={id}
          name={id}
        >
          <Icon iconName={IconName.Add} />
        </Button>
      </div>
    </article>
  );
};

export default NumberStep;
