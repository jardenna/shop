interface LabelValueProps {
  label: string;
  text: string | number;
}

const LabelValue = ({ text, label }: LabelValueProps) => (
  <span className="label-value">
    <span>{label}:</span>
    <span>{text}</span>
  </span>
);

export default LabelValue;
