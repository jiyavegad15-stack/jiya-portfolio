import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import Main from "./pages/Main";
import Main2 from "./pages/Main2";
import AboutPage from "./pages/AboutPage";
import MySkillsPage from "./pages/MySkillsPage";
import PortfolioPage from "./pages/PortfolioPage";
import WorkPage from "./pages/WorkPage";
import ContactPage from "./pages/ContactPage";
import CVPage from "./pages/CVPage";
import ProcessPage from "./pages/ProcessPage";
import EducationPage from "./pages/EducationPage";
import ProjectPage from "./pages/ProjectPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/main2" element={<Main2 />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/skills" element={<MySkillsPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/cv" element={<CVPage />} />
        <Route path="/process" element={<ProcessPage />} />
        <Route path="/education" element={<EducationPage />} />
        <Route path="/project/:id" element={<ProjectPage />} />
      </Routes>
    </Router>
  );
}

export default App;