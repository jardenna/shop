import { ReactNode } from 'react';
import { NavigateFunction } from 'react-router';
import Button from '../../../components/Button';
import { ShopPath } from '../../../layout/nav/enums';

interface AlreadyLoggedInProps {
  children: ReactNode;
  language: Record<string, string>;
  navigate: NavigateFunction;
  username: string;
  onSwitchAccount: () => void;
}

const AlreadyLoggedIn = ({
  language,
  navigate,
  username,
  children,
  onSwitchAccount,
}: AlreadyLoggedInProps) => (
  <section>
    <p>
      {language.alreadyLoggedInAs} {username}
    </p>
    <div className="flex">
      {children}
      <Button onClick={onSwitchAccount}>{language.switchUser}</Button>
      <Button onClick={() => navigate(`/${ShopPath.CreateAccount}`)}>
        {language.createNewAccount}
      </Button>
    </div>
  </section>
);

export default AlreadyLoggedIn;
