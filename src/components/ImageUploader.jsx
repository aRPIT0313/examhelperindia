import { useRef, useState } from "react";
import "./ImageUploader.css";

export default function ImageUploader({ onUpload, label = "Upload Photo", accept = "image/*" }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const handleFile = (file) => {
    if (file && onUpload) onUpload(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
    e.target.value = "";
  };

  return (
    <div
      className={`uploader ${dragging ? "dragging" : ""}`}
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        style={{ display: "none" }}
      />
      <div className="uploader-icon">📁</div>
      <p className="uploader-label">{label}</p>
      <p className="uploader-hint">Tap to browse or drag &amp; drop<br />JPG, PNG, WEBP supported</p>
    </div>
  );
}
