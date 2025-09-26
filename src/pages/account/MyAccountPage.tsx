import useAuth from '../../features/auth/hooks/useAuth';

const MyAccountPage = () => {
  const { currentUser } = useAuth();

  return (
    <div>
      <p>{currentUser?.username}</p>
      <p>{currentUser?.email}</p>
    </div>
  );
};

export default MyAccountPage;
