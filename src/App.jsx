import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import { ensureDemoData } from "./data/skills";
import AddSkill from "./pages/AddSkill";
import Explore from "./pages/Explore";
import Favourites from "./pages/Favourites";
import Home from "./pages/Home";
import IncomingRequests from "./pages/IncomingRequests";
import MyRequests from "./pages/MyRequests";
import MySkills from "./pages/MySkills";
import Profile from "./pages/Profile";
import SkillDetails from "./pages/SkillDetails";

import "./App.css";

function App() {
  useEffect(() => {
    ensureDemoData();
  }, []);

  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar />

        <main className="page-shell">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/add-skill" element={<AddSkill />} />
            <Route path="/my-skills" element={<MySkills />} />
            <Route path="/my-requests" element={<MyRequests />} />
            <Route path="/incoming-requests" element={<IncomingRequests />} />
            <Route path="/favourites" element={<Favourites />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/skill/:id" element={<SkillDetails />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
