
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        Skill<span>Swap</span>
      </Link>

      <div className="nav-links">
        <NavLink to="/my-skills">My Skills</NavLink>
        <NavLink to="/" end>Dashboard</NavLink>
        <NavLink to="/explore">Explore Skills</NavLink>
        <NavLink to="/add-skill">Offer a Skill</NavLink>
        <NavLink to="/favourites">Favourites</NavLink>
        <NavLink to="/profile">My Profile</NavLink>
      </div>

      <div className="nav-user">
        <span className="user-avatar">S</span>
        <span>Student</span>
      </div>
    </nav>
  );
}

export default Navbar;
