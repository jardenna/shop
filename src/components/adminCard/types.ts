import { MainPath } from '../../layout/nav/enums';
import { PrimaryActionBtnProps } from '../modal/Modal';

type AdminCard = {
  id: string;
  linkTo: MainPath | string;
  name: string;
  primaryActionBtn: PrimaryActionBtnProps;
  scheduledDate: Date | null;
};

export default AdminCard;
