import { useState } from "react";
import "./ErrorGuide.css";

const ERRORS = [
  {
    icon: "📏",
    title: "File size too large",
    fix: "Enter a smaller KB value in the tool above (e.g. 20 or 50). Click 'Compress & Resize' again.",
  },
  {
    icon: "❌",
    title: "Wrong file format error",
    fix: "Select JPG/JPEG as output format. Most Indian exam portals only accept JPG.",
  },
  {
    icon: "🌫️",
    title: "Photo looks blurry after compression",
    fix: "Try a higher KB target (e.g. 100KB instead of 20KB). Extreme compression causes blur.",
  },
  {
    icon: "🎨",
    title: "Background color rejected",
    fix: "Set background to pure White (#ffffff). Most portals require white background only.",
  },
  {
    icon: "📐",
    title: "Dimensions not matching",
    fix: "Enter exact pixel dimensions from your official notification. Use 'Stretch' fit mode if needed.",
  },
  {
    icon: "✍️",
    title: "Signature not visible / too faint",
    fix: "Use the Draw mode with dark ink. After uploading, make sure the signature is dark on white background.",
  },
  {
    icon: "🔄",
    title: "Photo rotated/sideways",
    fix: "Open your photo in any photo editor, rotate it to correct orientation, then upload here.",
  },
  {
    icon: "👤",
    title: "Face not clearly visible",
    fix: "Make sure your face takes up 60–70% of the photo. Crop tightly before uploading.",
  },
];

export default function ErrorGuide() {
  const [open, setOpen] = useState(null);

  return (
    <div className="error-guide">
      <h3 className="guide-title">🛠 Common Upload Errors & Fixes</h3>
      <div className="error-list">
        {ERRORS.map((err, i) => (
          <div
            key={i}
            className={`error-item ${open === i ? "open" : ""}`}
            onClick={() => setOpen(open === i ? null : i)}
          >
            <div className="error-header">
              <span className="error-icon">{err.icon}</span>
              <span className="error-title">{err.title}</span>
              <span className="error-chevron">{open === i ? "▲" : "▼"}</span>
            </div>
            {open === i && (
              <div className="error-fix">
                <span className="fix-label">✅ Fix: </span>
                {err.fix}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
