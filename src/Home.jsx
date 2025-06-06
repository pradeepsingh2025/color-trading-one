import React, { useEffect, useState } from 'react';
import CarouselComponent from "./components/carousel/Carousal";
import AnnouncementSection from "./components/announcement/Announcement";
import ColorTradingUI from "./components/game/Game";

function Home() {
  const [data, setData] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/message', {
      method: 'GET',
      credentials: 'include', // include cookies if needed
    })
      .then(res => res.json())
      .then(data => setData(data.message))
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      <CarouselComponent />
      <AnnouncementSection />
      <h1 style={{ margin: "120px auto", fontSize: "43px", textAlign: "center", fontFamily: "monospace" }}>{data}</h1>
      <ColorTradingUI />

    </>
  )
}

export default Home;
