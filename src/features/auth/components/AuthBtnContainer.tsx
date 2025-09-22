import Button from '../../../components/Button';
import { BtnVariant } from '../../../types/enums';

type AuthBtnContainerProps = {
  text: string;
  onClick: () => void;
};
const AuthBtnContainer = ({ onClick, text }: AuthBtnContainerProps) => (
  <div className="auth-btn-container">
    <Button onClick={onClick} variant={BtnVariant.Ghost}>
      {text}
    </Button>
  </div>
);

export default AuthBtnContainer;
