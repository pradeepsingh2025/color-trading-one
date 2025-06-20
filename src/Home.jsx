import React, { useEffect, useState } from "react";
import CarouselComponent from "./components/carousel/Carousal";
import AnnouncementSection from "./components/announcement/Announcement";
import ColorTradingUI from "./components/game/Game";

import { NavLink, useNavigate } from "react-router-dom";

function Home() {
  const [data, setData] = useState("");
  const navigate = useNavigate();

  // Redirect to login if not logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        if (payload.exp > Date.now() / 1000) {
          navigate("/");
        }else{
          navigate("/login")
        }
      } catch {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
  }, []);

  return (
    <>
      <CarouselComponent />
      <AnnouncementSection />
      <h1
        style={{
          margin: "120px auto",
          fontSize: "43px",
          textAlign: "center",
          fontFamily: "monospace",
        }}
      >
        {data}
      </h1>
      <ColorTradingUI />
    </>
  );
}

export default Home;
