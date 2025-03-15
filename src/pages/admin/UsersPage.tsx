import { FC } from 'react';

interface UsersPageProps {
  name?: string;
}

const UsersPage: FC<UsersPageProps> = ({ name }) => <section>{name}</section>;

export default UsersPage;
