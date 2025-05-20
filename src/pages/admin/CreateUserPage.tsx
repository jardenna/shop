import { MainPath } from '../../layout/nav/enums';
import RegisterUser from '../RegisterUser';

const CreateUserPage = () => <RegisterUser navigateTo={MainPath.Users} />;

export default CreateUserPage;
