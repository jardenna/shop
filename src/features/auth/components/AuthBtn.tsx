import Button from '../../../components/Button';
import { BtnVariant } from '../../../types/enums';

type AuthBtnProps = {
  text: string;
  onClick: () => void;
};
const AuthBtn = ({ onClick, text }: AuthBtnProps) => (
  <div className="auth-btn">
    <Button onClick={onClick} variant={BtnVariant.Ghost}>
      {text}
    </Button>
  </div>
);

export default AuthBtn;
