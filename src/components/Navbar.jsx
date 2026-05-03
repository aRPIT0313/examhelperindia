import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const TOOLS = [
  { to: "/tool",        icon: "🔧", label: "Custom Resize Tool",      desc: "Any KB, any format" },
  { to: "/print-photo", icon: "🖨️", label: "Print Photo Layout",      desc: "Multiple photos on A4" },
  { to: "/declaration", icon: "📝", label: "Declaration Guide",        desc: "Handwritten declaration" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const location = useLocation();
  const dropRef = useRef();

  // Close dropdown on outside click
  useEffect(() => {
    function handler(e) {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setDropOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close everything on route change
  useEffect(() => {
    setMenuOpen(false);
    setDropOpen(false);
  }, [location.pathname]);

  const toolsActive = ["/tool", "/print-photo", "/declaration"].includes(location.pathname);

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
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>
            Home
          </Link>

          {/* Tools dropdown */}
          <div className="nav-dropdown" ref={dropRef}>
            <button
              className={`nav-drop-btn ${toolsActive ? "active" : ""}`}
              onClick={() => setDropOpen((v) => !v)}
            >
              Tools <span className={`drop-arrow ${dropOpen ? "up" : ""}`}>▾</span>
            </button>
            {dropOpen && (
              <div className="drop-menu">
                {TOOLS.map((t) => (
                  <Link
                    key={t.to}
                    to={t.to}
                    className="drop-item"
                    onClick={() => setDropOpen(false)}
                  >
                    <span className="drop-icon">{t.icon}</span>
                    <div>
                      <div className="drop-label">{t.label}</div>
                      <div className="drop-desc">{t.desc}</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            to="/blog"
            className={location.pathname.startsWith("/blog") ? "active" : ""}
          >
            Guides
          </Link>

          {/* Mobile-only tool links (shown inline in hamburger menu) */}
          <div className="mobile-tool-links">
            {TOOLS.map((t) => (
              <Link
                key={t.to}
                to={t.to}
                className={`mobile-tool-link ${location.pathname === t.to ? "active" : ""}`}
              >
                {t.icon} {t.label}
              </Link>
            ))}
          </div>
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
