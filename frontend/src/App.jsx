import Home from "./pages/Home"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login";
import Templates from "./pages/Templates";
import ResumeBuilder from "./pages/ResumeBuilder";
import ResumeTemplate1 from "./templates/ResumeTemplate1";
import ResumeTemplate2 from "./templates/ResumeTemplate2";
import UserDashboard from "./pages/UserDashboard";
import ProfilePage from "./pages/Profile";
import PrivateRoute from "./routes/PrivateRoute";
import ResumeTemplate3 from "./templates/ResumeTemplate3";
import ResumeTemplate4 from "./templates/ResumeTemplate4";
import ResumeTemplate5 from "./templates/ResumeTemplate5";
import ResumeTemplate6 from "./templates/ResumeTemplate6";
import ATS_Scoring from "./pages/ATS_Scoring";

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
        <Route path = "/template3" element={<ResumeTemplate3 />} />
        <Route path = "/template4" element={<ResumeTemplate4 />} />
        <Route path = "/template5" element={<ResumeTemplate5 />} />
        <Route path = "/template6" element={<ResumeTemplate6 />} />
        <Route path = "/dashboard" element=
        {
          <PrivateRoute>
            <UserDashboard />
          </PrivateRoute>
        }/>
        <Route path = "/profile" element={<ProfilePage />} />
        <Route path = "/ats_score" element={<ATS_Scoring/>} />
      </Routes>
    </Router>
  )
}

export default App