import { createBrowserRouter } from "react-router-dom";
import Error from "../components/error";
import AppLayout from "./AppLayout";
import Home from "../pages/Home";
import Search from "../pages/Search";
import CartPage from "../pages/cart";
import RestaurantPage from "../pages/Restaurant";
import AboutPage from "../pages/about";
import ContactPage from "../pages/contact";

const appRouter = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error />,
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
      {
        path: "/restaurant/:id/:latitude?/:langitude?",
        element: <RestaurantPage />,
      },
    ],
  },
]);

export default appRouter;

