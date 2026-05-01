import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ToolPage from "./pages/ToolPage";
import "./index.css";

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <div className="page-layout">
          <Navbar />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              {/* Generic tool — no exam preset */}
              <Route path="/tool" element={<ToolPage />} />
              {/* Exam-specific pages — dynamic slug */}
              <Route path="/exam/:slug" element={<ToolPage />} />
              {/* 404 fallback */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
}

function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "4rem 1rem" }}>
      <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>404</h1>
      <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>
        Page not found
      </p>
      <a href="/" style={{ color: "var(--accent)", fontWeight: 700 }}>
        ← Back to Home
      </a>
    </div>
  );
}
