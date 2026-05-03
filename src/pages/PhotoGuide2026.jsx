import { Helmet } from "react-helmet-async";
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { EXAMS, EXAM_CATEGORIES } from "../config/examConfig";
import "./PhotoGuide2026.css";

export default function PhotoGuide2026() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("ALL");

  const categories = ["ALL", ...Object.keys(EXAM_CATEGORIES)];

  const filtered = useMemo(() => {
    return EXAMS.filter((exam) => {
      const matchCat =
        activeCategory === "ALL" || exam.category === activeCategory;
      const matchSearch =
        search === "" ||
        exam.name.toLowerCase().includes(search.toLowerCase()) ||
        exam.fullName.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [search, activeCategory]);

  return (
    <>
      <Helmet>
        <title>
          Photo Size Guide for All Indian Exams 2026 — Complete Reference Table
        </title>
        <meta
          name="description"
          content={`Photo and signature size requirements for all ${EXAMS.length}+ Indian competitive exams in 2026. SSC, IBPS, UPSC, Railway, Police, Defence, Entrance. Free resize tool included.`}
        />
      </Helmet>

      <div className="guide-page">
        <div className="container">

          {/* ── Disclaimer — always at top, cannot be missed ── */}
          <div className="guide-disclaimer">
            <span className="disc-icon">⚠️</span>
            <div>
              <strong>Important — Read Before Using This Table</strong>
              <p>
                Requirements shown here are based on past notifications and may
                change with every new recruitment cycle. <strong>Always verify
                photo and signature specifications from your official exam
                notification or portal before uploading.</strong> We are not
                responsible for rejections caused by outdated or changed
                specifications. Each row shows when data was last verified —
                use the official site link to confirm current requirements.
              </p>
            </div>
          </div>

          {/* ── Hero ── */}
          <div className="guide-hero">
            <h1>
              📸 Photo & Signature Size Guide<br />
              <span className="guide-accent">All Indian Exams 2026</span>
            </h1>
            <p>
              Reference table for {EXAMS.length} exams — photo dimensions, file
              size limits, signature requirements. Click any exam to open the
              free resize tool directly.
            </p>
            <div className="guide-stats">
              <span>📋 {EXAMS.length} Exams</span>
              <span>🆓 Free Resize Tool</span>
              <span>✅ Official site links</span>
            </div>
          </div>

          {/* ── Search + Filter ── */}
          <div className="card guide-controls">
            <input
              className="guide-search"
              type="text"
              placeholder={`🔍 Search exams... (e.g. "SSC", "Police", "GATE")`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="guide-cat-filters">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`cat-btn ${activeCategory === cat ? "active" : ""}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat === "ALL" ? "All Exams" : EXAM_CATEGORIES[cat]}
                  {cat === "ALL"
                    ? ` (${EXAMS.length})`
                    : ` (${EXAMS.filter((e) => e.category === cat).length})`}
                </button>
              ))}
            </div>
          </div>

          {/* ── Table ── */}
          <div className="card guide-table-wrap">
            <div className="guide-count">
              Showing <strong>{filtered.length}</strong> of {EXAMS.length} exams
              {search && ` for "${search}"`}
            </div>

            <div className="guide-table-scroll">
              <table className="guide-table">
                <thead>
                  <tr>
                    <th>Exam</th>
                    <th>Photo Size</th>
                    <th>Photo KB</th>
                    <th>Signature Size</th>
                    <th>Sig KB</th>
                    <th>Format</th>
                    <th>Last Verified</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="no-results">
                        No exams found for "{search}" — try a different name
                      </td>
                    </tr>
                  ) : (
                    filtered.map((exam) => (
                      <tr key={exam.id}>
                        <td className="exam-cell">
                          <div className="exam-name-cell">{exam.name}</div>
                          <div className="exam-full-cell">{exam.fullName}</div>
                          <span className={`cat-badge cat-${exam.category.toLowerCase()}`}>
                            {EXAM_CATEGORIES[exam.category] || exam.category}
                          </span>
                        </td>
                        <td className="mono">
                          {exam.photo.widthPx} × {exam.photo.heightPx} px
                        </td>
                        <td className="mono">
                          {exam.photo.minSizeKB && exam.photo.minSizeKB > 0
                            ? `${exam.photo.minSizeKB}–${exam.photo.maxSizeKB} KB`
                            : `≤ ${exam.photo.maxSizeKB} KB`}
                        </td>
                        <td className="mono">
                          {exam.signature.widthPx} × {exam.signature.heightPx} px
                        </td>
                        <td className="mono">
                          {exam.signature.minSizeKB && exam.signature.minSizeKB > 0
                            ? `${exam.signature.minSizeKB}–${exam.signature.maxSizeKB} KB`
                            : `≤ ${exam.signature.maxSizeKB} KB`}
                        </td>
                        <td className="mono">
                          {exam.photo.format[0]}
                        </td>
                        <td className="verified-cell">
                          <span className="verified-badge">
                            {exam.lastVerified}
                          </span>
                        </td>
                        <td className="action-cell">
                          <Link
                            to={`/exam/${exam.slug}`}
                            className="btn-resize"
                          >
                            Resize →
                          </Link>
                          <a
                            href={exam.officialSite}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-official"
                            title="Official website"
                          >
                            Official ↗
                          </a>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="ad-slot">Advertisement</div>

          {/* ── Bottom note ── */}
          <div className="card guide-bottom-note">
            <h3>📌 How to Use This Table</h3>
            <ol>
              <li>Find your exam using the search box or category filter above</li>
              <li>
                <strong>Verify the specifications from your official notification</strong> —
                use the "Official ↗" link in each row
              </li>
              <li>
                Once confirmed, click <strong>"Resize →"</strong> to open our
                free tool pre-loaded for that exam
              </li>
              <li>Upload your photo, set the exact KB and dimensions, download</li>
            </ol>
            <p className="bottom-disclaimer">
              ⚠️ Photo and signature requirements change with every recruitment
              notification. The "Last Verified" column shows when we last
              checked each exam. If your notification shows different
              specifications, always follow your official notification.
            </p>
          </div>

        </div>
      </div>
    </>
  );
}
