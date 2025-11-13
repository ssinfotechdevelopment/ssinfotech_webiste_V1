import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import TrainingAndPlacements from "./pages/TrainingAndPlacement";
import Jobs from "./pages/Jobs";
import './global.css';
import Placements from "./pages/Placement";
import Services from "./components/Services";
import AboutUs from "./pages/AboutUs";
import ServicePage from "./pages/ServicePage";
import ContactPage from "./pages/ContactUs";
import CollegeGallery from "./pages/CollegeGallery";
import SocialPopup from "./components/SocialPopup";
import InternshipPage from "./pages/InternshipPage";
import ScrollToTop from "./components/ScrollToTop"; // ✅ import added
import AptitudeTest from "./pages/AptitudeTest";

function App() {
  const [showPopup, setShowPopup] = useState(true);

  return (
    <div className="app">
      <Navbar />
      <main className="content">
        {showPopup && (
          <SocialPopup onClose={() => setShowPopup(false)} />
        )}

        {/* ✅ Scroll to top on route change */}
        <ScrollToTop />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/training" element={<TrainingAndPlacements />} />
          <Route path="/serach-jobs" element={<Jobs />} />
          <Route path="/apply-internship" element={<InternshipPage />} />
          <Route path="/placements" element={<Placements />} />
          <Route path="/gallary" element={<CollegeGallery />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/services" element={<ServicePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/aptitudetest" element={< AptitudeTest />} />
          <Route path="/*" element={"not found"} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
