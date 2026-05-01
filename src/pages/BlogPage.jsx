import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ARTICLES } from "../config/blogConfig";
import "./BlogPage.css";

const CATEGORY_COLORS = {
  "Photo Guide": "#2563eb",
  "Troubleshooting": "#dc2626",
  "Study Tips": "#16a34a",
  "Signature Guide": "#7c3aed",
};

export default function BlogPage() {
  return (
    <>
      <Helmet>
        <title>Guides & Tips — Exam Form Helper India</title>
        <meta
          name="description"
          content="Free guides for Indian exam aspirants: how to resize photos, fix upload errors, understand notification specs, and create signatures for exam forms."
        />
        <link rel="canonical" href="https://examhelperindia.vercel.app/blog" />
      </Helmet>

      <div className="blog-page">
        {/* Hero */}
        <section className="blog-hero">
          <div className="blog-hero-inner">
            <span className="blog-hero-badge">📚 Free Guides</span>
            <h1>Exam Form Guides</h1>
            <p>
              Everything you need to know about photo uploads, signature
              requirements, and fixing common errors — no exam-specific specs,
              just process guides that work forever.
            </p>
          </div>
        </section>

        {/* Ad slot */}
        <div className="ad-slot ad-slot--blog-top" aria-label="Advertisement">
          <span>Advertisement</span>
        </div>

        {/* Articles grid */}
        <section className="blog-articles">
          <div className="blog-articles-inner">
            <h2 className="blog-section-title">All Guides</h2>
            <div className="blog-grid">
              {ARTICLES.map((article) => (
                <Link
                  key={article.slug}
                  to={`/blog/${article.slug}`}
                  className="article-card"
                >
                  <div className="article-card-top">
                    <span
                      className="article-category"
                      style={{
                        background:
                          CATEGORY_COLORS[article.category] || "#6b7280",
                      }}
                    >
                      {article.category}
                    </span>
                    <span className="article-read-time">
                      ⏱ {article.readTime} read
                    </span>
                  </div>
                  <h3 className="article-title">{article.title}</h3>
                  <p className="article-desc">{article.description}</p>
                  <div className="article-footer">
                    <span className="article-date">
                      📅 {article.publishDate}
                    </span>
                    <span className="article-cta">Read Guide →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Ad slot */}
        <div className="ad-slot ad-slot--blog-bottom" aria-label="Advertisement">
          <span>Advertisement</span>
        </div>

        {/* CTA to tool */}
        <section className="blog-cta">
          <div className="blog-cta-inner">
            <h2>Ready to resize your photo?</h2>
            <p>
              Use our free tool — no login, no signup, works on mobile. Process
              your exam photo in under 2 minutes.
            </p>
            <Link to="/tool" className="blog-cta-btn">
              Open Free Tool →
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
