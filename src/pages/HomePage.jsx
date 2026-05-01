import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import { EXAMS, EXAM_CATEGORIES } from "../config/examConfig";
import { ARTICLES } from "../config/blogConfig";
import "./HomePage.css";

// localStorage keys
const RECENT_KEY = "examhelper_recent_tools";
const VISIT_KEY = "examhelper_visit_counts";

function getRecentTools() {
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function getTrendingExams() {
  try {
    const raw = localStorage.getItem(VISIT_KEY);
    if (!raw) return [];
    const counts = JSON.parse(raw); // { slug: count }
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .map(([slug]) => EXAMS.find((e) => e.slug === slug))
      .filter(Boolean);
  } catch {
    return [];
  }
}

export default function HomePage() {
  const categories = Object.entries(EXAM_CATEGORIES);
  const [recentSlugs, setRecentSlugs] = useState([]);
  const [trendingExams, setTrendingExams] = useState([]);

  useEffect(() => {
    setRecentSlugs(getRecentTools());
    setTrendingExams(getTrendingExams());
  }, []);

  const recentExams = recentSlugs
    .map((slug) => EXAMS.find((e) => e.slug === slug))
    .filter(Boolean)
    .slice(0, 4);

  // Only show trending if at least 2 unique exams visited
  const showTrending = trendingExams.length >= 2;

  return (
    <>
      <Helmet>
        <title>Exam Form Helper India — Free Photo & Signature Resize Tool</title>
        <meta
          name="description"
          content="Free photo and signature resize tool for Indian competitive exams. SSC, IBPS, UPSC, Railway, JEE, NEET. Compress to exact KB. No login required."
        />
      </Helmet>

      {/* Hero */}
      <div className="home-hero">
        <div className="hero-badge">🇮🇳 Made for Indian Exam Aspirants</div>
        <h1>
          Resize Your Photo & Signature<br />
          <span className="hero-accent">For Any Exam Form</span>
        </h1>
        <p>
          Enter your exact size requirement. We compress instantly in your browser.
          No login. No data upload. Free forever.
        </p>
        <div className="hero-cta">
          <Link to="/tool" className="btn-hero-primary">
            🚀 Open Free Tool
          </Link>
          <div className="hero-stats">
            <span>✅ 100% Browser-based</span>
            <span>✅ No data stored</span>
            <span>✅ Works offline</span>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Ad slot */}
        <div className="ad-slot">Advertisement</div>

        {/* Recently used tools */}
        {recentExams.length > 0 && (
          <div className="card recent-tools-card">
            <div className="card-title">🕐 Recently Used</div>
            <div className="exam-grid">
              {recentExams.map((exam) => (
                <Link
                  key={exam.id}
                  to={`/exam/${exam.slug}`}
                  className="exam-card exam-card--recent"
                >
                  <div className="exam-name">{exam.name}</div>
                  <div className="exam-sub">{exam.fullName}</div>
                  <div className="exam-arrow">Open Tool →</div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* 🔥 Trending Tools — only shown after 2+ exams visited */}
        {showTrending && (
          <div className="card trending-tools-card">
            <div className="card-title">🔥 Trending Tools</div>
            <div className="exam-grid">
              {trendingExams.map((exam) => (
                <Link
                  key={exam.id}
                  to={`/exam/${exam.slug}`}
                  className="exam-card exam-card--trending"
                >
                  <div className="exam-name">{exam.name}</div>
                  <div className="exam-sub">{exam.fullName}</div>
                  <div className="exam-arrow">Open Tool →</div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* How it works */}
        <div className="card">
          <div className="card-title">⚡ How It Works — 3 Steps</div>
          <div className="steps-grid">
            {[
              { n: "1", icon: "📁", title: "Upload", desc: "Upload your photo or draw your signature" },
              { n: "2", icon: "📐", title: "Enter Requirements", desc: "Type your exam's exact KB and pixel dimensions" },
              { n: "3", icon: "📥", title: "Download", desc: "Instant compression. Download and upload to exam portal" },
            ].map((s) => (
              <div key={s.n} className="how-card">
                <div className="how-num">{s.n}</div>
                <div className="how-icon">{s.icon}</div>
                <div className="how-title">{s.title}</div>
                <div className="how-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Exam categories */}
        {categories.map(([catKey, catName]) => {
          const exams = EXAMS.filter((e) => e.category === catKey);
          if (!exams.length) return null;
          return (
            <div key={catKey} className="card">
              <div className="card-title">📚 {catName}</div>
              <div className="exam-grid">
                {exams.map((exam) => (
                  <Link
                    key={exam.id}
                    to={`/exam/${exam.slug}`}
                    className="exam-card"
                  >
                    <div className="exam-name">{exam.name}</div>
                    <div className="exam-sub">{exam.fullName}</div>
                    <div className="exam-meta">
                      Photo: {exam.photo.maxSizeKB}KB •{" "}
                      {exam.photo.format[0]}
                    </div>
                    <span className="exam-arrow">→</span>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}

        {/* Custom tool CTA */}
        <div className="card custom-cta">
          <div className="cta-icon">🔧</div>
          <div className="cta-content">
            <h2>Your exam not listed?</h2>
            <p>
              Use our custom tool — enter any size, any format, any dimensions.
              Works for all exams worldwide.
            </p>
            <Link to="/tool" className="btn-cta">
              Open Custom Resize Tool →
            </Link>
          </div>
        </div>

        {/* Why use us */}
        <div className="card">
          <div className="card-title">🛡️ Why ExamFormHelper?</div>
          <div className="features-grid">
            {[
              { icon: "🔒", title: "100% Private", desc: "Your photo never leaves your device. All processing in browser." },
              { icon: "⚡", title: "Instant", desc: "No upload wait. Compress and download in seconds." },
              { icon: "🎯", title: "Exact Size", desc: "Hit any KB target precisely. 20KB, 50KB, 100KB — you decide." },
              { icon: "✍️", title: "Signature Tool", desc: "Draw or upload signature. Auto-resize and download." },
              { icon: "📦", title: "Combined ZIP", desc: "Download photo + signature together in one ZIP file." },
              { icon: "📱", title: "Mobile Friendly", desc: "Works perfectly on low-end Android phones." },
            ].map((f) => (
              <div key={f.title} className="feature-item">
                <span className="feat-icon">{f.icon}</span>
                <div>
                  <div className="feat-title">{f.title}</div>
                  <div className="feat-desc">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="ad-slot">Advertisement</div>

        {/* Blog / Guides section */}
        <div className="card">
          <div className="card-title">📖 Free Guides</div>
          <div className="blog-preview-grid">
            {ARTICLES.slice(0, 3).map((article) => (
              <Link
                key={article.slug}
                to={`/blog/${article.slug}`}
                className="blog-preview-card"
              >
                <span className="bp-category">{article.category}</span>
                <h3 className="bp-title">{article.title}</h3>
                <span className="bp-cta">Read →</span>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <Link to="/blog" className="btn-secondary">
              View All Guides →
            </Link>
          </div>
        </div>

        <div className="ad-slot">Advertisement</div>
      </div>
    </>
  );
}
