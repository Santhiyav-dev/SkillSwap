import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import SkillSwapLogo from "./SkillSwapLogo";
import "./Navbar.css";

const navItems = [
  { to: "/", label: "Dashboard", icon: "home" },
  { to: "/explore", label: "Explore Skills", icon: "explore" },
  { to: "/add-skill", label: "Offer a Skill", icon: "plus" },
  { to: "/my-skills", label: "My Skills", icon: "skills" },
  { to: "/my-requests", label: "My Requests", icon: "requests" },
  { to: "/incoming-requests", label: "Incoming Requests", icon: "incoming" },
  { to: "/favourites", label: "Favourites", icon: "heart" },
  { to: "/profile", label: "My Profile", icon: "profile" },
];

function navIcon(type) {
  const icons = {
    home: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 10.5 12 4l8 6.5V19a1 1 0 0 1-1 1h-4v-7H9v7H5a1 1 0 0 1-1-1v-8.5Z" />
      </svg>
    ),
    explore: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M10 2a8 8 0 1 0 4.98 13.7l4.42 4.42 1.41-1.41-4.42-4.42A8 8 0 0 0 10 2Zm0 2a6 6 0 1 1 0 12 6 6 0 0 1 0-12Z" />
      </svg>
    ),
    plus: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6V5Z" />
      </svg>
    ),
    skills: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3 3 7.5 12 12l9-4.5L12 3Zm-8 8.2 8 4.1 8-4.1V17l-8 4-8-4v-5.8Z" />
      </svg>
    ),
    requests: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 4h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-6l-4 4v-4H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm2 5h10v2H7V9Zm0 4h7v2H7v-2Z" />
      </svg>
    ),
    incoming: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 12.5A9.5 9.5 0 0 1 12.5 3H15v2h-2.5A7.5 7.5 0 0 0 5 12.5V13h2v-1H3v.5Zm18 0V12h-2v1a7.5 7.5 0 0 1-7.5 7.5H9v-2h2.5A5.5 5.5 0 0 0 17 12.5V12h2v.5ZM12 5h2v7h6v2h-8V5Z" />
      </svg>
    ),
    heart: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 21.35 10.55 20C5.4 15.36 2 12.28 2 8.5A4.5 4.5 0 0 1 6.5 4c1.74 0 3.41.81 4.5 2.09A6.19 6.19 0 0 1 15.5 4 4.5 4.5 0 0 1 20 8.5c0 3.78-3.4 6.86-8.55 11.5L12 21.35Z" />
      </svg>
    ),
    profile: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z" />
      </svg>
    ),
  };

  return icons[type] || icons.home;
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="navbar-shell">
      <nav className="navbar" aria-label="Main navigation">
        <Link to="/" className="logo" onClick={() => setIsOpen(false)} aria-label="SkillSwap home">
          <SkillSwapLogo />
        </Link>

        <button
          type="button"
          className="mobile-toggle"
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`nav-menu ${isOpen ? "open" : ""}`}>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
              onClick={() => setIsOpen(false)}
            >
              <span className="nav-icon">{navIcon(item.icon)}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>

        <div className="nav-user" aria-label="Current user">
          <span className="user-avatar">S</span>
          <div className="user-meta">
            <strong>Student</strong>
            <small>Skill learner</small>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
