import React, { useState, useEffect } from "react";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router";
import { UserProvider } from "./context/UserContext";

const Layout = () => {
  const location = useLocation();
  const user = location.state || JSON.parse(localStorage.getItem("user") || "null");

  return (
    <UserProvider initialUser={user}>
      <Header />
      <Outlet />
      <Footer />
    </UserProvider>
  );
};

export default Layout;
