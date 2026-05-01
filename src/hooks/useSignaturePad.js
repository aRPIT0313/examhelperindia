// ============================================================
// useSignaturePad hook
// Manages drawing canvas state + signature processing
// ============================================================
import { useState, useRef, useCallback, useEffect } from "react";
import {
  processSignatureCanvas,
  processSignatureImage,
  isValidImageFile,
  downloadFile,
  getFileSizeKB,
} from "../utils/imageUtils";

export const useSignaturePad = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [mode, setMode] = useState("draw"); // 'draw' | 'upload'

  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadedPreview, setUploadedPreview] = useState(null);

  const [processedBlob, setProcessedBlob] = useState(null);
  const [processedPreview, setProcessedPreview] = useState(null);
  const [processedSizeKB, setProcessedSizeKB] = useState(null);

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [isDone, setIsDone] = useState(false);

  // Initialize canvas
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#1a1a2e";
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, []);

  useEffect(() => {
    if (mode === "draw") initCanvas();
  }, [mode, initCanvas]);

  // Get position (mouse or touch)
  const getPos = (e, canvas) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if (e.touches) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const startDrawing = useCallback((e) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const pos = getPos(e, canvas);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    setIsDrawing(true);
    setHasDrawn(true);
  }, []);

  const draw = useCallback(
    (e) => {
      e.preventDefault();
      if (!isDrawing) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      const pos = getPos(e, canvas);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    },
    [isDrawing]
  );

  const stopDrawing = useCallback(() => {
    setIsDrawing(false);
  }, []);

  const clearCanvas = useCallback(() => {
    initCanvas();
    setHasDrawn(false);
    setIsDone(false);
    setProcessedBlob(null);
    setProcessedPreview(null);
  }, [initCanvas]);

  const handleUploadSignature = useCallback((file) => {
    if (!file) return;
    if (!isValidImageFile(file)) {
      setError("Please upload a JPG, PNG, or WEBP image.");
      return;
    }
    setError(null);
    setIsDone(false);
    setUploadedFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setUploadedPreview(e.target.result);
    reader.readAsDataURL(file);
  }, []);

  const handleProcess = useCallback(
    async (options) => {
      setIsProcessing(true);
      setError(null);
      try {
        let result;
        if (mode === "draw") {
          const canvas = canvasRef.current;
          if (!canvas || !hasDrawn) {
            setError("Please draw your signature first.");
            setIsProcessing(false);
            return;
          }
          result = await processSignatureCanvas(canvas, options);
        } else {
          if (!uploadedFile) {
            setError("Please upload a signature image first.");
            setIsProcessing(false);
            return;
          }
          result = await processSignatureImage(uploadedFile, options);
        }
        setProcessedBlob(result.blob);
        setProcessedPreview(result.dataUrl);
        setProcessedSizeKB(result.sizeKB);
        setIsDone(true);
      } catch (err) {
        setError("Something went wrong. Please try again.");
        console.error(err);
      } finally {
        setIsProcessing(false);
      }
    },
    [mode, hasDrawn, uploadedFile]
  );

  const handleDownload = useCallback(
    (filename = "signature.jpg") => {
      if (processedBlob) downloadFile(processedBlob, filename);
    },
    [processedBlob]
  );

  const reset = useCallback(() => {
    clearCanvas();
    setUploadedFile(null);
    setUploadedPreview(null);
    setProcessedBlob(null);
    setProcessedPreview(null);
    setProcessedSizeKB(null);
    setIsDone(false);
    setError(null);
  }, [clearCanvas]);

  return {
    canvasRef,
    mode,
    setMode,
    hasDrawn,
    uploadedPreview,
    processedBlob,
    processedPreview,
    processedSizeKB,
    isProcessing,
    error,
    isDone,
    startDrawing,
    draw,
    stopDrawing,
    clearCanvas,
    handleUploadSignature,
    handleProcess,
    handleDownload,
    reset,
  };
};
