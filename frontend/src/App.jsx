import Home from "./pages/Home"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login";
import Templates from "./pages/Templates";
import ResumeBuilder from "./pages/ResumeBuilder";
import ResumeTemplate1 from "./templates/ResumeTemplate1";
import ResumeTemplate2 from "./templates/ResumeTemplate2";
import UserDashboard from "./pages/UserDashboard";
import ProfilePage from "./pages/Profile";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/templates" element={<Templates/>} />
        <Route path="/build" element={<ResumeBuilder />} />
        <Route path = "/template1" element={<ResumeTemplate1 />} />
        <Route path = "/template2" element={<ResumeTemplate2 />} />
        <Route path = "/template3" element={<ResumeTemplate1 />} />
        <Route path = "/template4" element={<ResumeTemplate1 />} />
        <Route path = "/template5" element={<ResumeTemplate1 />} />
        <Route path = "/template6" element={<ResumeTemplate1 />} />
        <Route path = "/dashboard" element={<UserDashboard />} />
        <Route path = "/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  )
}

export default App