import { useState } from "react";
import { createZipDownload, downloadFile } from "../utils/imageUtils";
import "./ChecklistDownload.css";

export default function ChecklistDownload({ photoBlob, signatureBlob }) {
  const [downloading, setDownloading] = useState(false);

  const photoReady = !!photoBlob;
  const sigReady = !!signatureBlob;
  const allReady = photoReady && sigReady;

  const handleCombinedDownload = async () => {
    setDownloading(true);
    try {
      const files = [];
      if (photoBlob) files.push({ blob: photoBlob, name: "photo.jpg" });
      if (signatureBlob) files.push({ blob: signatureBlob, name: "signature.jpg" });
      const zip = await createZipDownload(files);
      downloadFile(zip, "exam-form-documents.zip");
    } catch (e) {
      console.error(e);
    } finally {
      setDownloading(false);
    }
  };

  const steps = [
    { label: "Photo uploaded & processed", done: photoReady },
    { label: "Signature created & processed", done: sigReady },
    { label: "Ready to upload on exam portal", done: allReady },
  ];

  return (
    <div className="checklist-section">
      <h3 className="checklist-title">✅ Completion Status</h3>
      <ul className="checklist">
        {steps.map((step, i) => (
          <li key={i} className={step.done ? "done" : "pending"}>
            <span className="check-icon">{step.done ? "✅" : "⬜"}</span>
            <span>{step.label}</span>
          </li>
        ))}
      </ul>

      {allReady && (
        <div className="combined-download">
          <p className="combined-hint">
            🎉 Both files ready! Download them together as a ZIP.
          </p>
          <button
            className="btn-combined"
            onClick={handleCombinedDownload}
            disabled={downloading}
          >
            {downloading ? "Creating ZIP..." : "📦 Download Both as ZIP"}
          </button>
        </div>
      )}

      {!allReady && (
        <p className="checklist-pending-note">
          {!photoReady && !sigReady
            ? "Complete photo and signature above to enable combined download."
            : !photoReady
            ? "Complete photo processing above."
            : "Complete signature processing above."}
        </p>
      )}
    </div>
  );
}
