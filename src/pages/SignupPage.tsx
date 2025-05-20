import { MainPath } from '../layout/nav/enums';
import RegisterUser from './RegisterUser';

const SignupPage = () => <RegisterUser navigateTo={MainPath.Root} />;

export default SignupPage;
