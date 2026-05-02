import { Helmet } from "react-helmet-async";
import { useState, useRef, useCallback } from "react";
import "./PrintPhotoPage.css";

const LAYOUTS = [
  { id: "2x2", label: "2 × 2", cols: 2, rows: 2, count: 4 },
  { id: "2x3", label: "2 × 3", cols: 2, rows: 3, count: 6 },
  { id: "3x3", label: "3 × 3", cols: 3, rows: 3, count: 9 },
  { id: "4x3", label: "4 × 3", cols: 4, rows: 3, count: 12 },
];

const PAPER_SIZES = [
  { id: "a4", label: "A4 (210 × 297 mm)", widthMm: 210, heightMm: 297 },
  { id: "4x6", label: '4×6 inch Photo Paper', widthMm: 102, heightMm: 152 },
];

// Photo sizes in mm (standard passport sizes)
const PHOTO_SIZES = [
  { id: "35x45", label: "35 × 45 mm (Standard Passport)", w: 35, h: 45 },
  { id: "25x35", label: "25 × 35 mm (Small)", w: 25, h: 35 },
  { id: "40x50", label: "40 × 50 mm (Large)", w: 40, h: 50 },
  { id: "51x51", label: "51 × 51 mm (Square)", w: 51, h: 51 },
];

const MM_TO_PX = 3.7795275591; // 1mm = 3.7795px at 96dpi

export default function PrintPhotoPage() {
  const [photo, setPhoto] = useState(null);
  const [layout, setLayout] = useState(LAYOUTS[1]); // 2x3 default
  const [paper, setPaper] = useState(PAPER_SIZES[0]); // A4 default
  const [photoSize, setPhotoSize] = useState(PHOTO_SIZES[0]);
  const [margin, setMargin] = useState(5); // mm
  const [gap, setGap] = useState(3); // mm
  const [generating, setGenerating] = useState(false);
  const fileRef = useRef();
  const canvasRef = useRef();

  const handleFile = useCallback((e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setPhoto(ev.target.result);
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setPhoto(ev.target.result);
    reader.readAsDataURL(file);
  }, []);

  function generatePrint() {
    if (!photo) return;
    setGenerating(true);

    const img = new Image();
    img.onload = () => {
      // Scale: 96dpi for screen, use 300dpi equivalent for print quality
      const DPI = 300;
      const MM_TO_PX_PRINT = DPI / 25.4;

      const paperW = Math.round(paper.widthMm * MM_TO_PX_PRINT);
      const paperH = Math.round(paper.heightMm * MM_TO_PX_PRINT);
      const photoW = Math.round(photoSize.w * MM_TO_PX_PRINT);
      const photoH = Math.round(photoSize.h * MM_TO_PX_PRINT);
      const marginPx = Math.round(margin * MM_TO_PX_PRINT);
      const gapPx = Math.round(gap * MM_TO_PX_PRINT);

      const canvas = canvasRef.current;
      canvas.width = paperW;
      canvas.height = paperH;
      const ctx = canvas.getContext("2d");

      // White background
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, paperW, paperH);

      // Draw photos in grid
      for (let row = 0; row < layout.rows; row++) {
        for (let col = 0; col < layout.cols; col++) {
          const x = marginPx + col * (photoW + gapPx);
          const y = marginPx + row * (photoH + gapPx);

          // Check if fits on paper
          if (x + photoW > paperW - marginPx) continue;
          if (y + photoH > paperH - marginPx) continue;

          // Draw thin border
          ctx.strokeStyle = "#cccccc";
          ctx.lineWidth = 1;
          ctx.strokeRect(x, y, photoW, photoH);

          // Draw photo — cover fit
          const scale = Math.max(photoW / img.width, photoH / img.height);
          const sw = photoW / scale;
          const sh = photoH / scale;
          const sx = (img.width - sw) / 2;
          const sy = (img.height - sh) / 2;
          ctx.drawImage(img, sx, sy, sw, sh, x, y, photoW, photoH);
        }
      }

      // Download
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `exam-photos-${layout.label}-${paper.id}.jpg`;
        a.click();
        URL.revokeObjectURL(url);
        setGenerating(false);
      }, "image/jpeg", 0.95);
    };
    img.src = photo;
  }

  // Preview scale
  const previewScale = 280 / (paper.widthMm * MM_TO_PX);
  const previewW = paper.widthMm * MM_TO_PX * previewScale;
  const previewH = paper.heightMm * MM_TO_PX * previewScale;
  const photoWpx = photoSize.w * MM_TO_PX * previewScale;
  const photoHpx = photoSize.h * MM_TO_PX * previewScale;
  const marginPx = margin * MM_TO_PX * previewScale;
  const gapPx = gap * MM_TO_PX * previewScale;

  // Build preview grid cells
  const cells = [];
  for (let row = 0; row < layout.rows; row++) {
    for (let col = 0; col < layout.cols; col++) {
      const x = marginPx + col * (photoWpx + gapPx);
      const y = marginPx + row * (photoHpx + gapPx);
      if (x + photoWpx > previewW - marginPx + 2) continue;
      if (y + photoHpx > previewH - marginPx + 2) continue;
      cells.push({ x, y, w: photoWpx, h: photoHpx });
    }
  }

  return (
    <>
      <Helmet>
        <title>Print Multiple Passport Photos on A4 Sheet — Free Tool</title>
        <meta
          name="description"
          content="Arrange multiple passport size photos on A4 or photo paper for printing. Free tool — upload your photo, choose layout, download print-ready sheet."
        />
      </Helmet>

      <div className="print-page">
        <div className="container">
          <div className="print-hero">
            <h1>📸 Photo Print Layout Generator</h1>
            <p>
              Arrange multiple copies of your passport photo on one sheet.
              Download a print-ready image — take it to any photo studio or home printer.
            </p>
          </div>

          <div className="print-layout-grid">
            {/* Left: Controls */}
            <div className="print-controls">

              {/* Upload */}
              <div className="card">
                <div className="card-title">1. Upload Your Photo</div>
                <div
                  className={`print-dropzone ${photo ? "has-photo" : ""}`}
                  onClick={() => fileRef.current.click()}
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                >
                  {photo ? (
                    <img src={photo} alt="uploaded" className="print-thumb" />
                  ) : (
                    <>
                      <div className="dz-icon">📁</div>
                      <div className="dz-text">Click or drag your photo here</div>
                      <div className="dz-sub">JPG, PNG — any format</div>
                    </>
                  )}
                </div>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleFile}
                />
                {photo && (
                  <button
                    className="btn-ghost"
                    onClick={() => { setPhoto(null); fileRef.current.value = ""; }}
                  >
                    ✕ Remove photo
                  </button>
                )}
              </div>

              {/* Layout */}
              <div className="card">
                <div className="card-title">2. Choose Layout</div>
                <div className="print-option-grid">
                  {LAYOUTS.map((l) => (
                    <button
                      key={l.id}
                      className={`print-option-btn ${layout.id === l.id ? "active" : ""}`}
                      onClick={() => setLayout(l)}
                    >
                      <span className="pob-label">{l.label}</span>
                      <span className="pob-sub">{l.count} photos</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Paper size */}
              <div className="card">
                <div className="card-title">3. Paper Size</div>
                <div className="print-option-grid">
                  {PAPER_SIZES.map((p) => (
                    <button
                      key={p.id}
                      className={`print-option-btn ${paper.id === p.id ? "active" : ""}`}
                      onClick={() => setPaper(p)}
                    >
                      <span className="pob-label">{p.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Photo dimensions */}
              <div className="card">
                <div className="card-title">4. Photo Size</div>
                <div className="print-option-grid">
                  {PHOTO_SIZES.map((s) => (
                    <button
                      key={s.id}
                      className={`print-option-btn ${photoSize.id === s.id ? "active" : ""}`}
                      onClick={() => setPhotoSize(s)}
                    >
                      <span className="pob-label">{s.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Margin/gap */}
              <div className="card">
                <div className="card-title">5. Spacing (optional)</div>
                <div className="print-sliders">
                  <label>
                    Page margin: <strong>{margin}mm</strong>
                    <input type="range" min={2} max={15} value={margin}
                      onChange={(e) => setMargin(Number(e.target.value))} />
                  </label>
                  <label>
                    Gap between photos: <strong>{gap}mm</strong>
                    <input type="range" min={0} max={10} value={gap}
                      onChange={(e) => setGap(Number(e.target.value))} />
                  </label>
                </div>
              </div>

              {/* Generate button */}
              <button
                className={`btn-generate ${!photo ? "disabled" : ""}`}
                onClick={generatePrint}
                disabled={!photo || generating}
              >
                {generating ? "⏳ Generating..." : "📥 Download Print Sheet"}
              </button>

              {!photo && (
                <p className="print-hint">Upload a photo first to generate the print sheet.</p>
              )}
            </div>

            {/* Right: Preview */}
            <div className="print-preview-wrap">
              <div className="card">
                <div className="card-title">Preview</div>
                <div
                  className="print-preview"
                  style={{ width: previewW, height: previewH }}
                >
                  {cells.map((cell, i) => (
                    <div
                      key={i}
                      className="preview-cell"
                      style={{
                        left: cell.x,
                        top: cell.y,
                        width: cell.w,
                        height: cell.h,
                      }}
                    >
                      {photo && (
                        <img
                          src={photo}
                          alt=""
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      )}
                    </div>
                  ))}
                </div>
                <div className="preview-meta">
                  {cells.length} photos · {paper.label} · {photoSize.label}
                </div>
              </div>

              {/* Tips */}
              <div className="card">
                <div className="card-title">💡 Printing Tips</div>
                <ul className="print-tips-list">
                  <li>Set printer to <strong>actual size</strong> — do not select "fit to page"</li>
                  <li>Use <strong>photo paper</strong> for best quality</li>
                  <li>Set print quality to <strong>high / best</strong></li>
                  <li>Any photo studio (₹10–20) can print this for you if you don't have a printer</li>
                  <li>Cut along the grey lines with scissors or a paper cutter</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Hidden canvas for generation */}
          <canvas ref={canvasRef} style={{ display: "none" }} />

          <div className="ad-slot">Advertisement</div>
        </div>
      </div>
    </>
  );
}
