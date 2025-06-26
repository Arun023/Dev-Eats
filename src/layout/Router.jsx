import { createBrowserRouter } from 'react-router-dom';
// import { Suspense, lazy } from 'react';
import Error from '../components/error';
import AppLayout from './AppLayout';
import Home from '../pages/Home';
import Search from '../pages/Search';
import CartPage from '../pages/cart';
import RestaurantPage from '../pages/Restaurant';
// const About = lazy(() => import('./pages/About'));
// const ContactForm = lazy(() => import('./components/ContactForm'));

const appRouter = createBrowserRouter([
  {
    path: '/',
    errorElement: <Error />,
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/search',
        element: <Search />,
      },
      {
        path: '/cart',
        element: <CartPage />,
      },
      //   {
      //     path: '/about',
      //     element: (
      //       <Suspense fallback={<div className="text-2xl">Hello</div>}>
      //         <About />
      //       </Suspense>
      //     ),
      //   },
      //   {
      //     path: '/contact',
      //     element: (
      //       <Suspense fallback={<div className="text-2xl">Hello</div>}>
      //         <ContactForm />
      //       </Suspense>
      //     ),
      //   },
      {
        path: '/restaurant/:id/:latitude?/:langitude?',
        element: <RestaurantPage />,
      },
    ],
  },
]);

export default appRouter;
