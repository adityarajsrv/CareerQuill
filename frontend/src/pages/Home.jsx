import Branding from "../components/Branding"
import Examples from "../components/Examples"
import Features from "../components/Features"
import Footer from "../components/Footer"
import Hero from "../components/Hero"
import Navbar from "../components/Navbar"
import Workflow from "../components/Workflow"

const Home = () => {
  return (
    <div>
        <Navbar />
        <Hero />
        <Features />
        <Examples />
        <Workflow />
        <Branding />
        <Footer />
    </div>
  )
}

export default Home