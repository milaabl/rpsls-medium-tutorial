import { createBrowserRouter } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import GameSessionPage from './pages/game-session/index';
import NewGamePage from './pages/new-game/index';
import WelcomePage from './pages/welcome/index';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <WelcomePage />,
      },
      {
        path: '/game-session/:hash',
        element: <GameSessionPage />,
      },
      {
        path: '/new-game',
        element: <NewGamePage />,
      },
    ],
  },
]);
