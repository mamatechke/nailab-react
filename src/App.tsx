import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Programs from './pages/Programs';
import ProgramDetail from './pages/ProgramDetail';
import ContactUs from './pages/ContactUs';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import BrowseMentors from './pages/BrowseMentors';
import StartupDirectory from './pages/StartupDirectory';
import Resources from './pages/Resources';
import Pricing from './pages/Pricing';
import Profile from './pages/dashboard/Profile';
import Progress from './pages/dashboard/Progress';
import Mentorship from './pages/dashboard/Mentorship';
import Messages from './pages/dashboard/Messages';
import Opportunities from './pages/dashboard/Opportunities';
import Community from './pages/dashboard/Community';
import Settings from './pages/dashboard/Settings';
import Support from './pages/dashboard/Support';
import Schedule from './pages/dashboard/Schedule';
import Startups from './pages/dashboard/Startups';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/programs/:slug" element={<ProgramDetail />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/profile" element={<Profile />} />
        <Route path="/dashboard/progress" element={<Progress />} />
        <Route path="/dashboard/mentorship" element={<Mentorship />} />
        <Route path="/dashboard/messages" element={<Messages />} />
        <Route path="/dashboard/opportunities" element={<Opportunities />} />
        <Route path="/dashboard/community" element={<Community />} />
        <Route path="/dashboard/settings" element={<Settings />} />
        <Route path="/dashboard/support" element={<Support />} />
        <Route path="/dashboard/schedule" element={<Schedule />} />
        <Route path="/dashboard/startups" element={<Startups />} />
        <Route path="/mentors" element={<BrowseMentors />} />
        <Route path="/startups" element={<StartupDirectory />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/pricing" element={<Pricing />} />
      </Routes>
    </Router>
  );
}

export default App;
