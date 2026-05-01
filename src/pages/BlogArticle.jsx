import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { getArticleBySlug, ARTICLES } from "../config/blogConfig";
import "./BlogArticle.css";

// Simple markdown-like renderer for article content
function renderContent(content) {
  const lines = content.trim().split("\n");
  const elements = [];
  let i = 0;
  let tableBuffer = [];
  let inTable = false;

  const flushTable = () => {
    if (tableBuffer.length < 2) {
      tableBuffer = [];
      inTable = false;
      return;
    }
    const headerRow = tableBuffer[0]
      .split("|")
      .map((c) => c.trim())
      .filter(Boolean);
    const bodyRows = tableBuffer.slice(2).map((row) =>
      row
        .split("|")
        .map((c) => c.trim())
        .filter(Boolean)
    );
    elements.push(
      <div className="article-table-wrap" key={`table-${elements.length}`}>
        <table className="article-table">
          <thead>
            <tr>
              {headerRow.map((h, idx) => (
                <th key={idx}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {bodyRows.map((row, ridx) => (
              <tr key={ridx}>
                {row.map((cell, cidx) => (
                  <td key={cidx}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
    tableBuffer = [];
    inTable = false;
  };

  while (i < lines.length) {
    const line = lines[i];

    // Table detection
    if (line.includes("|") && line.trim().startsWith("|")) {
      inTable = true;
      tableBuffer.push(line);
      i++;
      continue;
    } else if (inTable) {
      flushTable();
    }

    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="article-h2">
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith("### ")) {
      elements.push(
        <h3 key={i} className="article-h3">
          {line.slice(4)}
        </h3>
      );
    } else if (line.startsWith("---")) {
      elements.push(<hr key={i} className="article-hr" />);
    } else if (line.startsWith("**") && line.endsWith("**")) {
      elements.push(
        <p key={i} className="article-bold-line">
          <strong>{line.slice(2, -2)}</strong>
        </p>
      );
    } else if (line.match(/^\d+\. /)) {
      // numbered list — collect consecutive
      const items = [];
      while (i < lines.length && lines[i].match(/^\d+\. /)) {
        items.push(lines[i].replace(/^\d+\. /, ""));
        i++;
      }
      elements.push(
        <ol key={`ol-${elements.length}`} className="article-ol">
          {items.map((it, idx) => (
            <li key={idx} dangerouslySetInnerHTML={{ __html: boldInline(it) }} />
          ))}
        </ol>
      );
      continue;
    } else if (line.startsWith("- ")) {
      // bullet list — collect consecutive
      const items = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={`ul-${elements.length}`} className="article-ul">
          {items.map((it, idx) => (
            <li key={idx} dangerouslySetInnerHTML={{ __html: boldInline(it) }} />
          ))}
        </ul>
      );
      continue;
    } else if (line.startsWith("☐ ") || line.startsWith("✅ ") || line.startsWith("❌ ")) {
      // checklist lines — collect consecutive
      const items = [];
      while (
        i < lines.length &&
        (lines[i].startsWith("☐ ") ||
          lines[i].startsWith("✅ ") ||
          lines[i].startsWith("❌ "))
      ) {
        items.push(lines[i]);
        i++;
      }
      elements.push(
        <ul key={`cl-${elements.length}`} className="article-checklist">
          {items.map((it, idx) => (
            <li key={idx}>{it}</li>
          ))}
        </ul>
      );
      continue;
    } else if (line.trim() === "") {
      // skip blank lines
    } else {
      // paragraph
      elements.push(
        <p
          key={i}
          className="article-p"
          dangerouslySetInnerHTML={{ __html: boldInline(line) }}
        />
      );
    }
    i++;
  }
  if (inTable) flushTable();
  return elements;
}

function boldInline(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/`(.+?)`/g, "<code>$1</code>");
}

export default function BlogArticle() {
  const { slug } = useParams();
  const article = getArticleBySlug(slug);

  if (!article) {
    return (
      <div className="blog-article-notfound">
        <h1>Article not found</h1>
        <Link to="/blog">← Back to all guides</Link>
      </div>
    );
  }

  const related = ARTICLES.filter((a) => a.slug !== slug).slice(0, 3);

  return (
    <>
      <Helmet>
        <title>{article.title} — Exam Form Helper India</title>
        <meta name="description" content={article.description} />
        <link
          rel="canonical"
          href={`https://examhelperindia.vercel.app/blog/${article.slug}`}
        />
      </Helmet>

      <div className="blog-article-page">
        {/* Hero */}
        <section className="ba-hero">
          <div className="ba-hero-inner">
            <Link to="/blog" className="ba-back">
              ← All Guides
            </Link>
            <div className="ba-meta">
              <span className="ba-category">{article.category}</span>
              <span className="ba-read-time">⏱ {article.readTime} read</span>
              <span className="ba-date">📅 {article.publishDate}</span>
            </div>
            <h1 className="ba-title">{article.title}</h1>
            <p className="ba-desc">{article.description}</p>
          </div>
        </section>

        {/* Ad slot */}
        <div className="ad-slot ba-ad-top" aria-label="Advertisement">
          <span>Advertisement</span>
        </div>

        {/* Content */}
        <article className="ba-content-wrap">
          <div className="ba-content">{renderContent(article.content)}</div>
        </article>

        {/* CTA */}
        <div className="ba-cta">
          <div className="ba-cta-inner">
            <p>Ready to resize your photo or signature?</p>
            <Link to="/tool" className="ba-cta-btn">
              Open Free Resize Tool →
            </Link>
          </div>
        </div>

        {/* Ad slot */}
        <div className="ad-slot ba-ad-mid" aria-label="Advertisement">
          <span>Advertisement</span>
        </div>

        {/* Related articles */}
        {related.length > 0 && (
          <section className="ba-related">
            <div className="ba-related-inner">
              <h2>More Guides</h2>
              <div className="ba-related-grid">
                {related.map((a) => (
                  <Link key={a.slug} to={`/blog/${a.slug}`} className="ba-related-card">
                    <span className="ba-related-cat">{a.category}</span>
                    <h3>{a.title}</h3>
                    <span className="ba-related-cta">Read →</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
