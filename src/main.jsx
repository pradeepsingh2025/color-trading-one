import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";

import Home from "./Home";
import Layout from "./Layout";

import CustomerService from "./pages/CustomerService/CustomerService";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import Promotions from "./pages/Promotions/Promotions";
import Recharge from "./pages/Recharge/Recharge";
import Signup from "./pages/Signup/Signup";

import ReactDOM from "react-dom/client";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Home />
      },
      {
        path: '/customer-service',
        element: <CustomerService />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/profile',
        element: <Profile />
      },
      {
        path: '/promotions',
        element: <Promotions />
      },
      {
        path: '/recharge',
        element: <Recharge />
      },
      {
        path: '/signup',
        element: <Signup />
      },
      
    ]
  },
]);

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <RouterProvider router={router} />
);
