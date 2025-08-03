import Home from "./pages/Home"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login";
import Templates from "./pages/Templates";
import ResumeBuilder from "./pages/ResumeBuilder";
import ResumeTemplate1 from "./templates/ResumeTemplate1";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/templates" element={<Templates/>} />
        <Route path="/build" element={<ResumeBuilder />} />
        <Route path = "/template1" element={<ResumeTemplate1 />} />
      </Routes>
    </Router>
  )
}

export default App