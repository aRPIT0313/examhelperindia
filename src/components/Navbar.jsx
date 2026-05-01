import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">📋</span>
          <span className="logo-text">
            ExamForm<span className="logo-accent">Helper</span>
          </span>
        </Link>

        <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
          <Link
            to="/"
            className={location.pathname === "/" ? "active" : ""}
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/tool"
            className={location.pathname === "/tool" ? "active" : ""}
            onClick={() => setMenuOpen(false)}
          >
            Free Tool
          </Link>
          <Link
            to="/blog"
            className={location.pathname.startsWith("/blog") ? "active" : ""}
            onClick={() => setMenuOpen(false)}
          >
            Guides
          </Link>
        </div>

        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={menuOpen ? "bar open" : "bar"}></span>
          <span className={menuOpen ? "bar open" : "bar"}></span>
          <span className={menuOpen ? "bar open" : "bar"}></span>
        </button>
      </div>
    </nav>
  );
}
