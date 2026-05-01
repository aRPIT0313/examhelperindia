import "./PreviewDownload.css";

export default function PreviewDownload({
  originalPreview,
  originalSizeKB,
  processedPreview,
  processedSizeKB,
  processedDimensions,
  onDownload,
  filename = "photo.jpg",
  label = "📥 Download Photo",
}) {
  if (!originalPreview) return null;

  return (
    <div className="preview-section">
      <div className="preview-grid">
        <div className="preview-box">
          <span className="preview-tag original">Original</span>
          <img src={originalPreview} alt="Original" />
          <div className="preview-meta">
            <span>{originalSizeKB} KB</span>
          </div>
        </div>

        {processedPreview && (
          <div className="preview-box processed">
            <span className="preview-tag done">✅ Processed</span>
            <img src={processedPreview} alt="Processed" />
            <div className="preview-meta">
              <span className="size-good">{processedSizeKB} KB</span>
              {processedDimensions && (
                <span>
                  {processedDimensions.width}×{processedDimensions.height}px
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {processedPreview && (
        <button className="btn-download" onClick={() => onDownload(filename)}>
          {label}
        </button>
      )}
    </div>
  );
}
