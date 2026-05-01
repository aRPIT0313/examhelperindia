// ============================================================
// IMAGE UTILS — Pure Canvas API, no external libraries
// All processing happens in browser, zero server cost
// ============================================================

/**
 * Load an image file and return HTMLImageElement
 */
export const loadImage = (file) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = url;
  });
};

/**
 * Get file size in KB
 */
export const getFileSizeKB = (file) => {
  return (file.size / 1024).toFixed(1);
};

/**
 * Convert canvas to blob with target size
 * Iteratively reduces quality until target KB is met
 */
export const canvasToTargetSizeBlob = async (
  canvas,
  targetKB,
  format = "image/jpeg",
  maxIterations = 20
) => {
  const targetBytes = targetKB * 1024;
  let quality = 0.92;
  let blob = null;

  for (let i = 0; i < maxIterations; i++) {
    blob = await new Promise((resolve) =>
      canvas.toBlob(resolve, format, quality)
    );

    if (!blob) break;

    if (blob.size <= targetBytes) break;

    // Reduce quality more aggressively if far from target
    const ratio = blob.size / targetBytes;
    if (ratio > 3) quality -= 0.15;
    else if (ratio > 2) quality -= 0.1;
    else if (ratio > 1.2) quality -= 0.05;
    else quality -= 0.02;

    if (quality <= 0.01) break;
  }

  return blob;
};

/**
 * Main compression + resize function
 * @param {File} file - Input image file
 * @param {Object} options
 *   targetKB      - Target file size in KB
 *   targetWidth   - Target width in pixels (optional)
 *   targetHeight  - Target height in pixels (optional)
 *   format        - 'JPG', 'PNG', 'WEBP'
 *   bgColor       - background color string e.g. '#ffffff'
 *   fitMode       - 'contain' | 'cover' | 'stretch'
 * @returns {{ blob, dataUrl, width, height, sizeKB }}
 */
export const processImage = async (file, options = {}) => {
  const {
    targetKB = null,
    targetWidth = null,
    targetHeight = null,
    format = "JPG",
    bgColor = "#ffffff",
    fitMode = "contain",
  } = options;

  const img = await loadImage(file);

  // Determine output dimensions
  let outW = targetWidth || img.naturalWidth;
  let outH = targetHeight || img.naturalHeight;

  // If only one dimension specified, maintain aspect ratio
  if (targetWidth && !targetHeight) {
    outH = Math.round((img.naturalHeight / img.naturalWidth) * targetWidth);
  }
  if (targetHeight && !targetWidth) {
    outW = Math.round((img.naturalWidth / img.naturalHeight) * targetHeight);
  }

  const canvas = document.createElement("canvas");
  canvas.width = outW;
  canvas.height = outH;
  const ctx = canvas.getContext("2d");

  // Fill background
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, outW, outH);

  // Draw image based on fit mode
  if (fitMode === "stretch") {
    ctx.drawImage(img, 0, 0, outW, outH);
  } else if (fitMode === "cover") {
    const scale = Math.max(outW / img.naturalWidth, outH / img.naturalHeight);
    const scaledW = img.naturalWidth * scale;
    const scaledH = img.naturalHeight * scale;
    const offsetX = (outW - scaledW) / 2;
    const offsetY = (outH - scaledH) / 2;
    ctx.drawImage(img, offsetX, offsetY, scaledW, scaledH);
  } else {
    // contain (default) — fits inside with padding
    const scale = Math.min(outW / img.naturalWidth, outH / img.naturalHeight);
    const scaledW = img.naturalWidth * scale;
    const scaledH = img.naturalHeight * scale;
    const offsetX = (outW - scaledW) / 2;
    const offsetY = (outH - scaledH) / 2;
    ctx.drawImage(img, offsetX, offsetY, scaledW, scaledH);
  }

  const mimeType =
    format === "PNG"
      ? "image/png"
      : format === "WEBP"
      ? "image/webp"
      : "image/jpeg";

  let blob;
  if (targetKB) {
    blob = await canvasToTargetSizeBlob(canvas, targetKB, mimeType);
  } else {
    blob = await new Promise((resolve) =>
      canvas.toBlob(resolve, mimeType, 0.92)
    );
  }

  const dataUrl = canvas.toDataURL(mimeType, 0.92);
  const sizeKB = blob ? (blob.size / 1024).toFixed(1) : 0;

  return {
    blob,
    dataUrl,
    width: outW,
    height: outH,
    sizeKB: parseFloat(sizeKB),
  };
};

/**
 * Process signature image — auto white background, trim whitespace
 */
export const processSignatureImage = async (file, options = {}) => {
  return processImage(file, {
    ...options,
    bgColor: "#ffffff",
  });
};

/**
 * Draw signature from canvas element
 * @param {HTMLCanvasElement} sourceCanvas - The drawing canvas
 * @param {Object} options - targetKB, targetWidth, targetHeight, format
 */
export const processSignatureCanvas = async (sourceCanvas, options = {}) => {
  const {
    targetKB = null,
    targetWidth = null,
    targetHeight = null,
    format = "JPG",
  } = options;

  const outW = targetWidth || sourceCanvas.width;
  const outH = targetHeight || sourceCanvas.height;

  const canvas = document.createElement("canvas");
  canvas.width = outW;
  canvas.height = outH;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, outW, outH);
  ctx.drawImage(sourceCanvas, 0, 0, outW, outH);

  const mimeType = format === "PNG" ? "image/png" : "image/jpeg";

  let blob;
  if (targetKB) {
    blob = await canvasToTargetSizeBlob(canvas, targetKB, mimeType);
  } else {
    blob = await new Promise((resolve) =>
      canvas.toBlob(resolve, mimeType, 0.92)
    );
  }

  const dataUrl = canvas.toDataURL(mimeType, 0.92);
  const sizeKB = blob ? (blob.size / 1024).toFixed(1) : 0;

  return {
    blob,
    dataUrl,
    width: outW,
    height: outH,
    sizeKB: parseFloat(sizeKB),
  };
};

/**
 * Create ZIP file containing photo and/or signature
 * Uses JSZip
 */
export const createZipDownload = async (files) => {
  const JSZip = (await import("jszip")).default;
  const zip = new JSZip();

  files.forEach(({ blob, name }) => {
    if (blob) zip.file(name, blob);
  });

  const zipBlob = await zip.generateAsync({ type: "blob" });
  return zipBlob;
};

/**
 * Trigger browser download
 */
export const downloadFile = (blob, filename) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

/**
 * Validate image file type
 */
export const isValidImageFile = (file) => {
  const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  return validTypes.includes(file.type);
};

/**
 * Format bytes to human readable
 */
export const formatSize = (bytes) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};
