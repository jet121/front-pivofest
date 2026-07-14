import { useCallback, useRef, useState } from "react";
import { Scanner, prepareZXingModule } from "@yudiel/react-qr-scanner";
import type { IDetectedBarcode, IScannerError } from "@yudiel/react-qr-scanner";
import wasmUrl from "zxing-wasm/reader/zxing_reader.wasm?url";
import styles from "./ScannerPreview.module.css";

// Движок распознавания (ZXing) по умолчанию грузит .wasm с внешнего CDN (jsDelivr).
// Пока файл не загрузился (или если CDN недоступен), камера работает, но QR молча
// не распознаётся. Берём wasm из бандла приложения и инициализируем заранее.
prepareZXingModule({
  overrides: {
    locateFile: (path, prefix) =>
      path.endsWith(".wasm") ? wasmUrl : `${prefix}${path}`,
  },
  fireImmediately: true,
});

interface QrScannerProps {
  onDecode: (text: string) => void;
  onBack: () => void;
  onManual: () => void;
}

const QR_CODE_FORMAT = "qr_code";

const errorMessage = (error: IScannerError): string => {
  switch (error.kind) {
    case "permission-denied":
      return "Нет доступа к камере. Разрешите доступ в настройках браузера или загрузите фото чека.";
    case "no-camera":
      return "Камера не найдена. Загрузите фото чека вручную.";
    case "in-use":
      return "Камера занята другим приложением. Закройте его и попробуйте снова.";
    case "insecure-context":
      return "Камера доступна только по защищённому соединению (https). Загрузите фото чека вручную.";
    case "unsupported":
      return "Браузер не поддерживает сканирование. Загрузите фото чека вручную.";
    default:
      return "Не удалось запустить камеру. Загрузите фото чека вручную.";
  }
};

export const QrScanner = ({ onDecode, onBack, onManual }: QrScannerProps) => {
  const [paused, setPaused] = useState(false);
  const [startError, setStartError] = useState<string | null>(null);
  const handledRef = useRef(false);

  const handleScan = useCallback(
    (detectedCodes: IDetectedBarcode[]) => {
      if (handledRef.current) return;

      // formats ограничены qr_code, поэтому берём первый код с содержимым.
      const data = detectedCodes.find((c) => c.rawValue)?.rawValue;
      if (!data) return;

      handledRef.current = true;
      setPaused(true);
      onDecode(data);
    },
    [onDecode],
  );

  return (
    <div className={styles.scanner}>
      <button
        type="button"
        className={styles.back}
        onClick={onBack}
        aria-label="Назад"
      >
        <span className={styles.backArrow} />
      </button>

      <h2 className={styles.scannerTitle}>Отсканируйте QR-код на чеке</h2>

      {startError ? (
        <p className={styles.error}>{startError}</p>
      ) : (
        <div className={styles.scannerRegion}>
          <Scanner
            onScan={handleScan}
            onError={(e) => setStartError(errorMessage(e))}
            constraints={{ facingMode: "environment" }}
            formats={[QR_CODE_FORMAT]}
            paused={paused}
            sound={false}
            scanDelay={300}
            components={{ finder: false }}
            styles={{
              container: { width: "100%", height: "100%" },
              video: { width: "100%", height: "100%", objectFit: "cover" },
            }}
          />
        </div>
      )}

      <button type="button" className={styles.manual} onClick={onManual}>
        Нажмите здесь, если QR код не сканируется
      </button>
    </div>
  );
};
