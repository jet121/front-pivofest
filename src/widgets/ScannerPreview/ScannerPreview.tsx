import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@shared/config/routes";
import styles from "./ScannerPreview.module.css";
import CheckPhoto from "./_i/check_photo.webp";
import CheckScan from "./_i/check_scan.webp";
import { Button } from "@shared/ui";
import { getApiErrorMessage } from "@shared/api";
import { useAppDispatch, useAppSelector } from "@app/providers/store";
import { selectAuth } from "@entities/user";
import { openRegistration } from "@features/registration";
import { QrScanner } from "./QrScanner";
import { CameraCapture } from "./CameraCapture";
import { verifyQr, sendReceipt } from "./api";

type Step = "scan" | "scanning" | "photo" | "camera" | "success";

export const ScannerPreview = () => {
  const auth = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("scan");
  const [qrdata, setQrdata] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!auth) {
    return (
      <section className={styles.section}>
        <h2>СКАНИРОВАНИЕ ЧЕКА</h2>
        <p>
          Войдите, чтобы отсканировать чек.{" "}
          <button
            type="button"
            className={styles.link}
            onClick={() => dispatch(openRegistration())}
          >
            Войти
          </button>
        </p>
      </section>
    );
  }

  const handleDecode = async (text: string) => {
    setQrdata(text);
    setError(null);
    setSubmitting(true);
    try {
      const { res } = await verifyQr({ user_id: auth.user_id, qrdata: text });
      if (res === 1) {
        await sendReceipt({
          user_id: auth.user_id,
          auth_key: auth.auth_key,
          qrdata: text,
        });
        setStep("success");
      } else {
        setStep("photo");
      }
    } catch (e) {
      setError(getApiErrorMessage(e));
      setStep("scan");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCapture = async (image: Blob) => {
    setError(null);
    setSubmitting(true);
    try {
      await sendReceipt({
        user_id: auth.user_id,
        auth_key: auth.auth_key,
        qrdata: qrdata ?? undefined,
        image,
      });
      setStep("success");
    } catch (e) {
      setError(getApiErrorMessage(e));
    } finally {
      setSubmitting(false);
    }
  };

  if (step === "scanning") {
    return (
      <>
        <QrScanner
          onDecode={handleDecode}
          onBack={() => setStep("scan")}
          onManual={() => setStep("photo")}
        />
        {submitting && <div className={styles.sending}>Отправка…</div>}
      </>
    );
  }

  if (step === "camera") {
    return (
      <CameraCapture
        onCapture={handleCapture}
        onBack={() => setStep("photo")}
        disabled={submitting}
      />
    );
  }

  if (step === "success") {
    return (
      <section className={styles.section}>
        <h2>ЧЕК ОТПРАВЛЕН</h2>
        <p>Спасибо! Чек принят и отправлен на проверку.</p>
        <Button
          className={styles.button}
          variant="primary"
          onClick={() => navigate(ROUTES.HOME)}
        >
          На главную
        </Button>
      </section>
    );
  }

  // step === "scan" | "photo" — превью-экраны
  return (
    <section className={styles.section}>
      <h2>
        {step === "scan" ? "ОТСКАНИРУЙТЕ QR КОД НА ЧЕКЕ" : "СФОТОГРАФИРУЙТЕ ЧЕК"}
      </h2>

      {step === "scan" ? (
        <ul>
          <li>1. Убедитесь, что освещение хорошее</li>
          <li>2. Чек ровный и немятый, разгладьте при необходимости</li>
          <li>3. Наведите камеру на QR код</li>
        </ul>
      ) : (
        <p>
          Длинный чек сложите, как показано на картинке. Так, чтобы были видны
          зоны 1 и 2.
        </p>
      )}

      <div className={styles.image}>
        <img src={step === "photo" ? CheckPhoto : CheckScan} alt="Scan" />
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <Button
        className={styles.button}
        variant="primary"
        onClick={() => setStep(step === "scan" ? "scanning" : "camera")}
      >
        {step === "scan" ? "Сканировать" : "Далее"}
      </Button>

      {step === "scan" && (
        <button className={styles.photo} onClick={() => setStep("photo")}>
          Нажмите здесь, если QR код не сканируется
        </button>
      )}
    </section>
  );
};
