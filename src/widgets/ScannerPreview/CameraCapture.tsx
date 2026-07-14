import { useEffect, useRef, useState } from "react";
import { Button } from "@shared/ui";
import styles from "./ScannerPreview.module.css";

interface CameraCaptureProps {
  onCapture: (image: Blob) => void;
  onBack: () => void;
  disabled?: boolean;
}

export const CameraCapture = ({
  onCapture,
  onBack,
  disabled,
}: CameraCaptureProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;

    navigator.mediaDevices
      ?.getUserMedia({ video: { facingMode: "environment" } })
      .then((mediaStream) => {
        stream = mediaStream;
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      })
      .catch(() => setError("Не удалось получить доступ к камере"));

    return () => {
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  const handleCapture = () => {
    const video = videoRef.current;
    if (!video) return;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 720;
    canvas.height = video.videoHeight || 1280;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(
      (blob) => {
        if (blob) onCapture(blob);
      },
      "image/jpeg",
      0.9,
    );
  };

  return (
    <div className={styles.camera}>
      <button
        type="button"
        className={styles.back}
        onClick={onBack}
        aria-label="Назад"
      >
        <span className={styles.backArrow} />
      </button>

      {error ? (
        <p className={styles.cameraError}>{error}</p>
      ) : (
        <video
          ref={videoRef}
          className={styles.video}
          autoPlay
          playsInline
          muted
        />
      )}

      <Button
        className={styles.cameraButton}
        variant="primary"
        onClick={handleCapture}
        disabled={disabled || Boolean(error)}
      >
        {disabled ? "Отправка…" : "Сфотографировать"}
      </Button>
    </div>
  );
};
