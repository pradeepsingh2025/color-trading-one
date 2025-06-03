import Header from "./components/Header/Header";
import CarouselComponent from "./components/carousel/Carousal";
import AnnouncementSection from "./components/announcement/Announcement";
import ColorTradingUI from "./components/game/Game";

function Home() {

return (
  <>
 <CarouselComponent />
 <AnnouncementSection />
 <h1 style={{margin: "120px auto", fontSize: "43px", textAlign: "center", fontFamily: "monospace"}}>Game Banayega Name</h1>
 <ColorTradingUI />
 
  </>
  )
}

export default Home;
