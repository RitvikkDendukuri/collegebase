import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, NavLink, useLocation } from "react-router-dom";
import { FilterProvider } from "./context/FilterContext";
import { SavedProvider } from "./context/SavedContext";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Browser from "./pages/Browser";
import Patterns from "./pages/Patterns";
import Schools from "./pages/Schools";
import Demographics from "./pages/Demographics";
import Similar from "./pages/Similar";
import Saved from "./pages/Saved";
import "./index.css";

function ThemeToggle() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button className="theme-toggle"
      onClick={() => setTheme((t) => t === "dark" ? "light" : "dark")}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}>
      {theme === "dark" ? "☀" : "☾"}
    </button>
  );
}

function MobileNav({ menuOpen, setMenuOpen, filterOpen, setFilterOpen }) {
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location, setMenuOpen]);

  return (
    <>
      <nav className="app-nav">
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu">
          <span className={`hamburger-line ${menuOpen ? "open" : ""}`} />
          <span className={`hamburger-line ${menuOpen ? "open" : ""}`} />
          <span className={`hamburger-line ${menuOpen ? "open" : ""}`} />
        </button>
        <span className="brand">CollegeBase</span>
        <div className="nav-right">
          <button className="filter-toggle" onClick={() => setFilterOpen(!filterOpen)}
            aria-label="Toggle filters">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="4" y1="6" x2="20" y2="6" /><line x1="8" y1="12" x2="20" y2="12" /><line x1="12" y1="18" x2="20" y2="18" />
              <circle cx="6" cy="12" r="2" fill="currentColor" /><circle cx="10" cy="18" r="2" fill="currentColor" /><circle cx="8" cy="6" r="2" fill="currentColor" />
            </svg>
          </button>
          <ThemeToggle />
        </div>
      </nav>

      {menuOpen && <div className="mobile-overlay" onClick={() => setMenuOpen(false)} />}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/browser">Browse</NavLink>
        <NavLink to="/patterns">Patterns</NavLink>
        <NavLink to="/schools">Schools</NavLink>
        <NavLink to="/demographics">Demographics</NavLink>
        <NavLink to="/similar">Find Similar</NavLink>
        <NavLink to="/saved">Saved</NavLink>
      </div>

      {filterOpen && <div className="mobile-overlay" onClick={() => setFilterOpen(false)} />}
      <div className={`mobile-filter-drawer ${filterOpen ? "open" : ""}`}>
        <div className="mobile-filter-header">
          <span>Filters</span>
          <button onClick={() => setFilterOpen(false)}>✕</button>
        </div>
        <Sidebar />
      </div>
    </>
  );
}

function DesktopNav() {
  return (
    <nav className="app-nav">
      <span className="brand">CollegeBase</span>
      <NavLink to="/">Dashboard</NavLink>
      <NavLink to="/browser">Browse</NavLink>
      <NavLink to="/patterns">Patterns</NavLink>
      <NavLink to="/schools">Schools</NavLink>
      <NavLink to="/demographics">Demographics</NavLink>
      <NavLink to="/similar">Find Similar</NavLink>
      <NavLink to="/saved">Saved</NavLink>
      <ThemeToggle />
    </nav>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <BrowserRouter>
      <FilterProvider>
        <SavedProvider>
          <div className={`app-shell ${isMobile ? "mobile" : ""}`}>
            {isMobile ? (
              <MobileNav menuOpen={menuOpen} setMenuOpen={setMenuOpen}
                filterOpen={filterOpen} setFilterOpen={setFilterOpen} />
            ) : (
              <>
                <DesktopNav />
                <Sidebar />
              </>
            )}

            <main className="main-content">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/browser" element={<Browser />} />
                <Route path="/patterns" element={<Patterns />} />
                <Route path="/schools" element={<Schools />} />
                <Route path="/demographics" element={<Demographics />} />
                <Route path="/similar" element={<Similar />} />
                <Route path="/saved" element={<Saved />} />
              </Routes>
            </main>
          </div>
        </SavedProvider>
      </FilterProvider>
    </BrowserRouter>
  );
}
