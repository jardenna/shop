import { IconName } from '../../../types/enums';
import { ButtonEventType, ChangeInputType } from '../../../types/types';
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
  onNumberStepChange: (event: ButtonEventType, amount: number) => void;
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
}: NumberStepProps) => (
  <article className="number-step">
    <label htmlFor={id}>{labelText}</label>
    <div className="number-step-container">
      <Button
        id="add"
        name={id}
        ariaLabel={`Subtract ${initCount} `}
        disabled={value === min}
        onClick={(event) => {
          onNumberStepChange(event, value !== min ? -initCount : 0);
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
        onClick={(event) => {
          onNumberStepChange(event, value !== max ? initCount : 0);
        }}
        ariaLabel={`Add ${initCount} `}
        disabled={value === max}
        id="subtract"
        name={id}
      >
        <Icon iconName={IconName.Add} />
      </Button>
    </div>
  </article>
);

export default NumberStep;
