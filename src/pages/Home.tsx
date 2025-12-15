import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import WhoWeAre from '../components/WhoWeAre';
import HowWeSupport from '../components/HowWeSupport';
import FocusAreas from '../components/FocusAreas';
import ConnectGrowImpact from '../components/ConnectGrowImpact';
import Testimonials from '../components/Testimonials';
import Partners from '../components/Partners';
import BottomCTA from '../components/BottomCTA';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <WhoWeAre />
      <HowWeSupport />
      <FocusAreas />
      <ConnectGrowImpact />
      <Testimonials />
      <Partners />
      <BottomCTA />
      <Footer />
    </div>
  );
}
