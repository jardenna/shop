/* eslint-disable @typescript-eslint/no-floating-promises */
import { FC } from 'react';
import Button from '../components/Button';
import { useLoginMutation } from '../features/auth/authApiSlice';

const Login: FC = () => {
  const [loginUser] = useLoginMutation();

  const handleLogin = () => {
    loginUser({
      email: 'joe@test.com',
      password: 'JoeJoe123!',
    });
  };

  return (
    <section className="container">
      <Button onClick={handleLogin}>Login</Button>
    </section>
  );
};

export default Login;
