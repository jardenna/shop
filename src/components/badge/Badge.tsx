type BadgeProps = {
  text: string;
};

const Badge = ({ text }: BadgeProps) => <div className="badge">{text}</div>;

export default Badge;
