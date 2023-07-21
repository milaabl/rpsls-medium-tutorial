import { createBrowserRouter } from 'react-router-dom'
import GameSessionPage from './pages/game-session/index';
import WelcomePage from './pages/welcome/index';
import NewGamePage from './pages/new-game/index';
import Layout from './components/Layout/Layout';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [{
            path: '/',
            element: <WelcomePage />
        },
        {
            path: '/game-session/:hash',
            element: <GameSessionPage />
        },
        {
            path: '/new-game',
            element: <NewGamePage />
        }]
}]);