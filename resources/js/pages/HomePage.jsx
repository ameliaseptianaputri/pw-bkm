import HeroSection from "../components/HeroSection";
import About from "../components/About";
import Biodata from "../components/Biodata";
import Pelayanan from "../components/Pelayanan";
import News from "../components/News";
// import Portfolio from "../components/Portfolio";
import Galeri from "../components/Galeri";
import GaleriForm from "../components/GaleriForm";
import Kalender from "../components/Kalender";
import KalenderForm from "../components/KalenderForm";
import Kontak from "../components/Kontak";
import NewsDetail from "../components/NewsDetail";
import ImageUploadForm from "../components/ImageUploadForm";

function Homepage() {
  return (
    <div>
      <HeroSection />
      <About />
      <Biodata />
      <Pelayanan />
      <News />
      <NewsDetail/>
      {/* <Portfolio /> */}
      <ImageUploadForm/>
      <Galeri />
      <GaleriForm />
      <Kalender />
      <KalenderForm/>
      <Kontak />
    </div>
  );
}

export default Homepage;
