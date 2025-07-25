import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";

import Home from "./Home";
import Layout from "./Layout";
import './index.css'

import CustomerService from "./pages/CustomerService/CustomerService";
import LoginPage from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import Promotions from "./pages/Promotions/Promotions";
import Recharge from "./pages/Recharge/Recharge";
import SignupPage from "./pages/Signup/Signup";
import PaymentPage from "./pages/PaymentPage/PaymentPage";
import Withdraw from "./pages/Withdraw/Withdraw";
import AdminLogin from "./pages/AdminLogin/AdminLogin"
import AdminPanel from "./pages/AdminPanel/AdminPanel"

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
        path: '/profile',
        element: <Profile />
      },
      {
        path: '/promotions',
        element: <Promotions />
      },
      {
        path: '/recharge',
        element: <Recharge />,
      },
      {
        path: '/payment-page',
        element: <PaymentPage />,
      },
      {
        path: '/withdraw',
        element: <Withdraw />,
      },
    ]
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/signup',
    element: <SignupPage />
  },
  {
    path: '/adminlogin',
    element: <AdminLogin />
  },
  {
    path: '/adminpanel',
    element: <AdminPanel />
  },
]);

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <RouterProvider router={router} />
);
