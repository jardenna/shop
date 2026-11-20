import Icon from '../icons/Icon';

type InputInfoProps = {
  inputInfo: string;
};

const InputInfo = ({ inputInfo }: InputInfoProps) => (
  <span className="input-info">
    <Icon iconName="info" />
    <span>{inputInfo}</span>
  </span>
);

export default InputInfo;
