import { PrimaryActionBtnProps } from '../modal/Modal';

type AdminCard = {
  id: string;
  linkTo: string;
  name: string;
  primaryActionBtn: PrimaryActionBtnProps;
  scheduledDate: Date | null;
};

export default AdminCard;
