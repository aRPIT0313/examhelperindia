import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { getExamBySlug, EXAMS } from "../config/examConfig";
import { useImageProcessor } from "../hooks/useImageProcessor";
import ImageUploader from "../components/ImageUploader";
import RequirementsForm from "../components/RequirementsForm";
import PreviewDownload from "../components/PreviewDownload";
import SignaturePad from "../components/SignaturePad";
import ChecklistDownload from "../components/ChecklistDownload";
import ErrorGuide from "../components/ErrorGuide";
import "./ToolPage.css";

export default function ToolPage() {
  const { slug } = useParams();
  const exam = slug ? getExamBySlug(slug) : null;

  const img = useImageProcessor();
  const [signatureBlob, setSignatureBlob] = useState(null);

  // Share handlers
  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `✅ Free photo & signature tool for exam forms! No login needed.\n${window.location.href}`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied!");
  };

  // Related exams
  const related = EXAMS.filter((e) => e.id !== exam?.id).slice(0, 6);

  const pageTitle = exam
    ? `${exam.name} Photo Size & Signature Tool — Free Resize`
    : "Free Photo & Signature Resize Tool for Exam Forms";

  const pageDesc = exam
    ? `Resize your photo and signature for ${exam.fullName} form. Compress to exact KB, set correct dimensions. No login required, works in browser.`
    : "Resize and compress your photo or signature to any size for any exam form. Free, instant, no upload to server.";

  return (
    <>
      <Helmet>
        <title>{pageTitle} | ExamFormHelper</title>
        <meta name="description" content={pageDesc} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
      </Helmet>

      {/* Hero */}
      <div className="page-hero">
        <h1>
          {exam ? `${exam.name} — Photo & Signature Tool` : "Photo & Signature Resize Tool"}
        </h1>
        <p>
          {exam
            ? `Compress & resize your photo/signature for ${exam.fullName} form filling`
            : "Enter your exact requirements below. Works for any exam, any portal, forever."}
        </p>
      </div>

      {/* Ad slot top */}
      <div className="container">
        <div className="ad-slot">Advertisement</div>

        {/* STEP 1 — Upload Photo */}
        <div className="card">
          <div className="card-title">
            <span className="step-badge">1</span>
            Upload Your Photo
          </div>
          {!img.originalPreview ? (
            <ImageUploader label="Upload Photo" onUpload={img.handleUpload} />
          ) : (
            <div className="uploaded-row">
              <img
                src={img.originalPreview}
                alt="Uploaded"
                className="thumb"
              />
              <div>
                <p className="thumb-info">✅ Photo uploaded — {img.originalSizeKB} KB</p>
                <button className="btn-reupload" onClick={img.reset}>
                  🔄 Upload different photo
                </button>
              </div>
            </div>
          )}
          {img.error && <p className="error-msg" style={{ marginTop: "0.8rem" }}>{img.error}</p>}
        </div>

        {/* STEP 2 — Set Requirements */}
        <div className="card">
          <div className="card-title">
            <span className="step-badge">2</span>
            Enter Your Requirements
          </div>
          <p className="step-note">
            📋 Check your official exam notification for exact values.
            {exam && (
              <> Reference values for {exam.name} are pre-filled below — always verify at{" "}
                <a href={exam.officialSite} target="_blank" rel="noopener noreferrer">
                  official site
                </a>.
              </>
            )}
          </p>
          <RequirementsForm
            onProcess={img.handleProcess}
            isProcessing={img.isProcessing}
            examPreset={exam}
          />
        </div>

        {/* STEP 3 — Preview + Download */}
        {img.originalPreview && (
          <div className="card">
            <div className="card-title">
              <span className="step-badge">3</span>
              Preview & Download Photo
            </div>
            <PreviewDownload
              originalPreview={img.originalPreview}
              originalSizeKB={img.originalSizeKB}
              processedPreview={img.processedPreview}
              processedSizeKB={img.processedSizeKB}
              processedDimensions={img.processedDimensions}
              onDownload={img.handleDownload}
              filename="photo.jpg"
              label="📥 Download Photo"
            />
          </div>
        )}

        {/* Ad slot mid */}
        <div className="ad-slot">Advertisement</div>

        {/* STEP 4 — Signature */}
        <div className="card">
          <div className="card-title">
            <span className="step-badge">4</span>
            Create Your Signature
          </div>
          <SignaturePad
            examPreset={exam}
            onSignatureReady={setSignatureBlob}
          />
        </div>

        {/* STEP 5 — Checklist + Combined Download */}
        <ChecklistDownload
          photoBlob={img.processedBlob}
          signatureBlob={signatureBlob}
        />

        {/* Share bar */}
        {(img.isDone || signatureBlob) && (
          <div className="card">
            <div className="card-title">🎉 Done! Share this tool</div>
            <div className="share-bar">
              <span>Help a friend:</span>
              <button className="btn-share-wa" onClick={handleWhatsApp}>
                📱 Share on WhatsApp
              </button>
              <button className="btn-copy-link" onClick={handleCopyLink}>
                🔗 Copy Link
              </button>
            </div>
          </div>
        )}

        {/* Ad slot post-download */}
        {img.isDone && <div className="ad-slot">Advertisement</div>}

        {/* STEP 6 — Error Guide */}
        <ErrorGuide />

        {/* Related tools */}
        {related.length > 0 && (
          <div className="card" style={{ marginTop: "1.2rem" }}>
            <div className="card-title">🔗 Related Exam Tools</div>
            <div className="related-grid">
              {related.map((e) => (
                <Link
                  key={e.id}
                  to={`/exam/${e.slug}`}
                  className="related-card"
                >
                  {e.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="ad-slot" style={{ marginTop: "1rem" }}>Advertisement</div>
      </div>
    </>
  );
}
