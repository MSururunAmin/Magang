import LogoSection from "./components/logo";
import SearchPage from "./components/Search";
import HeroSection from "./components/HeroSection";
import Navbar from "./navigation/page";

// If using a CSS module, import it
// import styles from './Home.module.css';

const Home = () => {
  return (
    <>
      <div className="background">
        <div className="flex flex-row items-start justify-items-start w-full">
          <Navbar />
          <div className="flex-grow flex justify-center">
            <LogoSection />
          </div>
        </div>
        <SearchPage />
        <HeroSection />
      </div>
    </>
  );
};

export default Home;
