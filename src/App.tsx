import { FC } from 'react';
import { RouterProvider } from 'react-router';
import routeConfig from './routes/routeConfig';

const App: FC = () => <RouterProvider router={routeConfig} />;

export default App;
