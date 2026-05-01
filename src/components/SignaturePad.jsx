import { useEffect } from "react";
import { useSignaturePad } from "../hooks/useSignaturePad";
import ImageUploader from "./ImageUploader";
import "./SignaturePad.css";

export default function SignaturePad({ examPreset, onSignatureReady }) {
  const sig = useSignaturePad();

  // Notify parent when signature is done
  useEffect(() => {
    if (sig.isDone && sig.processedBlob && onSignatureReady) {
      onSignatureReady(sig.processedBlob);
    }
  }, [sig.isDone, sig.processedBlob]);

  const handleProcess = () => {
    const opts = {};
    if (examPreset?.signature) {
      opts.targetKB = examPreset.signature.maxSizeKB;
      opts.targetWidth = examPreset.signature.widthPx;
      opts.targetHeight = examPreset.signature.heightPx;
    }
    sig.handleProcess(opts);
  };

  return (
    <div className="sig-pad">
      <div className="sig-mode-tabs">
        <button
          className={sig.mode === "draw" ? "active" : ""}
          onClick={() => sig.setMode("draw")}
        >
          ✍️ Draw Signature
        </button>
        <button
          className={sig.mode === "upload" ? "active" : ""}
          onClick={() => sig.setMode("upload")}
        >
          📁 Upload Signature
        </button>
      </div>

      {sig.mode === "draw" ? (
        <div className="canvas-wrap">
          <canvas
            ref={sig.canvasRef}
            width={500}
            height={180}
            className="sig-canvas"
            onMouseDown={sig.startDrawing}
            onMouseMove={sig.draw}
            onMouseUp={sig.stopDrawing}
            onMouseLeave={sig.stopDrawing}
            onTouchStart={sig.startDrawing}
            onTouchMove={sig.draw}
            onTouchEnd={sig.stopDrawing}
          />
          <p className="canvas-hint">Draw your signature above using mouse or finger</p>
          <button className="btn-clear" onClick={sig.clearCanvas}>
            🗑 Clear
          </button>
        </div>
      ) : (
        <ImageUploader
          label="Upload Signature Image"
          onUpload={sig.handleUploadSignature}
        />
      )}

      {sig.uploadedPreview && sig.mode === "upload" && (
        <div className="sig-upload-preview">
          <img src={sig.uploadedPreview} alt="Uploaded signature" />
        </div>
      )}

      {examPreset?.signature && (
        <div className="sig-preset-info">
          <span>📐 Reference size: {examPreset.signature.widthPx}×{examPreset.signature.heightPx}px</span>
          <span>💾 Max: {examPreset.signature.maxSizeKB} KB</span>
        </div>
      )}

      {sig.error && <p className="sig-error">⚠️ {sig.error}</p>}

      <button
        className="btn-process-sig"
        onClick={handleProcess}
        disabled={sig.isProcessing}
      >
        {sig.isProcessing ? "Processing..." : "⚡ Process Signature"}
      </button>

      {sig.processedPreview && (
        <div className="sig-result">
          <p className="sig-result-label">✅ Signature ready — {sig.processedSizeKB} KB</p>
          <img src={sig.processedPreview} alt="Processed signature" className="sig-preview-img" />
          <button
            className="btn-download-sig"
            onClick={() => sig.handleDownload("signature.jpg")}
          >
            📥 Download Signature
          </button>
        </div>
      )}
    </div>
  );
}
