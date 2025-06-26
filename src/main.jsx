import { createRoot } from 'react-dom/client';
import './index.css';
import appRouter from './layout/Router.jsx';
import { RouterProvider } from 'react-router-dom';

const root = createRoot(document.getElementById('root'));

root.render(<RouterProvider router={appRouter} />);
