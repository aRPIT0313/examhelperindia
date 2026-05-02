import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { lazy, Suspense, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./index.css";

const HomePage = lazy(() => import("./pages/HomePage"));
const ToolPage = lazy(() => import("./pages/ToolPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const BlogArticle = lazy(() => import("./pages/BlogArticle"));
const DeclarationPage = lazy(() => import("./pages/DeclarationPage"));
const PrintPhotoPage = lazy(() => import("./pages/PrintPhotoPage"));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function PageLoader() {
  return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", minHeight:"40vh", color:"var(--text-muted)", fontSize:"1rem" }}>
      Loading…
    </div>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="page-layout">
          <Navbar />
          <main style={{ flex: 1 }}>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/tool" element={<ToolPage />} />
                <Route path="/exam/:slug" element={<ToolPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:slug" element={<BlogArticle />} />
                <Route path="/declaration" element={<DeclarationPage />} />
                <Route path="/print-photo" element={<PrintPhotoPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
}

function NotFound() {
  return (
    <div style={{ textAlign:"center", padding:"4rem 1rem" }}>
      <h1 style={{ fontSize:"3rem", marginBottom:"1rem" }}>404</h1>
      <p style={{ color:"var(--text-muted)", marginBottom:"1.5rem" }}>Page not found</p>
      <a href="/" style={{ color:"var(--accent)", fontWeight:700 }}>← Back to Home</a>
    </div>
  );
}
