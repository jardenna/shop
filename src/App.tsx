import { RouterProvider } from 'react-router';
import HtmlLangSetter from './components/HtmlLangSetter';
import routeConfig from './routes/routeConfig';

const App = () => (
  <>
    <HtmlLangSetter />
    <RouterProvider router={routeConfig} />
  </>
);

export default App;
