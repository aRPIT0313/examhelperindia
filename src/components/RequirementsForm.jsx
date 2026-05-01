import { useState } from "react";
import "./RequirementsForm.css";

export default function RequirementsForm({ onProcess, isProcessing, examPreset }) {
  const [targetKB, setTargetKB] = useState(examPreset?.photo?.maxSizeKB || "");
  const [targetWidth, setTargetWidth] = useState(examPreset?.photo?.widthPx || "");
  const [targetHeight, setTargetHeight] = useState(examPreset?.photo?.heightPx || "");
  const [format, setFormat] = useState("JPG");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [fitMode, setFitMode] = useState("contain");

  const handleApplyPreset = () => {
    if (!examPreset) return;
    setTargetKB(examPreset.photo.maxSizeKB);
    setTargetWidth(examPreset.photo.widthPx);
    setTargetHeight(examPreset.photo.heightPx);
    setFormat(examPreset.photo.format[0]);
  };

  const handleSubmit = () => {
    onProcess({
      targetKB: targetKB ? parseFloat(targetKB) : null,
      targetWidth: targetWidth ? parseInt(targetWidth) : null,
      targetHeight: targetHeight ? parseInt(targetHeight) : null,
      format,
      bgColor,
      fitMode,
    });
  };

  return (
    <div className="req-form">
      {examPreset && (
        <div className="preset-banner">
          <div className="preset-info">
            <span className="preset-label">📌 Reference for {examPreset.name}</span>
            <span className="preset-verified">Verified {examPreset.lastVerified}</span>
          </div>
          <div className="preset-specs">
            <span>Size: {examPreset.photo.minSizeKB}–{examPreset.photo.maxSizeKB} KB</span>
            <span>Dims: {examPreset.photo.widthPx}×{examPreset.photo.heightPx}px</span>
            <span>Format: {examPreset.photo.format.join("/")}</span>
          </div>
          <button className="btn-autofill" onClick={handleApplyPreset}>
            ✨ Auto-fill values
          </button>
          <p className="preset-warning">
            ⚠️ Always verify on{" "}
            <a href={examPreset.officialSite} target="_blank" rel="noopener noreferrer">
              official website
            </a>{" "}
            before submitting.
          </p>
        </div>
      )}

      <div className="form-grid">
        <div className="form-group">
          <label>Target File Size (KB)</label>
          <input
            type="number"
            placeholder="e.g. 20, 50, 100"
            value={targetKB}
            onChange={(e) => setTargetKB(e.target.value)}
            min="1"
            max="10000"
          />
          <span className="field-hint">Leave blank to keep original size</span>
        </div>

        <div className="form-group">
          <label>Output Format</label>
          <div className="format-btns">
            {["JPG", "PNG", "WEBP"].map((f) => (
              <button
                key={f}
                className={`fmt-btn ${format === f ? "active" : ""}`}
                onClick={() => setFormat(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Width (pixels) — optional</label>
          <input
            type="number"
            placeholder="e.g. 200"
            value={targetWidth}
            onChange={(e) => setTargetWidth(e.target.value)}
            min="1"
          />
        </div>

        <div className="form-group">
          <label>Height (pixels) — optional</label>
          <input
            type="number"
            placeholder="e.g. 230"
            value={targetHeight}
            onChange={(e) => setTargetHeight(e.target.value)}
            min="1"
          />
        </div>

        <div className="form-group">
          <label>Background Color</label>
          <div className="bg-options">
            {[
              { label: "White", value: "#ffffff" },
              { label: "Light Grey", value: "#f5f5f5" },
              { label: "Custom", value: "custom" },
            ].map((opt) => (
              <button
                key={opt.value}
                className={`bg-btn ${
                  opt.value !== "custom" && bgColor === opt.value ? "active" : ""
                }`}
                onClick={() => opt.value !== "custom" && setBgColor(opt.value)}
              >
                {opt.value !== "custom" && (
                  <span
                    className="bg-swatch"
                    style={{ background: opt.value, border: "1px solid #ccc" }}
                  />
                )}
                {opt.label}
              </button>
            ))}
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="color-picker"
              title="Pick custom color"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Fit Mode</label>
          <div className="format-btns">
            {[
              { value: "contain", label: "Fit Inside" },
              { value: "cover", label: "Fill & Crop" },
              { value: "stretch", label: "Stretch" },
            ].map((m) => (
              <button
                key={m.value}
                className={`fmt-btn ${fitMode === m.value ? "active" : ""}`}
                onClick={() => setFitMode(m.value)}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        className="btn-process"
        onClick={handleSubmit}
        disabled={isProcessing}
      >
        {isProcessing ? (
          <><span className="spinner" /> Processing...</>
        ) : (
          "⚡ Compress & Resize"
        )}
      </button>
    </div>
  );
}
