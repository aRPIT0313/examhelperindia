// ============================================================
// useImageProcessor hook
// Manages all state for photo upload + compression
// ============================================================
import { useState, useCallback } from "react";
import {
  processImage,
  isValidImageFile,
  downloadFile,
  getFileSizeKB,
} from "../utils/imageUtils";

export const useImageProcessor = () => {
  const [originalFile, setOriginalFile] = useState(null);
  const [originalPreview, setOriginalPreview] = useState(null);
  const [originalSizeKB, setOriginalSizeKB] = useState(null);

  const [processedBlob, setProcessedBlob] = useState(null);
  const [processedPreview, setProcessedPreview] = useState(null);
  const [processedSizeKB, setProcessedSizeKB] = useState(null);
  const [processedDimensions, setProcessedDimensions] = useState(null);

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [isDone, setIsDone] = useState(false);

  const handleUpload = useCallback((file) => {
    if (!file) return;
    if (!isValidImageFile(file)) {
      setError("Please upload a JPG, PNG, or WEBP image.");
      return;
    }
    setError(null);
    setIsDone(false);
    setProcessedBlob(null);
    setProcessedPreview(null);
    setOriginalFile(file);
    setOriginalSizeKB(getFileSizeKB(file));

    const reader = new FileReader();
    reader.onload = (e) => setOriginalPreview(e.target.result);
    reader.readAsDataURL(file);
  }, []);

  const handleProcess = useCallback(
    async (options) => {
      if (!originalFile) {
        setError("Please upload an image first.");
        return;
      }
      setIsProcessing(true);
      setError(null);
      try {
        const result = await processImage(originalFile, options);
        setProcessedBlob(result.blob);
        setProcessedPreview(result.dataUrl);
        setProcessedSizeKB(result.sizeKB);
        setProcessedDimensions({ width: result.width, height: result.height });
        setIsDone(true);
      } catch (err) {
        setError("Something went wrong. Please try again.");
        console.error(err);
      } finally {
        setIsProcessing(false);
      }
    },
    [originalFile]
  );

  const handleDownload = useCallback(
    (filename = "photo.jpg") => {
      if (processedBlob) downloadFile(processedBlob, filename);
    },
    [processedBlob]
  );

  const reset = useCallback(() => {
    setOriginalFile(null);
    setOriginalPreview(null);
    setOriginalSizeKB(null);
    setProcessedBlob(null);
    setProcessedPreview(null);
    setProcessedSizeKB(null);
    setProcessedDimensions(null);
    setIsDone(false);
    setError(null);
  }, []);

  return {
    originalFile,
    originalPreview,
    originalSizeKB,
    processedBlob,
    processedPreview,
    processedSizeKB,
    processedDimensions,
    isProcessing,
    error,
    isDone,
    handleUpload,
    handleProcess,
    handleDownload,
    reset,
  };
};
