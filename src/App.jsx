import SkillDetails from "./pages/SkillDetails";
import MySkills from "./pages/MySkills";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import AddSkill from "./pages/AddSkill";
import Profile from "./pages/Profile";
import Favourites from "./pages/Favourites";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/skill/:id" element={<SkillDetails />} />
        <Route path="/my-skills" element={<MySkills />} />
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/add-skill" element={<AddSkill />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/favourites" element={<Favourites />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
