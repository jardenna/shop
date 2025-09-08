import { IconName } from '../../types/enums';
import Button from '../Button';
import Input from '../formElements/Input';
import Icon from '../icons/Icon';
import './_number-step.scss';

interface NumberStepProps {
  id: string;
  labelText: string;
  name: string;
  value: number;
  initCount?: number;
  max?: number;
  min?: number;
  onChange: (event?: any) => void;
  onNumberStepChange: (event: any, count: number) => void;
}

const NumberStep = ({
  onChange,
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
        // onClick={(event?: ButtonEventType) => {
        //   onNumberStepChange(event, value !== Number(min) ? -initCount : 0);
        // }}
      >
        <Icon iconName={IconName.Subtract} title="Subtract" />
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
        // onClick={(event?: ButtonEventType) => {
        //   onNumberStepChange(event, value !== Number(max) ? initCount : 0);
        // }}
        ariaLabel={`Add ${initCount} `}
        disabled={value === Number(max)}
        id="subtract"
        name={id}
      >
        <Icon iconName={IconName.Add} title="Add" />
      </Button>
    </div>
  </article>
);

export default NumberStep;
