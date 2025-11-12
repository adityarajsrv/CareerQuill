import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Examples from "../components/Examples"
import Features from "../components/Features"
import Footer from "../components/Footer"
import Hero from "../components/Hero"
import Navbar from "../components/Navbar"
import Workflow from "../components/Workflow"
import { useScroll } from "../context/ScrollContext"

const Home = () => {
  const location = useLocation();
  const { scrollTarget, setScrollTarget } = useScroll();

  useEffect(() => {
    if (scrollTarget) {
      const element = document.getElementById(scrollTarget);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setScrollTarget(null); 
      }
    }
  }, [scrollTarget, setScrollTarget]);

  useEffect(() => {
    if (location.state?.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <div>
        <Navbar />
        <Hero />
        <Features />
        <Examples />
        <Workflow />
        <Footer />
    </div>
  )
}

export default Home