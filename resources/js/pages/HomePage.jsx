import HeroSection from "../components/HeroSection";
import About from "../components/About";
import Biodata from "../components/Biodata";
import Pelayanan from "../components/Pelayanan";
import News from "../components/News";
import Portfolio from "../components/Portfolio";
import Galeri from "../components/Galeri";
import Kalender from "../components/Kalender";
import Kontak from "../components/Kontak";

function Homepage() {
  return (
    <div>
      <HeroSection />
      <About />
      <Biodata />
      <Pelayanan />
      <News />
      <Portfolio />
      <Galeri />
      <Kalender />
      <Kontak />
    </div>
  );
}

export default Homepage;
